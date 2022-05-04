export interface Product {
  _id: string;
  name: string;
  listImage: Array<any>;
  categoryId: String;
  description: String;
  price: 10000;
  percentSale: 20;
  colors: Array<string>;
  sizes: Array<string>;
  qtyInStock: Number;
}
