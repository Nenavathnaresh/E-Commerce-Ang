import { Component } from '@angular/core';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {

  cartProduct: any[] = [];
  totalPrice:any
  totalAmount:any;
  discount:any = 0;
  deliverCharge:any = 0;
  constructor(private ps: ProductService) { }

  ngOnInit() {

    this.cartProduct = this.ps.getAllCartItems()

    console.log(this.cartProduct);
    this.price()
    this.priceDetails()
  }

  decrement(product: any) {
    product.count--
    this.price()
    this.priceDetails()
  }

  increment(product: any) {
    product.count++
    this.price()
    this.priceDetails()
  }

  priceDetails(){
    if(this.totalPrice >= 500){
      this.discount = 5
    }
    if(this.totalPrice >= 1000){
      this.discount = 10
    }
    if(this.totalPrice >= 2000){
      this.discount = 15
    }

    if(this.totalPrice <= 500){
      this.deliverCharge = 50
    }
    else{
      this.deliverCharge = 0
    }
    this.totalAmount = this.totalPrice - (this.totalPrice*(this.discount/100))+(this.deliverCharge)
  }

  price(){
    this.totalPrice = this.cartProduct.reduce((a: any, b: any) => {
      return (
        a + (b['price'] * b['count'])
      )
    }, 0)
    
  }

  remove(i:any){
    let removeConfirm = window.confirm('Are you sure ?')
    if(removeConfirm){
      this.cartProduct.splice(i,1)
      this.price()
      this.priceDetails()
    }
   
  }
  
}
