import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DbConnectionComponent } from './shared/db-connection/db-connection.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { QueryComponent } from './shared/query/query.component';

@NgModule({
  declarations: [
    AppComponent,
    DbConnectionComponent,
    QueryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
     FormsModule,
     HttpClientModule         
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
