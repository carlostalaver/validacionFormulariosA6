
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { interval, Subject, ConnectableObservable, of, timer, from } from 'rxjs';
import { take, multicast, refCount, publish, share, publishBehavior, publishLast, publishReplay, mergeMap, map, tap } from 'rxjs/operators';


export interface ISuario {
  nombre: string;
  apellido: string;
  correo: string;
  pais: string;
  sexo: string;
  acepta: boolean;

}

//#region Usando un subject para crear multicast
/*  const sourse$ = interval(1000).pipe(
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
  // multicast(new Subject()), bloque 1
  // refCount()                bloque 1
  // publish(), // Bloque-2 -> no necesita un objeto Subject(), si uso este operador NO SE USA el operador  multicast(new Subject())
  // refCount() // Bloque-2
   share()   // bloque 3 si este operador no es necesario usar ni el multicast con  refCount o piblish con refCount
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
}, 6000);
*/
/* esto es si el observable SOLO se trabaja con el operador multicast(new Subject()) o el operador publish(),
   el cual retornará un observable especial  de tipo ConnectableObservable<number> entonces para desencadenar
   la ejecucion de la fuente observable SE DEBE LLAMAR al metodo conectable()*/
// (sourse$ as ConnectableObservable<number>).connect();

//#endregion

//#region Usando el operador publishLast(), publishBihavior(), publishReplay() para convertir un observable frio en uno caliente
 /* const sourse2$ = interval(1000).pipe(
  take(4),
  // publishLast(),
  // publishReplay(),
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
}, 2000);

setTimeout(() => {
  sourse2$.subscribe(
    value => console.log(`%c Observador-C ${value}`, 'color:blue')
  );
}, 3000);

setTimeout(() => {
  sourse2$.subscribe(
    value => console.log(`%c Observador-D ${value}`, 'color:blue'),
    null,
    () => console.log(`%cObservador-D completado`, 'color:green')
  );
}, 8000);
  */
// (sourse2$ as ConnectableObservable<number>).connect();
//#endregion

const obs1 = interval(1000);
const obs2 = timer(5000);

/* obs1
  .pipe(
    tap( value => {
      console.log('%clabel', 'background-color: aqua;', value);
    }),
    mergeMap(
      (vMap1) => obs2.pipe(map(w => 'Hilo terminado -> ' + vMap1 + ' obs-2 ' + w)),
    )
  ).subscribe(r => console.log(r)); */


@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styles: [`.ng-invalid.ng-touched:not(form) {
    border: 1px solid red;
  }`]
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

  sexos: string[] = ['Hombre', 'Mujer'];


  constructor() { }

  ngOnInit() {
  }

  guardar(form: NgForm) {
    console.log('enviando submit ');
    console.log('form: ', form.controls['nombre']);
  }


  dataChanged(value) {
    console.log('%cngModelChange', 'background-color: orange;', value);
  }


}
