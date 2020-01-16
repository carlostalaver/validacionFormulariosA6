import { ISuario } from './../template/template.component';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray, ValidatorFn, AbstractControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { promise } from 'protractor';

export interface ISuarioData {
  nombreCompleto: {
    nombre: string;
    apellido: string
  };
  correo: string;
}
@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styles: []
})
export class DataComponent implements OnInit {

  form: FormGroup = null;

  usuario: ISuarioData = {
    nombreCompleto: {
      nombre: 'Carlos',
      apellido: 'Talavera',
    },
    correo: 'cart@gmail.com',
    /*  pasaTiempo: ['Correr', 'Domir', 'Comer'] */
  };

  paises = [
    { codigo: 'CRI', pais: 'Costa Rica' },
    { codigo: 'ESP', pais: 'España' },
    { codigo: 'VEN', pais: 'Venezuela' }
  ];

  sexos: string[] = ['Hombre', 'Mujer'];

  constructor() {
    console.log('const', this);

    this.form = new FormGroup({
      'nombreCompleto': new FormGroup({
        'nombre': new FormControl('Cart', [Validators.required, Validators.minLength(5)]),
        'apellido': new FormControl('', [Validators.required, this.noHerrera]), /* ojo no se invoca a la funcion, va SIN () */
      }),
      'correo': new FormControl('', [Validators.required,
      Validators.pattern('[_a-z0-9-]+(.[_a-z0-9-]+)*@[a-z0-9-]+(.[a-z0-9-]+)*(.[a-z]{2,4})$')]),
      'pasaTiempo': new FormArray(
        [new FormControl('Correr', Validators.required)]
       ),
      'userName': new FormControl('', [Validators.required], [this.existeUsuario]),
      'password1': new FormControl('', [Validators.required]),
      'password2': new FormControl()
    });

    this.form.controls['password2']
      .setValidators([Validators.required, this.noIgual.bind(this.form), this.noIgualFF()]);

    /*  para setear datos al formulario por defecto, varias maneras
    1) Pasarle el valor al crear el control uno por uno
       'nombre': new FormControl( this.usuario.nombreCompleto.nombre , [Validators.required, Validators.minLength(5)])

    2) para setear TODOS los controles en el formulario
       this.form.setValue(this.usuario)

    3) para setear un valor a un control de formulario en particular
       this.form.controls['nombreCompleto'].setValue(this.usuario.nombreCompleto);
    */


    /* Para escuchar los cambios que ocurren en el formulario,  se puede realizar de varias maneras: */
    this.form.valueChanges
      .subscribe(data => {
        // console.log('Escuchando cambios ' , data);
      });

    this.form.controls['userName'].valueChanges
      .subscribe(data => {
        console.log(data);
      });

    this.form.controls['userName'].statusChanges
      .subscribe(data => {
        console.log(data);
      });
  }

  guardar() {
    console.log(this.form);
    /* Resetea los campos de entrada y los deja como si estuvieran cargador por primera vez 
    this.form.reset({
     nombreCompleto: {
       nombre: '',
       apellido: ''
     },
     correo:  ''
  });*/

    /* otra manera, otra manera para llevar al estado pristing, se realiza por cada control de formulario que se desee resetear
       this.form.controls['correo'].reset('ingrese nuevo Correo')*/

  }

  ngOnInit() {
  }

  agregarPasaTiempo() {
    (<FormArray>this.form.controls['pasaTiempo']).push(new FormControl('Dormir', Validators.required));
  }

  noHerrera(control: FormControl): { [s: string]: boolean } {
    if (control.value === 'herrera') {
      return {
        noHerr: true
      };
    }
    return null;
  }

  noIgual(control: FormControl): { [s: string]: boolean } | null {

    const fr: any = this;
    console.log('%cthis', 'background-color: pink;', this );
    if (control.value !== fr.controls['password1'].value) {
      return {
        noHerr: true
      };
    }
    return null;
  }

  /* Creando una fabrica de funciones  */
  noIgualFF(value?: string): ValidatorFn {
    return (control: AbstractControl): { [s: string]: boolean } | null => {
      console.log('%cLlamada a la fabrica ', 'background-color: aqua;', control.parent);

       if (control.parent.controls['password1'].value !== control.parent.controls['password2'].value ) {
        return {
          noIguales: true
        };
      }
      return null;
    };
  }

  existeUsuario(control: FormControl): Promise<any> | Observable<any> {
    const promesa = new Promise((resolve, reject) => {
      setTimeout(() => {
        if (control.value === 'strider') {
          resolve({ exist: true });
        } else {
          resolve(null);
        }
      }, 3000);
    }
    );
    return promesa;


  }

  login() {
    console.log('%cEl form es valido', 'background-color: blue;');
  }

}
