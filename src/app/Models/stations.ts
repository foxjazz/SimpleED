export interface Stations {
  "station":
    {
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
}
