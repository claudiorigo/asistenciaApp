import { Component, OnInit } from '@angular/core';
import { StorageService } from '../../services/storage.service';
import { AlertService } from '../../services/alert.service';
import { Usuarios } from '../../interfaces/interfaces';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{



  alumno  = {
    nombre: "",
    correo: ""
  }
  usuarios: Usuarios[] = [];

  constructor(private storageService: StorageService,
              private alert: AlertService
    ) {



  }

  async ngOnInit():Promise<void>{
    this.usuarios = await this.storageService.cargarUsuariosStorage();
  }




}
