import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Libro } from '../modelos/libros';
import { Autores } from '../modelos/autores';
import { AutorService } from '../autor.service';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-grafica2',
  templateUrl: './grafica2.component.html',
  styleUrls: ['./grafica2.component.css']
})
export class Grafica2Component implements OnInit {
  Highcharts: typeof Highcharts = Highcharts;

  autores: Array<Autores> = [];
  autoresApi = null;
  autorTmp: any;
  libros: Array<Libro> = [];

  chartOptions: Highcharts.Options = {
    chart: {
      type: 'column',
      backgroundColor: '#A8F7F5',
      borderRadius: 80,
      spacing: [20, 20, 20, 20]
    },
    title: {
      text: 'Dinero recaudado por las ventas de cada libro'
    },
    yAxis: {
      accessibility: {},
      title: {
        text: ''
      }
    },
    colors: ['#AD5CFA'],
    xAxis: {
      accessibility: {},
      title: {
        text: ''
      }
    },
    series: [
      {
        type: 'area',
        data: [],
        name: 'Euros',
        lineColor: 'D3B2F9'
      }
    ],

    legend: {
      layout: 'vertical',
      align: 'right',
      verticalAlign: 'middle',
      backgroundColor: '#D3B2F9'
    }
  };

  constructor(private autorService: AutorService) {}

  ngOnInit() {
    this.getGrafica2();
  }

  getGrafica2() {
    this.autorService.getAutoresApi().subscribe(autores => {
      this.autoresApi = autores;
      for (let autor of this.autoresApi) {
        for (let libro of autor.libros) {
          let li = new Libro(
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
          this.libros.push(li);
        }
      }
      let grafica = this.libros;
      this.chartOptions.xAxis['categories'] = grafica.map(
        (x: Libro) => x.titulo
      );

      this.chartOptions.series[0]['data'] = grafica.map((x: Libro) =>
        x.ventas()
      );
      Highcharts.chart('grafica2', this.chartOptions);
    });
  }
}
