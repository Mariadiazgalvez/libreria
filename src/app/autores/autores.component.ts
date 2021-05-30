import { Component, OnInit } from '@angular/core';
import { AutorService } from '../autor.service';
import { Libro } from '../modelos/libros';
import { Autores } from '../modelos/autores';

@Component({
  selector: 'app-autores',
  templateUrl: './autores.component.html',
  styleUrls: ['./autores.component.css']
})
export class AutoresComponent implements OnInit {
  autores: Array<Autores> = [];
  autoresApi = null;
  autorTmp: any;
  constructor(private autorService: AutorService) {}

  getAutoresApi() {
    this.autorService.getAutoresApi().subscribe(autores => {
      this.autoresApi = autores;
      for (let autor of this.autoresApi) {
        let libros: Array<Libro> = new Array();
        for (let libro of autor.libros) {
          let l = new Libro(
            libro.isbn,
            libro.titulo,
            libro.autor,
            libro.genero,
            libro.editorial,
            libro.numPag,
            libro.anioEdic,
            libro.precio,
            libro.uniVendi
          );
          libros.push(l);
        }
        let a = new Autores(
          autor.nombre,
          autor.fNacimiento,
          autor.pais,
          libros
        );
        this.autores.push(a);
      }
    });
  }

  add(nombre: string, fNacimiento: string, pais: string) {
    const nombre1 = nombre.trim();
    const fNacimiento1 = new Date(fNacimiento);
    const pais1 = pais.trim();

    const newDoc: any = {
      nombre: nombre1,
      fNacimiento: fNacimiento1,
      pais: pais1
    };
    this.autorService.addAutor(newDoc).subscribe(a => {
      this.autorTmp = newDoc;
      this.autores.push(this.autorTmp);
    });
  }

  delete(autor: Autores): void {
    this.autores = this.autores.filter(a => a !== autor);
    this.autorService.deleteAutor(autor).subscribe();
  }

  ngOnInit() {
    this.getAutoresApi();
  }
}
