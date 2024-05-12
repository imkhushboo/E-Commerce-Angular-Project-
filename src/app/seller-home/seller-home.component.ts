import { Component, OnInit } from '@angular/core';
import { SellerService } from '../services/seller.service';
import { ProductService } from '../services/product.service';
import { Product } from '../data-type';

@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrls: ['./seller-home.component.css']
})
export class SellerHomeComponent implements OnInit{
  constructor(private product :ProductService){}
  productList : Product[] = []
  ngOnInit(): void {
    this.getProduct();
    
  }

  deleteproduct(id:string){
    this.product.deleteProduct(id).subscribe((result)=>{
      console.log(result);
      this.getProduct();
    })
  }
  getProduct(){
    this.product.getProductList().subscribe((result)=>{
      this.productList = result
    })

  }


}
