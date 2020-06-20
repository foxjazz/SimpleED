import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {System} from "./Models/system";
import {Observable} from "rxjs";
import {Stations} from "./Models/stations";
import {Commodities} from "./Models/Commodities";

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
    this.getSystems();
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
  public stations: Stations;
  public market: Commodities;
  public getMarket(sys: string, name: string)  {
    let uri = this.getMarketUri.replace("SYSID", sys);
    uri = uri.replace("STATIONNAME", name);
    this.getMarketObj(uri).subscribe(a => {
      this.market = a;
    })
  }
  public getMarketObj(uri: string): Observable<Commodities> {
    return this.h.get<Commodities>(uri);
  }
  public getStations(n: string) {
    let uri = this.getStationsUri + n;
    this.getStationsObj(uri).subscribe(a => {
      this.stations = a;
    })
  }
  public getStationsObj(uri: string): Observable<Stations> {
    return this.h.get<Stations>(uri);
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
