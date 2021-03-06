export interface Commodities {
  commodities: [
    {
      "stationName": string;
      "id": string;
      "name": string;
      "buyPrice": number;
      "stock": number;
      "sellPrice": number;
      "demand": number;
      "stockBracket": number;
    }]
}
export interface MarketData
{
  "stationName": string;
  "id": string;
  "name": string;
  "buyPrice": number;
  "stock": number;
  "sellPrice": number;
  "demand": number;
  "stockBracket": number;
}
export interface MarketSheet{
  "StationName": string;
  "Products": Product[];
}
export interface Product {
  product: string;
  buyPrice: number;
  demand : number;
}
