import { Component, OnInit } from '@angular/core';
import { Registro } from 'src/app/models/registro.model';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit{

  guardados: Registro[] = [];
  /*
  docenteActual = {
    profesor: "",
    avatar: "",
    asignatura: "",    
    seccion: "",
    correo: "",
    asiste: false,
    hora: new Date
  };
  */
  constructor(private storageService: StorageService) {}

  ionViewWillEnter(){
    //this.init();
    this.cargarRegistroAsistencia();
  }
  /*
  async init():Promise<void>{
    //ver foreach desde get stroge registro
    this.guardados = await this.storageService.cargarRegistroAsistencia();    
    this.guardados.forEach(registro => {
      this.docenteActual.profesor = registro.profesor;
      this.docenteActual.avatar = registro.avatar;
      this.docenteActual.asignatura = registro.asignatura;
      this.docenteActual.seccion = registro.seccion;
      this.docenteActual.correo = registro.correo;
      this.docenteActual.asiste = true;
      this.docenteActual.hora = registro.created;
    });
  }
  */
  ngOnInit(){

  }

  async cargarRegistroAsistencia():Promise<void>{    
    this.guardados = await this.storageService.cargarRegistroAsistencia();    
  }
  
}
