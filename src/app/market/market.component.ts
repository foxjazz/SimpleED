import { Component, OnInit } from '@angular/core';
import {EDSDataService} from "../edsdata.service";
import {System} from "../Models/system";
import {FormControl} from '@angular/forms';
import {Observable, Subject} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {FilterPipe} from "../filter.pipe";
import {MarketData, MarketSheet, Product} from "../Models/Commodities";

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
  products: string[];
  marketList: MarketSheet[];
  tempStations: string[];
  constructor(
    private dataService: EDSDataService

  ) {
    this.search = ""; this.marketData = []
    this.products = [];
  }
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
  load3Diamond(){
    this.dataService.load3Diamond();
    if (this.systems.length === 1){
      this.search = this.systems[0].name;
      this.doSearch();
    }

  }
  loadAll() {
    this.dataService.getSystems();
  }



  sortMe() {
    this.marketList = this.marketList.sort((a,b) => {
      if (a.StationName > b.StationName){
        return 1;
      }
      if (a.StationName < b.StationName){
        return -1;
      }
      return 0;
    });

  }

  setProduct(s: string){
    for(const a of this.products){
      if (a === s){
        return;
      }

    }
    this.products.push(s);

  }
  ngOnInit() {
    this.dataService.notifyDP.subscribe((marketD: string) => {

      const tempStations: string[] = [];
      const tempMarketList: MarketSheet[] = [];
      const marketData: MarketData[] = JSON.parse(marketD);
      let fun: MarketSheet;
      for(const n of marketData){
        if (n.demand > 0 && n.sellPrice > 1 && n.name != null) {
          this.setProduct(n.name);
        }
      }
      this.products = this.products.sort((a, b) => {
        if (a > b){
          return 1;
        }
        if (a < b){
          return -1
        }
        return 0;
      })
      for (let comm of marketData){
        if (!this.hasStations(this.tempStations, comm.stationName)){
          console.log(comm.stationName);
          tempStations.push(comm.stationName);
          let data: Product[] = this.getProducts(comm.stationName);
          fun = {StationName: comm.stationName,  Products: data};
          tempMarketList.push(fun);
        }
      }
      this.marketList = tempMarketList;

    });

    this.dataService.load3DiamondObs().subscribe(posts => {
      this.systems = posts.systems;
      this.dataService.systems = posts.systems;
      this.doSearch();
    });
  }
  hasStations(temp: string[], search: string): boolean{
    if (temp == null){
      return false;
    }
    if (temp && temp.length == 0){
      return false;
    }
    for(const l of temp){
      if (l === search){
        return true;
      }
    }
    return false;
  }
  getProducts(sn: string): Product[]{
    const ret: Product[] = [];
    const tempRet: Product[] = [];
    let tempRetSorted: Product[] = [];
    let p: Product;
    for(let a of this.dataService.marketData){
      if (a.stationName == sn){
        p = {product: a.name, buyPrice: a.buyPrice, demand: a.demand}
        tempRet.push(p);
      }
    }


    tempRetSorted =   tempRet.sort((a, b) => {
      if (a.product > b.product){
        return 1;
      }
      if(b.product > a.product) {
        return -1;
      }
      return 0;
    });
    for(const g of this.products){
      for(const d of tempRetSorted){
        if (d.product === g){
          ret.push(d);
        }else {
          p = { product: g, buyPrice: 0, demand: 0};
          ret.push(p);
        }
      }
    }
    return ret;
  }


}
