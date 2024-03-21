import { Component } from '@angular/core';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  cartItemCount:any;
  searchText:any = '';
  isSortMenuVisible:boolean = false
  criteria:any[]=["Price(Low to High)", "Price(High to Low)"];

  constructor(private ps:ProductService){ }

  ngOnInit(){
    this.ps.cartSubject.subscribe((res:any)=>{
      console.log(res);
      this.cartItemCount = res.length
    })
  }

  showSortMenu(){
    this.isSortMenuVisible = !this.isSortMenuVisible
  }

  sortProducts(criterion:any){
    this.ps.sortProducts(criterion)
  }

  searchProduct(searchText:any){
    this.ps.getSearchString(searchText);
  }
}
