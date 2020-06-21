import { Component, OnInit } from '@angular/core';
import {EDSDataService} from "../edsdata.service";
import {System} from "../Models/system";
import {FormControl} from '@angular/forms';
import {Observable, Subject} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {FilterPipe} from "../filter.pipe";
import {MarketData} from "../Models/Commodities";

@Component({
  selector: 'app-market',
  templateUrl: './market.component.html',
  styleUrls: ['./market.component.css']
})
export class MarketComponent implements OnInit {
  systems : System[];
  data: string;
  name: string;
  search: string;
  systemsFilter: System[];
  results: string;
  marketData: MarketData[];

  constructor(
    private dataService: EDSDataService

  ) {this.search = ""; this.marketData = []}
  getData() {
    if (this.systemsFilter.length > 1 || this.systemsFilter.length < 1){
      this.results = "filter needs to return 1 item."
    }
    else{
      this.dataService.getData(this.systemsFilter[0]);
    }
  }
  doSearch(){
    if (this.search.length === 0) {
      this.systemsFilter = this.systems;
    }
    this.systemsFilter = this.systems.filter(a => {
      if (a.name && a.name.toLowerCase().indexOf(this.search.toLowerCase()) >= 0)
        return a;
    })
    //this.filter();
  }

  sortMe() {
    this.marketData = this.dataService.marketData.sort((a, b) =>{
      if(a.stationName > b.stationName){
        return 1;
      }
      if (b.stationName > a.stationName){
        return -1;
      }
      return 0;
    } );
  }

  ngOnInit() {
    this.dataService.notifyDP.subscribe(() => {
      this.marketData = this.dataService.marketData;
    });

    this.dataService.getSystemsObs().subscribe(posts => {
      this.systems = posts.systems;
      this.dataService.systems = posts.systems;
      this.doSearch();
    });
  }



}
