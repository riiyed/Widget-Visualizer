import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DbConnectionComponent } from './shared/db-connection/db-connection.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { QueryComponent } from './shared/query/query.component';
import { ChartsComponent } from './shared/charts/charts.component';
import { AgCharts, AgChartsModule } from 'ag-charts-angular';
import { RegisterComponent } from 'src/app/shared/register/register.component';
import { LoginComponent } from 'src/app/shared/login/login.component';
import { DashboardComponent } from 'src/app/dashboard/dashboard.component'; 

import { JwtInterceptor } from 'src/app/service/jwt.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    DbConnectionComponent,
    QueryComponent,
    ChartsComponent,
    RegisterComponent,
    LoginComponent,
    DashboardComponent 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    AgCharts,
    AgChartsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}