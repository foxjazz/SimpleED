import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {System} from "./Models/system";
import {Observable, Subject} from "rxjs";
import {Station, StationHead} from "./Models/stations";
import {Commodities, MarketData} from "./Models/Commodities";

@Injectable({
  providedIn: 'root'
})
export class EDSDataService{

  private getStationsUri: string;
  private getMarketUri: string;
  private ready: boolean;
  searchOption=[]
  constructor(private h: HttpClient) {
    this.getStationsUri = "https://www.edsm.net/api-system-v1/stations?systemName=";
    this.getMarketUri = "https://www.edsm.net/api-system-v1/stations/market?systemId=SYSID&stationName=STATIONNAME";
    this.ready = false;
    this.notifyDP = new Subject<null>();
    this.load3Diamond();
  }
  load3DiamondObs(): Observable<any>{
    return this.h.get<any>("../assets/3Diamond.json")
  }
  load3Diamond(){
    this.load3DiamondObs().subscribe(a => {
      this.systems = a.systems;
      this.ready = true;
    })
  }
  public getSystemsObs(): Observable<any>{
    //return this.h.get<any>("../assets/test.json")
     return this.h.get<any>("../assets/populatedSystems.json")
  }
  public getSystems(){
    this.getSystemsObs().subscribe(a => {
      this.systems = a.systems;
      this.ready = true;
    })
  }

  public systems: System[];
  public stations: Station[];
  public market: Commodities;
  private system: System;
  public marketData: MarketData[];
  private edsmId: string;
  notifyDP: Subject<null>;
  public getMarket(sys: string, name: string, total: number)  {
    let uri = this.getMarketUri.replace("SYSID", sys);
    uri = uri.replace("STATIONNAME", name);
    this.getMarketObj(uri).subscribe(a => {
      for(const cc of a.commodities) {
        let m: MarketData;
        m = cc;
        m.stationName = name;
       this.marketData.push(m);
       if (this.marketData.length === total) {
         this.notifyDP.next();
       }
      }
    })
  }
  public getMarketObj(uri: string): Observable<Commodities> {
    return this.h.get<Commodities>(uri);
  }

  getData(d: System){
    this.marketData = [];
    this.edsmId = d.edsm_id.toString();
    this.system = d;
    this.getStations(d.name.toString());
  }
  public getStations(n: string) {
    let uri = this.getStationsUri + n;
    this.getStationsObj(uri).subscribe(a => {
      this.stations = a.stations;
      for(const h of a.stations){
        this.getMarket(this.edsmId, h.name, a.stations.length)
      }
    })
  }
  public getStationsObj(uri: string): Observable<StationHead> {
    return this.h.get<StationHead>(uri);
  }
  filteredListOptions() {
    let posts = this.systems;
    let filteredPostsList = [];
    for (let post of posts) {
      for (let options of this.searchOption) {
        if (options.title === post.name) {
          filteredPostsList.push(post);
        }
      }
    }
    console.log(filteredPostsList);
    return filteredPostsList;
  }

}
