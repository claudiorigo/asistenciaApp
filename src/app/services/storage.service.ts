import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Usuarios, Docentes } from '../interfaces/interfaces';
import { ApiService } from './api.service';
import { Registro } from '../models/registro.model';
import { NavController } from '@ionic/angular';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { AlertService } from './alert.service';
import { File } from '@ionic-native/file/ngx';
import { EmailComposer } from '@ionic-native/email-composer/ngx';

@Injectable({
  providedIn: 'root'  
})
export class StorageService {
  
  valido: boolean = false;
  private _storage: Storage | null = null;
  usuarios: Usuarios[] = [];
  docentes: Docentes[] = [];
  guardados: Registro[] = [];
  usuarioActual:  Usuarios = {
    id: 0,
    nombre: '',
    avatar: '',
    email: '',
    telefono: '',
    password: '',
    horario: '',
    sede: '',
    seccion: '',
    registro: []
  };  
  profesor: string = "";
  avatar: string = "";
  asignatura: string = "";
  seccion: string = "";
  correo: string = "";
  asiste: boolean = false;
  constructor(
    private apiService: ApiService,
    private storage: Storage,
    private navController: NavController,
    private inAppBrowser: InAppBrowser, //Abrir link web
    private alertService: AlertService,
    private file: File,
    private emailComposer: EmailComposer
  ) {
    this.init();
  }

  async init(){
    const storage = await this.storage.create();
    this._storage = storage;
    this.guardarUsuarioStorage();
    this.guardarDocenteStorage();
  }

  //Guardar Usuarios desde Api con subscribe a Storage
  guardarUsuarioStorage(){
    this.apiService.getUsuarios().subscribe( async respuesta => {
      this.usuarios = respuesta;
      await this._storage.set('usuarios', this.usuarios);
    });
  }
  //Guardar Docentes desde Api con subscribe a Storage
  guardarDocenteStorage(){
    this.apiService.getDocentes().subscribe( async respuesta => {
      this.docentes = respuesta;      
      await this._storage.set('docentes', this.docentes);
    });
  }
  //GET Cargar Usuarios desde Storage
  async cargarUsuariosStorage(){
    this.usuarios = (await this.storage.get('usuarios')) || [];
    return this.usuarios;
  }
  //GET Cargar Docentes desde Storage
  async cargarDocentesStorage(){
    this.docentes = (await this.storage.get('docentes')) || [];
    return this.docentes;    
  }   
  //GET Cargar Usuario Actual logeado
  async cargarUsuarioActual(){
    this.usuarioActual = (await this.storage.get('usuarioActual')) || [];
    return this.usuarioActual;
  }
  //GET Cargar Registros Asistencia
  async cargarRegistroAsistencia(){
    this.guardados = (await this.storage.get('registros')) || [];
    return this.guardados;    
  }
  //Login Inicio Sesión
  async inicioSesion(email: any, password: any){
    var valido: boolean = false;
    this.usuarios.forEach(usuario => {
      if (usuario.email == email && usuario.password == password) {
        valido = true;
        this.usuarioActual.id = usuario.id
        this.usuarioActual.nombre = usuario.nombre
        this.usuarioActual.avatar = usuario.avatar
        this.usuarioActual.email = usuario.email
        this.usuarioActual.telefono = usuario.telefono
        this.usuarioActual.password = usuario.password
        this.usuarioActual.horario = usuario.horario
        this.usuarioActual.sede = usuario.sede
        this.usuarioActual.seccion = usuario.seccion
        
        this._storage.set('usuarioActual', this.usuarioActual);
        this.valido = true;  
        
      }
    });
    
    /****************************/
    this.validarToken(this.valido);    
    
    this.alertService.loadInicio("Cargando");
    return valido;
  }

  validarToken(token: boolean){
    if (token) {
      this._storage.set('valido', this.valido);
    } else {
      console.log('password o contraseña invalida')
    }
  }

  //Restablecer Password
  async restablecerPassword(email: string){
    this.usuarios = (await this.storage.get('usuarios')) || [];
    var valido: boolean = false;
    var passwordUsuario: string = '';
    this.usuarios.forEach(usuario => {
      if (usuario.email == email) {
        passwordUsuario = usuario.password;
        valido = true;
      }
    });
    if (valido) {
      this.navController.navigateRoot( '/login', { animated: true } );
      this.alertService.alertaInformacion('Correo enviado revise su bandeja de entrada');
      this.enviarPasswordEmail(passwordUsuario);
      //console.log(passwordUsuario);
    }else{  
      this.alertService.correoInvalido( 'Correo electrónico '+email+' no existe')
    }
  }

