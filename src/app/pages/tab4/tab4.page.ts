import { Component, OnInit } from '@angular/core';
import { StorageService } from '../../services/storage.service';
import { Usuarios } from '../../interfaces/interfaces';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {

  usuarios: Usuarios[] = [];

  constructor(
    private storageService: StorageService,
    //private alert: AlertService
  ) {}

  async ngOnInit():Promise<void>{
    this.usuarios = await this.storageService.cargarUsuariosStorage();
  }

}
