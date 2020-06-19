import { Component, OnInit } from '@angular/core';
import {EDSDataService} from "../edsdata.service";
import {System} from "../Models/system";
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-market',
  templateUrl: './market.component.html',
  styleUrls: ['./market.component.css']
})
export class MarketComponent implements OnInit {
  systems : System[];
  data: string;
  // systemName: string;
  queryString: any;
  constructor(
    private dataService: EDSDataService
  ) { }

  ngOnInit() {
    this.dataService.getSystemsObs().subscribe(posts => {
      this.systems = posts.systems;
      this.dataService.systems = posts.systems;
    });
  }



}
