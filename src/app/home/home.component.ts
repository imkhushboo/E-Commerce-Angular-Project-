import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../data-type';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  constructor(private product : ProductService,private route :Router){}
  productlist : undefined | Product[]
  trendingitem : undefined | Product[]

  

  ngOnInit(): void {
    this.product.popularProduct().subscribe((result)=>{
      this.productlist = result;
      // console.log(this.productlist);

    })
    this.trendingproduct();
  }


  trendingproduct(){
    this.product.trendyProduct().subscribe((result)=>{
      this.trendingitem = result;
    })
  }

  showDetails(id:string)
  {
    this.route.navigate([`details/${id}`])
  }



}
