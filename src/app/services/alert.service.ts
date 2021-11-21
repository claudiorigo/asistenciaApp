import { Injectable } from '@angular/core';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(
    public alertController: AlertController,
    public toastController: ToastController,
    private loadingController: LoadingController,
    private storage: Storage) { }


  async alertaInformacion( message: string ){

    const alert = await this.alertController.create({
      message,
      buttons: ['Aceptar']
    });
    await alert.present();
  };


  async presentToast(  message: string ){
    const toast = await this.toastController.create({

      message,
      position: 'top',
      duration: 1500
    });
    toast.present();
  };



  async loadInicio( message: string ){
    const loading = await this.loadingController.create({
      message,
      duration: 2000
    });
    await loading.present();


    await this.storage.get("users");



    loading.dismiss();


  }





}
