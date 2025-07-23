import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QueryComponent } from './shared/query/query.component';
import { DbConnectionComponent } from './shared/db-connection/db-connection.component';
import { ChartsComponent } from './shared/charts/charts.component';
import { RegisterComponent } from 'src/app/shared/register/register.component';
import { LoginComponent } from 'src/app/shared/login/login.component';
import { DashboardComponent } from 'src/app/dashboard/dashboard.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      { path: 'register', component: RegisterComponent },
      { path: 'login', component: LoginComponent },
      { path: 'dbconnection', component: DbConnectionComponent },
      { path: 'query', component: QueryComponent },
      { path: 'charts', component: ChartsComponent },
      { path: '', redirectTo: 'charts', pathMatch: 'full' }
    ]
  },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'dbconnection', component: DbConnectionComponent },
  { path: 'query', component: QueryComponent },
  { path: 'charts', component: ChartsComponent },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
