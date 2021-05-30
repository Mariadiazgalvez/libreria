import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HighchartsChartModule } from 'highcharts-angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LibroComponent } from './libro/libro.component';
import { AutoresComponent } from './autores/autores.component';
import { AutorComponent } from './autor/autor.component';
import { AutorService } from './autor.service';
import { Grafica1Component } from './grafica1/grafica1.component';
import { Grafica2Component } from './grafica2/grafica2.component';
import { Grafica3Component } from './grafica3/grafica3.component';
import {APP_BASE_HREF} from '@angular/common';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HighchartsChartModule,
    HttpClientModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    LibroComponent,
    AutoresComponent,
    AutorComponent,
    Grafica1Component,
    Grafica2Component,
    Grafica3Component
  ],
  bootstrap: [AppComponent],
  providers: [AutorService, {provide:
    APP_BASE_HREF, useValue: '/libreria'}]
})
export class AppModule {}
