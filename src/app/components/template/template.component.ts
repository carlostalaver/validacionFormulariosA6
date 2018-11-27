import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';


export interface ISuario {
  nombre: string;
  apellido: string;
  correo: string;
  pais: string;
  sexo: string;
  acepta: boolean;

}
@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styles: []
})
export class TemplateComponent implements OnInit {

  usuario: ISuario = {
    nombre: null,
    apellido: null,
    correo: null,
    pais: '',
    sexo: 'Hombre',
    acepta: false
  };

  paises = [
    { codigo: 'CRI', nombre: 'Costa Rica' },
    { codigo: 'ESP', nombre: 'España' },
    { codigo: 'VEN', nombre: 'Venezuela' }
  ];

  sexos: string [] = ['Hombre', 'Mujer'];


  constructor() { }

  ngOnInit() {
  }

  guardar(form: NgForm ) {
    console.log('enviando submit ');
    console.log('form: ', form.control);
  }


}
