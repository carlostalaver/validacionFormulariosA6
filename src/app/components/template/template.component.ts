
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { interval, Subject } from 'rxjs';
import {take, multicast, refCount, publish, share, publishBehavior, publishLast, publishReplay } from 'rxjs/operators';


export interface ISuario {
  nombre: string;
  apellido: string;
  correo: string;
  pais: string;
  sexo: string;
  acepta: boolean;

}

//#region Usando un subject para crear multicast
/* const sourse$ = interval(1000).pipe(
  take(4) // para que la fuente solo produzca 4 valores
);

const subject$ = new Subject();
sourse$.subscribe(subject$);

subject$.subscribe(
  value => console.log(`%c Observador-A ${value}`, 'color:red')
);

setTimeout(() => {
  subject$.subscribe(
    value => console.log(`%c Observador-B ${value}`, 'color:orange')
  );
}, 1000);

setTimeout(() => {
  subject$.subscribe(
    value => console.log(`%c Observador-C ${value}`, 'color:blue')
  );
}, 2000); */

//#endregion

//#region Usando el operador multicast(), refCount(), publish() para convertir un observable frio en uno caliente
/* const sourse$ = interval(1000).pipe(
  take(4),
  // multicast(new Subject()),
  // publish(),
  // publish() -> no necesita un objeto Subject()
  // refCount()
  share()
);

// const subject$ = new Subject();
// sourse$.subscribe(subject$);

sourse$.subscribe(
  value => console.log(`%c Observador-A ${value}`, 'color:red')
);

setTimeout(() => {
  sourse$.subscribe(
    value => console.log(`%c Observador-B ${value}`, 'color:orange')
  );
}, 1000);

setTimeout(() => {
  sourse$.subscribe(
    value => console.log(`%c Observador-C ${value}`, 'color:blue')
  );
}, 2000);

setTimeout(() => {
  sourse$.subscribe(
    value => console.log(`%c Observador-D ${value}`, 'color:blue'),
    null,
    () => console.log(`%cObservador-D completado`, 'color:green')
  );
}, 6000); */

// sourse$.connect();
//#endregion

//#region Usando el operador publishLast(), publishBihavior(), publishReplay() para convertir un observable frio en uno caliente
const sourse2$ = interval(1000).pipe(
  take(4),
  //publishLast(),
  //publishReplay(),
  publishBehavior(21),
  refCount()
);

// const subject$ = new Subject();
// sourse2$.subscribe(subject$);

sourse2$.subscribe(
  value => console.log(`%c Observador-A ${value}`, 'color:red')
);

setTimeout(() => {
  sourse2$.subscribe(
    value => console.log(`%c Observador-B ${value}`, 'color:orange')
  );
}, 1000);

setTimeout(() => {
  sourse2$.subscribe(
    value => console.log(`%c Observador-C ${value}`, 'color:blue')
  );
}, 2000);

setTimeout(() => {
  sourse2$.subscribe(
    value => console.log(`%c Observador-D ${value}`, 'color:blue'),
    null,
    () => console.log(`%cObservador-D completado`, 'color:green')
  );
}, 6000);

// sourse$.connect();
//#endregion
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
