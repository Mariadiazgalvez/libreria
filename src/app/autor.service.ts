import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Libro } from './modelos/libros';
import { Autores } from './modelos/autores';

@Injectable({
  providedIn: 'root'
})
export class AutorService {
  private urlApi = 'https://restapilibreria.herokuapp.com/restapi';
  constructor(private http: HttpClient) {}

  getLibro(isbn: number, autor: string) {
    const urlid = `https://restapilibreria.herokuapp.com/restapi/libro/${isbn}&${autor}`;
    return this.http.get(urlid);
  }
  getLibros() {
    const url1 = `https://restapilibreria.herokuapp.com/restapi/libros`;
    return this.http.get(url1);
  }
  addLibro(doc: any) {
    const urladd = `https://restapilibreria.herokuapp.com/restapi/nuevo`;
    return this.http.post(urladd, doc);
  }

  updateLibro(doc: any) {
    const urlupdate = `https://restapilibreria.herokuapp.com/restapi/libros/${
      doc.isbn
    }&${doc.autor}`;
    return this.http.post(urlupdate, doc);
  }

  deleteLibro(libro: Libro) {
    const urldelet = `https://restapilibreria.herokuapp.com/restapi/deleteLibro/${
      libro.isbn
    }&${libro.autor}`;
    return this.http.get(urldelet);
  }
  updateAutor(doc: any) {
    const urlupdateC = `https://restapilibreria.herokuapp.com/restapi/autor/${
      doc.nombre
    }`;
    return this.http.post(urlupdateC, doc);
  }

  getAutor(nombre: String) {
    const urlget = `https://restapilibreria.herokuapp.com/restapi/autor/${nombre}`;
    return this.http.get(urlget);
  }

  getAutoresApi() {
    const urlget = `${this.urlApi}/autorLib`;
    return this.http.get(urlget);
  }

  addAutor(doc: any) {
    const urladd = `https://restapilibreria.herokuapp.com/restapi/nuevoA`;
    return this.http.post(urladd, doc);
  }

  deleteAutor(autor: Autores) {
    const urldel = `https://restapilibreria.herokuapp.com/restapi/deleteAutor/${
      autor.nombre
    }`;
    return this.http.get(urldel);
  }
}
