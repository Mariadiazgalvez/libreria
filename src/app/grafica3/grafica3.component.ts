import { Component, OnInit } from '@angular/core';
import { AutorService } from '../autor.service';
import { Autores } from '../modelos/autores';
import { Libro } from '../modelos/libros';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-grafica3',
  templateUrl: './grafica3.component.html',
  styleUrls: ['./grafica3.component.css']
})
export class Grafica3Component implements OnInit {
  Highcharts: typeof Highcharts = Highcharts;

  autores: Array<Autores> = [];
  libros: Array<Libro> = [];
  autoresApi = null;
  autorTmp: any;

  chartOptions: Highcharts.Options = {
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: 0,
      plotShadow: false
    },
    title: {
      text: '',
      align: 'center',
      verticalAlign: 'middle',
      y: 150
    },
    tooltip: {
      pointFormat:
        '<span style="color:{point.color}">\u25CF</span> <b> {point.name}</b><br/>' +
        'Recaudacion total: <b>{point.y}</b><br/>'
    },
    accessibility: {
      point: {
        valueSuffix: '%'
      }
    },
    plotOptions: {
      pie: {
        startAngle: -90,
        endAngle: 90,
        center: ['50%', '75%'],
        size: '150%'
      }
    },
    series: [
      {
        name: '',
        type: 'pie',
        colorByPoint: true,
        data: []
      }
    ]
  };
  constructor(private autorService: AutorService) {}

  ngOnInit() {
    this.getMisDatos();
  }

  getMisDatos() {
    this.autorService.getAutoresApi().subscribe(
      autores => {
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

        const misDatos: any = this.autores;
        const dataSeries = misDatos.map((a: Autores) => {
          return { name: a.nombre, y: a.totalven() };
        });
        this.chartOptions.series[0]['data'] = dataSeries;
        Highcharts.chart('grafica3', this.chartOptions);
      },
      error => console.log(error)
    );
  }
}
