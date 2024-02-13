import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common'; 
import { AppRoutingModule } from './app-routing.module';

import {LocationStrategy, PathLocationStrategy} from '@angular/common';
import {POSITION_OPTIONS} from '@ng-web-apis/geolocation';
import {MapComponent} from './map/map.component';
import { AppComponent } from './app.component';


@NgModule({
  declarations: [MapComponent,],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ],
  imports: [BrowserModule, AppRoutingModule, CommonModule,
      ]
           ,
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
  
  bootstrap: []
})
export class AppModule {}
