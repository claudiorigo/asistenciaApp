import { Component } from '@angular/core';
import { Registro } from 'src/app/models/registro.model';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  usuarioActual: {} = {};
  guardados: Registro[] = [];

  constructor(
    private storageService: StorageService
  ) {
    this.cargarUsuarioActual();
    this.cargarRegistroAsistencia();    
  }

  abrirRegistro( registro ){
    this.storageService.abrirRegistro( registro );
  }

  async cargarUsuarioActual():Promise<void>{
    this.usuarioActual = await this.storageService.cargarUsuarioActual();
  }
  
  async cargarRegistroAsistencia():Promise<void>{    
    this.guardados = await this.storageService.cargarRegistroAsistencia();    
  }
  
  enviarCorreo(){
    console.log('Enviando correo respaldo...');
    this.storageService.enviarCorreo();
  }

}
