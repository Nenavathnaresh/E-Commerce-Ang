import { Component } from '@angular/core';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {
products:any;
productStatus:any = []
searchText:any;

  constructor(public ps:ProductService){}

  ngOnInit(){
    this.getProducts()

    this.ps.sortSubject.subscribe((sortCrit:any)=>{
      this.products = this.ps.sortProducts(sortCrit);
    });

    this.ps.priceFilterSubject.subscribe((price:any)=>{
      this.ps.getAllProduct().subscribe((res)=>{
        this.products = res;
        this.products = this.ps.getFilteredProductsByPrice(price);
      })
    })

    this.ps.searchSubject.subscribe((searchText:any)=>{
      this.searchText = searchText
    })
  }

  getProducts(){
    this.ps.getAllProduct().subscribe((res)=>{ 
      this.products = res
      for(let i = 0; i< this.products.length; i++){
      this.productStatus.push(false)
      }
    })
  }

  addToCart(product:any, i:any){
    this.ps.addProductTocart(product);
    this.productStatus[i] = true
    // console.log(this.cartArr);

  }
  
}
