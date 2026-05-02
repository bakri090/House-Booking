export interface IPropertyBase {
  id?: number;
  sellRent?:number;
  price: number;
  name: string;
  propertyType: string;
  furnishingType: string;
  image?: string;
  bhk: number;
  builtArea: number;
  city: string;
  readyToMove: number;
  estPossessionOn?: Date;
}
