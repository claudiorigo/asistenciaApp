import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { UsuariosComponent } from './usuarios/usuarios.component';



@NgModule({
  declarations: [UsuariosComponent],
  exports: [UsuariosComponent],
  imports: [
    CommonModule,
    IonicModule
  ]
})
export class ComponentModule { }
