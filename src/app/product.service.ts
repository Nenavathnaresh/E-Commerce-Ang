import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  productApi: string = 'https://fakestoreapi.com/products';
  cartApi:string = "http://localhost:3000/cart"
  cartArr:any[]=[];
  cartSubject = new Subject();
  sortCrit:any;
  sortSubject = new Subject()
  constructor(public http: HttpClient) { }

  ngOnInit() {

  }

  getAllProduct() {
    return this.http.get(this.productApi);
  }

  addProductTocart(product:any){
    product = {...product, count:1}
    this.cartArr.push(product)
    this.cartSubject.next(this.cartArr)
    // console.log(this.cartArr);
    
  }

  getAllCartItems(){
    return this.cartArr;
  }

  getSortCriterion(crit:any){
    this.sortCrit = crit
    this.sortSubject.next(this.sortCrit)
  }
}
