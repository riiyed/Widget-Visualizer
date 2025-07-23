import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DbConnectionComponent } from './shared/db-connection/db-connection.component';
import { QueryComponent } from './shared/query/query.component';

const routes: Routes = [
   {path:'dbconnection',component:DbConnectionComponent},
   {path:'query',component:QueryComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
