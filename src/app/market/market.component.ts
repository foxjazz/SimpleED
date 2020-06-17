import { Component, OnInit } from '@angular/core';
import {EDSDataService} from "../edsdata.service";

@Component({
  selector: 'app-market',
  templateUrl: './market.component.html',
  styleUrls: ['./market.component.css']
})
export class MarketComponent implements OnInit {

  constructor(private edsd: EDSDataService) { }

  ngOnInit(): void {
  }

}
