import { Component, OnInit } from '@angular/core';
import {EDSDataService} from "../edsdata.service";
import {System} from "../Models/system";
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {FilterPipe} from "../filter.pipe";

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
  constructor(
    private dataService: EDSDataService

  ) {this.search = ""; }

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



  ngOnInit() {
    this.dataService.getSystemsObs().subscribe(posts => {
      this.systems = posts.systems;
      this.dataService.systems = posts.systems;
      this.doSearch();
    });
  }



}
