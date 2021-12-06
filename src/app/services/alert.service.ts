import { Injectable } from '@angular/core';
import { AlertController, LoadingController, ToastController, NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(
    public alertController: AlertController,
    public toastController: ToastController,
    private loadingController: LoadingController,
    private navController: NavController,
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

  async correoInvalido(  message: string ){
    const toast = await this.toastController.create({
      message,
      position: 'bottom',
      duration: 3500
    });
    toast.present();
  };

  async registroInvalido(  message: string ){
    const toast = await this.toastController.create({
      message,
      position: 'bottom',
      duration: 3500
    });
    toast.present();
  };

  async loadInicio( message: string ){
    const loading = await this.loadingController.create({
      message,
      duration: 2000
    });
    await loading.present();
    //await this.storage.get("users");
    loading.dismiss();
  }
  
  //Metodo Salir de Menú
  async salirApp(){
    const alert = await this.alertController.create({
      header: 'Salir',
      message: '¿Seguro que deseas salir de la aplicación?',
      buttons: [
        {
          text: 'No',
          handler: () => {

          }
        }, {
          text: 'Si',
          handler: () => {
            this.storage.remove("valido");
            this.storage.remove("token");
            this.storage.remove("usuarioActual");
            this.navController.navigateRoot('/login');
          }
        }
      ]
    });

    await alert.present();
  }





}
