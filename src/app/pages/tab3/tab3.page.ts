import { Component, OnInit } from '@angular/core';
import { Docentes } from 'src/app/interfaces/interfaces';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit{

  docenteActual: {} = {};

  constructor(private storageService: StorageService) {}

  async ngOnInit():Promise<void>{
    this.docenteActual = await this.storageService.cargarDocenteActual();
    console.log(this.docenteActual)
  }

}
