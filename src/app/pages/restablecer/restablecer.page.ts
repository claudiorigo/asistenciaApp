import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-restablecer',
  templateUrl: './restablecer.page.html',
  styleUrls: ['./restablecer.page.scss'],
})
export class RestablecerPage implements OnInit {

  email: string =  '';

  constructor(
    private storageService: StorageService
  ) { }

  ngOnInit() {

  }

  async restablecerPassword(){
    await this.storageService.restablecerPassword( this.email);
    this.email = '';
  }

}
