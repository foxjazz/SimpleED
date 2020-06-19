import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MarketComponent } from './market/market.component';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {EDSDataService} from "./edsdata.service";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import { FilterPipe } from './filter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    MarketComponent,
    FilterPipe
  ],
  imports: [
    BrowserModule, HttpClientModule, FormsModule, BrowserAnimationsModule, MatFormFieldModule, MatAutocompleteModule, ReactiveFormsModule
  ],
  providers: [EDSDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
