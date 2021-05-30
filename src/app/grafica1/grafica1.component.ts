import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { AutorService } from '../autor.service';
import { Libro } from '../modelos/libros';

@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html',
  styleUrls: ['./grafica1.component.css']
})
export class Grafica1Component implements OnInit {
  Highcharts: typeof Highcharts = Highcharts;
  libros: Array<Libro> = [];
  chartOptions: Highcharts.Options = {
    title: {
      text: ''
    },
    chart: {
      type: 'column'
    },
    xAxis: {
      categories: [],
      title: {
        text: ''
      }
    },
    yAxis: {
      accessibility: {},
      title: {
        text: 'Euros'
      }
    },

    series: [
      {
        type: 'column',
        data: [],
        name: 'Precio con iva'
      }
    ],
    noData: {
      style: {
        fontWeight: 'bold',
        fontSize: '15px',
        color: '#303030'
      }
    }
  };

  constructor(private autorService: AutorService) {}

  ngOnInit() {
    this.getGrafica();
  }

  getGrafica() {
    this.autorService.getLibros().subscribe(
      result => {
        const grafica: Array<Libro> = [];
        let api = null;
        api = result;
        for (let l of api) {
          let li = new Libro(
            l.isbn,
            l.titulo,
            l.autor,
            l.genero,
            l.editorial,
            l.numPag,
            l.anioEdic,
            l.precio,
            l.uniVendi
          );
          grafica.push(li);
        }
        const dataSeries = grafica.map((x: Libro) => x.total());
        const dataCategorias = grafica.map((x: Libro) => x.titulo);
        this.chartOptions.series[0]['data'] = dataSeries;
        this.chartOptions.xAxis['categories'] = dataCategorias;
        Highcharts.chart('grafica1', this.chartOptions);
      },
      error => console.log(error)
    );
  }
}
