import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  productApi: string = 'https://fakestoreapi.com/products';
  cartApi: string = "http://localhost:3000/cart"
  cartArr: any[] = [];
  products: any[] = [];
  filteredProducts: any;
  priceFilter:any;
  sortCrit: any;
  searchText:any='';

  cartSubject = new Subject();
  sortSubject = new Subject();
  priceFilterSubject = new Subject();
  searchSubject = new Subject();

  constructor(public http: HttpClient) { }

  ngOnInit() {

  }

  getAllProduct() {
    return this.http.get(this.productApi).pipe(map((product:any)=>{
      this.products = product;
      this.filteredProducts = this.products;
      return product;
    }))
  }

  addProductTocart(product: any) {
    product = { ...product, count: 1 }
    this.cartArr.push(product)
    this.cartSubject.next(this.cartArr)
    // console.log(this.cartArr);

  }

  getAllCartItems() {
    return this.cartArr;
  }

  getSortCriterion(crit: any) {
    this.sortCrit = crit
    this.sortSubject.next(this.sortCrit)
  }

  sortProducts(criteria: any) {
    switch (criteria) {
      case "Price(Low to High)":
        this.filteredProducts.sort((a: any, b: any) => {
          if (a.price < b.price) {
            return -1
          }
          if (a.price > b.price) {
            return 1
          }
          return 0
        });
        break;
      case "Price(High to Low)":
        this.filteredProducts.sort((a: any, b: any) => {
          if (a.price < b.price) {
            return 1
          }
          if (a.price > b.price) {
            return -1
          }
          return 0
        });
        break;
    }
    return this.filteredProducts;
  }

  getPriceFilter(price:any){
    this.priceFilter = price;
    this.priceFilterSubject.next(this.priceFilter)
  }

  getFilteredProductsByPrice(price:any){
    return this.filteredProducts = this.products.filter((product:any)=>{
      return product.price <= price
    })
  }

  getSearchString(searchText:any){
    this.searchText = searchText
    this.searchSubject.next(this.searchText)
  }
}
