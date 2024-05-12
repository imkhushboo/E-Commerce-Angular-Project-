import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../data-type';

@Component({
  selector: 'app-seller-add-product',
  templateUrl: './seller-add-product.component.html',
  styleUrls: ['./seller-add-product.component.css']
})
export class SellerAddProductComponent{
  constructor(private selleraddproduct : ProductService){}
  productaddmsg:string | undefined

  submitProductDetails(data : Product):void
  {
    this.selleraddproduct.addProduct(data).subscribe((result:any)=>{
      if(result)
        {
          this.productaddmsg = "Successfully added to Products !";
          
          setTimeout(()=>{this.productaddmsg = undefined},3000);
         
        }
        else{

          this.productaddmsg = undefined;
        }
       console.log(this.productaddmsg);
    })
  }

}
