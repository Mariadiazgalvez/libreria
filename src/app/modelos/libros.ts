import { Autores } from './autores';

export class Libro {
  private _isbn: number;
  private _titulo: string;
  private _autor: string;
  private _genero: string;
  private _editorial: string;
  private _numPag: number;
  private _anioEdic: Date;
  private _precio: number;
  private _uniVendi: number;

  constructor(
    isbn: number,
    titulo: string,
    autor: string,
    genero: string,
    editorial: string,
    numPag: number,
    anioEdic: Date,
    precio: number,
    uniVendi: number
  ) {
    this._isbn = isbn;
    this._titulo = titulo;
    this._autor = autor;
    this._genero = genero;
    this._editorial = editorial;
    this._numPag = numPag;
    this._anioEdic = anioEdic;
    this._precio = precio;
    this._uniVendi = uniVendi;
  }

  get isbn() {
    return this._isbn;
  }

  get titulo() {
    return this._titulo;
  }

  get autor() {
    return this._autor;
  }

  get genero() {
    return this._genero;
  }

  get editorial() {
    return this._editorial;
  }

  get numPag() {
    return this._numPag;
  }

  get anioEdic() {
    return this._anioEdic;
  }

  get precio() {
    return this._precio;
  }

  get uniVendi() {
    return this._uniVendi;
  }

  set autor(autor: string) {
    this._autor = autor;
  }

  set anioEdic(anioEdic: Date) {
    this._anioEdic = anioEdic;
  }

  set numPag(numPag: number) {
    this._numPag = numPag;
  }

  set precio(precio: number) {
    this._precio = precio;
  }

  iva() {
    if (this.precio < 10) {
      let p: number = (this.precio * 21) / 100;
      return p;
    }
    if (this.precio > 10) {
      let p1: number = (this.precio * 4) / 100;
      return p1;
    }
  }

  total() {
    let t: number = this.precio + this.iva();
    return Math.round(t);
  }

  ventas() {
    let v: number = this.uniVendi * this.precio;
    return Math.round(v);
  }
}
