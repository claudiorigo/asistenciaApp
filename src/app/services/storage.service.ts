import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Usuarios } from '../interfaces/interfaces';
import { ApiService } from './api.service';
import { Registro } from '../models/registro.model';
import { NavController } from '@ionic/angular';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private _storage: Storage | null = null;
  usuarios: Usuarios[] = [];
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
    seccion: ''
  };

  constructor(
    private apiService: ApiService,
    private storage: Storage,
    private navController: NavController,
    private inAppBrowser: InAppBrowser
  ) {
    this.init();
  }

  async init(){
    const storage = await this.storage.create();
    this._storage = storage;
    this.guardarUsuarioStorage();
  }

  //Guardar Usuarios desde Api con subscribe a Storage
  guardarUsuarioStorage(){
    this.apiService.getUsuarios().subscribe( async respuesta => {
      this.usuarios = respuesta;
      await this._storage.set('usuarios', this.usuarios);
    });
  }

  //Cargar Usuarios
  async cargarUsuariosStorage(){
    this.usuarios = (await this.storage.get('usuarios')) || [];
    return this.usuarios;
  }
  //Cargar Usuario Actual logeado
  async cargarUsuarioActual(){
    this.usuarioActual = (await this.storage.get('usuarioActual')) || null;
    return this.usuarioActual;
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
      }
    });
    this._storage.set('usuarioActual', this.usuarioActual);
    return valido;
  }

  //Registrar Barcode QR
  async guardarRegistro( format: string, text: string ){
    //await this.cargarStorage();
    const nuevoRegistro = new Registro( format, text );
    this.guardados.unshift( nuevoRegistro );
    this._storage.set('registros', this.guardados);
    this.abrirRegistro( nuevoRegistro );
  }


  abrirRegistro(registro : Registro){
    //this.navController.navigateForward('/tabs/tab2');
    switch ( registro.type ){
      case 'user':
        this.navController.navigateForward('/tabs/tab2');
      break;
      case 'http':
        this.inAppBrowser.create( registro.text, '_system');
      break;
    }
  }







  /* async cargarUsuarioActual(){
    this.usuarios = (await this.storage.get('usuarios')) || [];
    this.usuarios.forEach(usuario => {
      if (usuario.email == "claudiorigo@gmail.com") {
          return usuario
      }
    });
  } */







  async usuariosOnline(email: string){
    this.usuarios = (await this.storage.get('usuarios')) || [];
    this.usuarios.forEach(usuario => {
      if (usuario.email == email) {
          console.log('SI ES VALIDO: ',usuario.email);
          return true;
      }
    });
  }

  async UsuarioActual(){
    this.usuarios = (await this.storage.get('usuarios')) || [];

    this.usuarios.forEach(usuario => {
      if (usuario.email == "fran.herrera@gmail.com") {
          //return usuario.nombre;
          console.log("desde UsuarioActual ",usuario.id)
      }

    });
  }









}
