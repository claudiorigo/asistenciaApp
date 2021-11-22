import { Component, Input, OnInit } from '@angular/core';


@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss'],
})
export class UsuarioComponent implements OnInit {
  @Input() usuarioActual;


  constructor() { }

  ngOnInit() {

  }




}
