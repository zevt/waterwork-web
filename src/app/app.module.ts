import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AddressComponent } from './components/address/address.component';
import { SafePipe } from './pipes/safe.pipe';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';

import { AgmCoreModule } from '@agm/core';

@NgModule({
  declarations: [
    AppComponent,
    AddressComponent,
    SafePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAX2jlXZmoFoJklhX-WZ3p3Dgdy_xtFjcY'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