  abrirRegistro(registro: Registro){
    //this.navController.navigateForward('/tabs/tab2');
    switch ( registro.type ){
      case 'user':
        this.navController.navigateForward('/menu/tabs/tab2');       
      break;
      case 'doce':
        this.navController.navigateForward('/menu/tabs/tab2');    
      break;
      case 'http':
        this.inAppBrowser.create( registro.text, '_system');
      break;
    }
  }
  
  async guardarRegistro( format: string, text: string ){
    const nuevoRegistro = new Registro( format, text, this.profesor, this.avatar, this.asignatura,this.seccion, this.correo, this.asiste);
    const docentesApi  = await this.cargarDocentesStorage();    
    var docenteId: number;
    var valido: boolean = false;
    var docenteNombre: string;    
    switch ( nuevoRegistro.type ){
      case 'user':
        this.alertService.presentToast("Alumno registrado corectamente");
        console.log(nuevoRegistro.text);
      break;
      case 'doce':        
        docenteId = Number(nuevoRegistro.text.split(',')[0].substr(11));        
        docenteNombre = nuevoRegistro.text.split(',')[1].substr(11).replace('"','').replace('"','');
        docentesApi.forEach(docenteApi => {
          if (docenteApi.id == docenteId) {
            nuevoRegistro.profesor = docenteApi.profesor;
            nuevoRegistro.avatar = docenteApi.avatar;
            nuevoRegistro.asignatura = docenteApi.asignatura;
            nuevoRegistro.seccion = docenteApi.seccion;
            nuevoRegistro.correo = docenteApi.correo;
            nuevoRegistro.asiste = docenteApi.asiste;           
            valido =  true;            
          }
        });
        if (valido) {
          this.alertService.presentToast("Docente registrado corectamente");
          this.guardados.unshift( nuevoRegistro );
          this._storage.set('registros', this.guardados);
          this.usuarioActual.registro.push(nuevoRegistro);
          this._storage.set('usuarioActual', this.usuarioActual);
          this.abrirRegistro( nuevoRegistro );
        } else {
          this.alertService.alertaInformacion('Docente '+docenteNombre+' con id '+docenteId+' no existe, vuelva a intentar nuevamente');
        }
      break;
    }
  }
  //Enviar Correo Native
  enviarCorreo(){
    const arrTemp = [];
    const titulos = 'Tipo, Formato, Creado en, Texto\n';
    arrTemp.push( titulos );
    this.guardados.forEach( registro => {
      const linea = `${ registro.type }, ${ registro.format }, ${ registro.created }, ${ registro.text.replace(',',' ') }\n`;
      arrTemp.push( linea );
    });
    //console.log( arrTemp.join('') );
    this.crearArchivoCorreo( arrTemp.join('') );
  }
 
  crearArchivoCorreo(text: string){
    this.file.checkFile( this.file.dataDirectory, 'registros.csv').then( existe => {
      console.log('Directorio Existe', existe)
      return this.escribirEnArchivo( text );
    }).catch(err =>{
      console.log('Directorio No Existe');
      return this.file.createFile( this.file.dataDirectory, 'registros.csv', false )
        .then( creado => this.escribirEnArchivo( text ))
        .catch(err2 => console.log( 'No se pudo crear el archivo', err2 ));
    });  
  }

  
  async escribirEnArchivo( text: string ){
    await this.file.writeExistingFile( this.file.dataDirectory, 'registros.csv', text );
    console.log('Archivo Creado');
    console.log( this.file.dataDirectory + 'registros.csv' );
    const archivo = `${ this.file.dataDirectory }registros.csv`;
    const email = {
      to: 'claudiorigo@hotmail.com',
      //cc: 'erika@mustermann.de',
      //bcc: ['john@doe.com', 'jane@doe.com'],
      attachments: [
        archivo
      ],
      subject: 'Backup de Scans Asistencia',
      body: 'Respaldo de scan de asistencia - <strong>Asistencia Scan App</strong>',
      isHtml: true
    };    
    // Send a text message using default options
    this.emailComposer.open(email);
  }
  
  enviarPasswordEmail(pass: string){
    const email = {
      to: 'claudiorigo@hotmail.com',
      //cc: 'erika@mustermann.de',
      //bcc: ['john@doe.com', 'jane@doe.com'],
      attachments: [
        pass
      ],
      subject: 'Solicitud de Password',
      body: 'Se adjunta su password que es '+pass+' solcitada desde Asistencia APP',
      isHtml: true
    };    
    // Send a text message using default options
    this.emailComposer.open(email);
  }

  


}
