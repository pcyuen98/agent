import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import {LocationStrategy, PathLocationStrategy} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {POSITION_OPTIONS} from '@ng-web-apis/geolocation';
import {MapComponent} from './map/map.component';




@NgModule({
  declarations: [AppComponent, MapComponent],
  imports: [BrowserModule, IonicModule.forRoot()
      , AppRoutingModule
      ]
           ,
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
    ,

  {
      provide: LocationStrategy,
      useClass: PathLocationStrategy,
  },
  {
      provide: POSITION_OPTIONS,
      useValue: {enableHighAccuracy: true, timeout: 3000, maximumAge: 1000},
  }
  
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
