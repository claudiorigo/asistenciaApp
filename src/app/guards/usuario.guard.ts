import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, UrlTree } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs';

const valido: boolean = false;

@Injectable({
  providedIn: 'root'
})
export class UsuarioGuard implements CanActivate, CanLoad {
  private _storage: Storage | null = null;

  constructor(private storage: Storage, private navController: NavController){
    this.init();
    this.cargarTokenValido();
  }

  async cargarTokenValido(){
    let  valido = (await this.storage.get("valido")) || false;
    //this.navController.navigateRoot('/menu/tabs/tab1')
    if(!valido){
      this.navController.navigateRoot('/login')
    }

    return  valido;


  }

  canLoad(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.cargarTokenValido();

  }

  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return false;
  }

  async init(){
    const storage = await this.storage.create();
    this._storage = storage;
  }

}