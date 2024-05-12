import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { Product } from '../data-type';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit{
  constructor(private route :ActivatedRoute,private product :ProductService,private routes:Router){}
  productList:undefined |Product[]

  
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      // Fetch products whenever route parameters change
      this.fetchProducts();
    });

  }

  fetchProducts(){
    const val= this.route.snapshot.paramMap.get('query');
    console.log(val);
    val &&  this.product.searchProduct(val).subscribe((result)=>{
      if(result)
        {
          this.productList = result;
        }
    })

    console.log(this.productList);
  }

  showDetails(id:string){

    this.routes.navigate([`details/${id}`])

  }
}
