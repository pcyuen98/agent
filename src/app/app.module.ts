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
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { ConfirmationDialogService } from './confirmation-dialog/confirmation-dialog.service';
import { URLFormComponent } from './url-form/url-form.component';
import { HeaderComponent } from './header/header.component';
import { RegisterFormComponent } from './register-form/register-form.component';
import { MatNativeDateModule } from '@angular/material/core';
import { DialogSimpleComponent } from './dialog/dialog-simple';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DonateFormComponent } from './donate-form/donate-form.component';
@NgModule({
  declarations: [
    AppComponent,ConfirmationDialogComponent,
    RegisterFormComponent, DonateFormComponent,
    ReactiveFormComponent,MapComponent, URLFormComponent,
    HeaderComponent,DialogSimpleComponent
    
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
    MatNativeDateModule,
    
  ],
  providers: [ 
    {
        provide: LocationStrategy,
        useClass: PathLocationStrategy,
    },
    {
        provide: POSITION_OPTIONS,
        useValue: {enableHighAccuracy: true, timeout: 3000, maximumAge: 1000},
    },
    { provide: MAT_DIALOG_DATA, useValue: {} },
    // { provide: MdDialogRef, useValue: {} }, --> deprecated
    { provide: MatDialogRef, useValue: {} } ,
    ConfirmationDialogService, DialogSimpleComponent],
    
  bootstrap: [AppComponent, ConfirmationDialogService, DialogSimpleComponent]
})
export class AppModule { }
