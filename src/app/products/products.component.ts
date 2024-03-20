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
  constructor(public ps:ProductService){}

  ngOnInit(){
    this.getProducts()
  }

  getProducts(){
    this.ps.getAllProduct().subscribe((res)=>{ 
      this.products = res
      for(let i = 0; i< this.products.length; i++ ){
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
