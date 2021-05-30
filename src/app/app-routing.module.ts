import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LibroComponent } from './libro/libro.component';
import { AutoresComponent } from './autores/autores.component';
import { AutorComponent } from './autor/autor.component';
import { CommonModule } from '@angular/common';
import { Grafica1Component } from './grafica1/grafica1.component';
import { Grafica2Component } from './grafica2/grafica2.component';
import { Grafica3Component } from './grafica3/grafica3.component';

const routes: Routes = [
  { path: 'autorLib', component: AutoresComponent },
  { path: 'autor/:nombre', component: AutorComponent },
  { path: 'libro/:isbn', component: LibroComponent },
  { path: 'grafica1', component: Grafica1Component },
  { path: 'grafica2', component: Grafica2Component },
  { path: 'grafica3', component: Grafica3Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
