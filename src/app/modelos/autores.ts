import { Libro } from './libros';

export class Autores {
  private _nombre: string;
  private _fNacimiento: Date;
  private _pais: string;
  private _libros: Array<Libro>;

  constructor(
    nombre: string,
    fNacimiento: Date,
    pais: string,
    libros: Array<Libro>
  ) {
    this._nombre = nombre;
    this._fNacimiento = fNacimiento;
    this._pais = pais;
    this._libros = libros;
  }

  get nombre() {
    return this._nombre;
  }

  get fNacimiento() {
    return this._fNacimiento;
  }

  get pais() {
    return this._pais;
  }

  get libros() {
    return this._libros;
  }

  set libros(libros: Libro[]) {
    this._libros = libros;
  }

  totalven() {
    let res = 0;
    for (let l of this.libros) {
      res = res + l.ventas();
    }
    return res;
  }
}
