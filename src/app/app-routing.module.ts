import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistroConvenioComponent } from './registro-convenio/registro-convenio.component';

const routes: Routes = [
  { path: '', component: RegistroConvenioComponent }, // Ruta por defecto
  // ... otras rutas
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
