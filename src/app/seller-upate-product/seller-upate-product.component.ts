import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { Product } from '../data-type';

@Component({
  selector: 'app-seller-upate-product',
  templateUrl: './seller-upate-product.component.html',
  styleUrls: ['./seller-upate-product.component.css']
})
export class SellerUpateProductComponent implements OnInit{
  constructor(private route:ActivatedRoute,private product : ProductService){}
  productDetails : undefined | Product 
  successfulmsg : undefined | string
  ngOnInit(): void {
    let productid = this.route.snapshot.paramMap.get('id');
    productid && this.product.getProductDetails(productid).subscribe((result)=>{
      this.productDetails = result;
      console.log(this.productDetails);
    });
    
  }

  updateProduct(data :Product){
    this.productDetails && (data.id =  this.productDetails?.id) &&
    this.product.updateProductDetails(data).subscribe((result)=>{
      if(result)
        {
          this.successfulmsg = "Product Update successfully !!";

           setTimeout(()=>{this.successfulmsg = undefined},3000);
         }
         else{
          this.successfulmsg = undefined;
         }
    })
  }

}
