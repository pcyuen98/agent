import { NgModule } from '@angular/core';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormComponent } from './reactive-form/reactive-form.component';

import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common'; 

import {LocationStrategy, PathLocationStrategy} from '@angular/common';
import {POSITION_OPTIONS} from '@ng-web-apis/geolocation';
import {MapComponent} from './map/map.component';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
@NgModule({
  declarations: [
    AppComponent,
    ReactiveFormComponent,MapComponent
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [ 
    {
        provide: LocationStrategy,
        useClass: PathLocationStrategy,
    },
    {
        provide: POSITION_OPTIONS,
        useValue: {enableHighAccuracy: true, timeout: 3000, maximumAge: 1000},
    }
    
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
