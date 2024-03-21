import { Component } from '@angular/core';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  isPriceFilterVisible:boolean = false;
  priceFilters:any[] = [50, 100, 150, 200];
  constructor(private ps:ProductService){}

  ngOnInit(){

  }

  showPriceFilters(){
    this.isPriceFilterVisible = !this.isPriceFilterVisible
  }

  filterProductsByPrice(priceFilter:any){
    this.ps.getPriceFilter(priceFilter)
  }
}
