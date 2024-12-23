export class Product {
    constructor(
      public name: string,
      public description: string,
      public price: number,
      public stock: number,
      public category: string,
      public id?: number
    ) {}
  }