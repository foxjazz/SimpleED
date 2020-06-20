export interface StationHead {
  id: number;
  id64: number;
  name: string;
  url: string;
  "stations":
    [{
      "id": number;
      "marketId": number;
      "type": string;
      "name": string;
      "distanceToArrival": number;
      "allegiance": string;
      "government": string;
      "economy": string;
      "secondEconomy": string;
      "haveMarket": boolean;
      "haveShipyard": boolean;
      "haveOutfitting": boolean;
      "otherServices": [];
    }]
}
export interface Station{
  "id": number;
  "marketId": number;
  "type": string;
  "name": string;
  "distanceToArrival": number;
  "allegiance": string;
  "government": string;
  "economy": string;
  "secondEconomy": string;
  "haveMarket": boolean;
  "haveShipyard": boolean;
  "haveOutfitting": boolean;
  "otherServices": [];
}
