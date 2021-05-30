import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Libro } from '../modelos/libros';
import { AutorService } from '../autor.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-libro',
  templateUrl: './libro.component.html',
  styleUrls: ['./libro.component.css']
})
export class LibroComponent implements OnInit {
  libro: Libro;
  libroApi = null;

  constructor(
    private route: ActivatedRoute,
    private autorService: AutorService,
    private location: Location
  ) {}

  getLibro() {
    let isbn: any = this.route.snapshot.paramMap.get('isbn');
    let li = isbn.split('&');

    isbn = li[0];
    let autor = li[1];

    this.autorService.getLibro(isbn, autor).subscribe(l => {
      this.libroApi = l;
      this.libro = new Libro(
        this.libroApi.isbn,
        this.libroApi.titulo,
        this.libroApi.autor,
        this.libroApi.genero,
        this.libroApi.editorial,
        this.libroApi.numPag,
        this.libroApi.anioEdic,
        this.libroApi.precio,
        this.libroApi.uniVendi
      );
    });
  }

  save(
    numPag: string,
    anioEdic: string,
    precio: string,
    uniVendi: string
  ): void {
    const numPag1 = parseInt(numPag);
    const anioEdic1 = new Date(anioEdic);
    const precio1 = parseInt(precio);
    const uniVendi1 = parseInt(uniVendi);

    const doc = {
      isbn: this.libro.isbn,
      titulo: this.libro.titulo,
      autor: this.libro.autor,
      genero: this.libro.genero,
      editorial: this.libro.editorial,
      numPag: numPag1,
      anioEdic: anioEdic1,
      precio: precio1,
      uniVendi: uniVendi1
    };
    this.autorService.updateLibro(doc).subscribe(() => this.goBack());
  }

  goBack(): void {
    this.location.back();
  }

  ngOnInit() {
    this.getLibro();
  }
}
