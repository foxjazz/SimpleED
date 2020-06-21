import { Component, OnInit } from '@angular/core';
import {EDSDataService} from "../edsdata.service";
import {System} from "../Models/system";
import {FormControl} from '@angular/forms';
import {Observable, Subject} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {FilterPipe} from "../filter.pipe";
import {MarketData, Product} from "../Models/Commodities";

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
  marketList: any[][];
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
    this.marketData = this.dataService.marketData.sort((a, b) =>{
      if (a.sellPrice > b.sellPrice) {
        return -1;
      }
      if (a.sellPrice > b.sellPrice) {
        return 1
      }
      if (a.stationName > b.stationName) {
        return 1;
      }
      if (b.stationName > a.stationName) {
        return -1;
      }
      return 0;
    } );
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
    this.dataService.notifyDP.subscribe(() => {
      this.tempStations = [];
      let productsall = []
      let products = []
      for(const n of this.dataService.marketData){
        if (n.demand > 0 && n.sellPrice > 1) {
          this.setProduct(n.name);
        }
      }
      for (let comm of this.dataService.marketData){
        let arr: any[];
        if (this.tempStations.includes(comm.stationName)){
          break;
        }
        this.tempStations.push(comm.stationName);
        let data = this.getProducts(comm.stationName);
        
        this.marketList.push(data);
      }
      this.marketData = this.dataService.marketData;

    });

    this.dataService.load3DiamondObs().subscribe(posts => {
      this.systems = posts.systems;
      this.dataService.systems = posts.systems;
      this.doSearch();
    });
  }
  getProducts(sn: string): Product[]{
    const ret: Product[] = [];
    const tempRet: Product[] = [];
    let p: Product;
    for(let a of this.dataService.marketData){
      if (a.stationName == sn){
        p = {product: a.name, buyPrice: a.buyPrice, demand: a.demand}
        tempRet.push(p);
      }
    }
    for(const g of this.products){
      for(const d of tempRet){
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
