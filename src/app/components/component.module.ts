import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { UsuarioComponent } from './usuario/usuario.component';



@NgModule({
  declarations: [UsuarioComponent],
  exports: [UsuariosComponent, UsuarioComponent],
  imports: [
    CommonModule,
    IonicModule
  ]
})
export class ComponentModule { }
