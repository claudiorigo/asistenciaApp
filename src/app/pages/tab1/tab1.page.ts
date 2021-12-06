import { Component, OnInit } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { StorageService } from 'src/app/services/storage.service';
import { Observable, timer } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{
  swiperOpts = {
    allowSlidePrev: false,
    allowSlideNext: false
  };
  usuarioActual: {} = {};
  dateTime: Observable<Date>

  constructor(
    private barcodeScanner: BarcodeScanner,
    private storageService: StorageService,
  ) {}

  scan(){
    this.barcodeScanner.scan().then(barcodeData => {
      console.log('Barcode data', barcodeData);
      if( !barcodeData.cancelled ){
        this.storageService.guardarRegistro( barcodeData.format, barcodeData.text );
      }
    }).catch(err => {      
      //this.storageService.guardarRegistro( 'QRCode','docente{id: 8, profesor: "Pedrito Yañez", avatar: "../assets/avatars/av-do-2.png", asignatura: "Etica para el trbajo", seccion: "V001", correo: "p.yanez@docente.duoc.cl", asiste: true}');
      //this.storageService.guardarRegistro( 'QRCode','docente{id: 2, profesor: "Ajelandra Gutierrez", avatar: "../assets/avatars/av-do-2.png", asignatura: "Programación Base de Datos", seccion: "V001", correo: "ale.gutierrez@docente.duoc.cl", asiste: true}');
      this.storageService.guardarRegistro( 'QRCode','docente{id: 1, profesor: "Nancy Pérez", avatar: "../assets/avatars/av-do-1.png", asignatura: "Programación de aplicaciones móviles", seccion: "V002", correo: "nan.perez@docente.duoc.cl", asiste: true}');
      //this.storageService.guardarRegistro( 'QRCode', 'user{id: 1 , nombre: "Claudio Rigollet",email: "claudiorigo@gmail.com",password: "123456",horario: "Vespertino",sede: "Viña del Mar",telefono: "+569 54422 3550",seccion: "V002"}');
      //this.storageService.guardarRegistro( 'QRCode', 'https://ionicframework.com');
    });
  }
  ngOnInit(){
    this.cargarUsuarioActual();
    this.fechaHora();
  }
  fechaHora(){
    this.dateTime = timer(0,1000).pipe(
      map(() => {
        return new Date()
      })
    );
  }  
  async cargarUsuarioActual():Promise<void>{
    this.usuarioActual = await this.storageService.cargarUsuarioActual();   
  }
  

}
