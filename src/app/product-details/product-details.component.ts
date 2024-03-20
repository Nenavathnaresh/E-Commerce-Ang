import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent {

  productDetails:any;

  constructor(public aR:ActivatedRoute){}

  ngOnInit(){
    this.aR.queryParams.subscribe((res)=>{
      this.productDetails = res
      console.log(res);
    })
  }
}
