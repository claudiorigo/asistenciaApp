import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { Usuarios } from '../interfaces/interfaces';
import { ApiService } from './api.service';


@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private _storage: Storage | null = null;
  usuarios: Usuarios[] = [];

  constructor(
    private apiService: ApiService,
    private storage: Storage,
    private router: Router
  ) {
    this.init();
  }

  async init(){
    const storage = await this.storage.create();
    this._storage = storage;
    this.guardarUsuarioStorage();
  }

  guardarUsuarioStorage(){
    this.apiService.getUsuarios().subscribe( async respuesta => {
      this.usuarios = respuesta;
      await this._storage.set('usuarios', this.usuarios);
    });
  }


  async cargarUsuariosStorage(){
    this.usuarios = (await this.storage.get('usuarios')) || [];
    return this.usuarios;
  }


  async cargarUsuarioActual(){
    this.usuarios = (await this.storage.get('usuarios')) || [];
    this.usuarios.forEach(usuario => {
      if (usuario.email == "claudiorigo@gmail.com") {
          return usuario
      }
    });
  }







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