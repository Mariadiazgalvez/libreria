import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AutorService } from '../autor.service';
import { Libro } from '../modelos/libros';
import { Autores } from '../modelos/autores';
import { Location } from '@angular/common';

@Component({
  selector: 'app-autor',
  templateUrl: './autor.component.html',
  styleUrls: ['./autor.component.css']
})
export class AutorComponent implements OnInit {
  autor: Autores;
  autorApi = null;

  constructor(
    private route: ActivatedRoute,
    private autorService: AutorService,
    private location: Location
  ) {}

  getAutor(): void {
    const nombre = this.route.snapshot.paramMap.get('nombre');
    this.autorService.getAutor(nombre).subscribe(a => {
      this.autorApi = a;
      let libros: Array<Libro> = new Array();
      for (let libro of this.autorApi[0].libros) {
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
      this.autor = new Autores(
        this.autorApi[0].nombre,
        this.autorApi[0].fNacimiento,
        this.autorApi[0].pais,
        libros
      );
    });
  }
  add(
    isbn: string,
    titulo: string,
    autor: string,
    genero: string,
    editorial: string,
    numPag: string,
    anioEdic: string,
    precio: string,
    uniVendi: string
  ) {
    const isbn1 = parseInt(isbn);
    const titulo1 = titulo.trim();
    const autor1 = autor.trim();
    const genero1 = genero.trim();
    const editorial1 = editorial.trim();
    const numPag1 = parseInt(numPag);
    const anioEdic1 = new Date(anioEdic);
    const precio1 = parseInt(precio);
    const uniVendi1 = parseInt(uniVendi);

    const newDoc: any = {
      isbn: isbn1,
      titulo: titulo1,
      autor: autor1,
      genero: genero1,
      editorial: editorial1,
      numPag: numPag1,
      anioEdic: anioEdic1,
      precio: precio1,
      uniVendi: uniVendi1
    };
    this.autorService.addLibro(newDoc).subscribe(l => {
      const libroTmp: any = newDoc;
      this.autorApi.libros.push(libroTmp);
    });
  }
  save(nombre: string, fNacimiento: string, pais: string): void {
    const nombre1 = nombre.trim();
    const fNacimiento1 = new Date(fNacimiento);
    const pais1 = pais.trim();

    const doc = {
      nombre: nombre1,
      fNacimiento: fNacimiento1,
      pais: pais1
    };
    this.autorService.updateAutor(doc).subscribe(() => this.goBack());
  }

  delete(libro: Libro): void {
    this.autor.libros.forEach((l, index) => {
      if (l === libro) this.autor.libros.splice(index, 1);
    });
    this.autorService.deleteLibro(libro).subscribe();
  }

  goBack(): void {
    this.location.back();
  }

  ngOnInit() {
    this.getAutor();
  }
}
