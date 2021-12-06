import { Component, OnInit } from '@angular/core';
import { AlertService } from '../../services/alert.service';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
  indiceSeleccionado: number = 0;
  paginas = [
    {
      titulo: 'QR Scanner',
      url: '/menu/tabs/tab1',
      icono: 'home'
    },
    {
      titulo: 'Asistencias',
      url: '/menu/tabs/tab2',
      icono: 'albums'
    },
    {
      titulo: 'Docente',
      url: '/menu/tabs/tab3',
      icono: 'id-card'
    },
    {
      titulo: 'Alumnos',
      url: '/menu/tabs/tab4',
      icono: 'book'
    }
  ]

  constructor(private alertService: AlertService) { }

  ngOnInit() {
  }

  cambiarIndiceSeleccionado(i){
    this.indiceSeleccionado = i;
  }

  async salir(){
    this.alertService.salirApp();
  }

}
