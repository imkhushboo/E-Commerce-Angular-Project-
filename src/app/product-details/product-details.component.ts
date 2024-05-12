import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { Cart, Product } from '../data-type';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit{
  constructor(private route:ActivatedRoute,private product :ProductService){

  }
  removeitem : boolean = false

  productQuantity : number = 1
  cartId : string =""
  ngOnInit(): void {
    this.route.params.subscribe(()=>
    this.fetchProductDetails())
    
  }
  ProductDetails : undefined | Product
  fetchProductDetails(){
    const id = this.route.snapshot.paramMap.get('productid');
    id && this.product.getProductDetails(id).subscribe((result)=>{
      this.ProductDetails = result
      

    })

    let localstore = localStorage.getItem('localcart');
    if(id && localstore)
      {
        let cart:Cart[] = JSON.parse(localstore);
      
        let product :Cart[] = cart.filter((item)=>item.productid === id);
        console.log(product);
  
        if(product.length)
        {
            this.removeitem = true
        }
        else{
          this.removeitem = false
        }
    
        
      }
      let user = localStorage.getItem('user');
      let userid = user && JSON.parse(user).id;
      if(userid)
        {
          console.log(userid);

          this.product.fetchCartWithUser(userid);
          this.product.cartdata.subscribe((item:Cart[])=>{
            console.log(item);
            console.log(id);
            item =item.filter((res:Cart)=>res.productid === id);
            console.log(item);
            if( item.length)
              {
               
                this.removeitem = true;
              }
              else{
                this.removeitem = false;
              }
          })
        }
  
   
  }
 

  handleQuantity(operation :  string)
  {
    if(this.productQuantity > 1 && operation === 'minus')
      {
        this.productQuantity-=1;
      }
    else if(this.productQuantity < 20 && operation === 'plus')
      {
        this.productQuantity += 1;
      }

      console.log(this.productQuantity);

  }


  handleAddtoCart(){
    if(this.ProductDetails){
      this.ProductDetails.quantity = this.productQuantity;
      let user = localStorage.getItem('user');
      if(!user)
        {
          this.product.handleAddtolocalCart(this.ProductDetails);
          this.removeitem = true;

        }
        else{
          console.log(JSON.parse(user));
                    let cartItem : Cart ={
            productCategory:this.ProductDetails.productCategory,
            productid : this.ProductDetails.id,
            productColor:this.ProductDetails.productColor,
            productImageLink:this.ProductDetails.productImageLink,
            productDescription:this.ProductDetails.productDescription,
            productName:this.ProductDetails.productName,
            productPrice:this.ProductDetails.productPrice,
            quantity:this.ProductDetails.quantity,
            user: user && JSON.parse(user).id
          }
          this.product.handleAddtoCartUser(cartItem).subscribe((result:any)=>{
            this.product.fetchCartWithUser(user && JSON.parse(user).id);
            this.removeitem = true;
          })
        }
    }
  }

  setProductQuantity(val:string)
  {
    let quantity = JSON.parse(val);
    if(quantity > 20 || quantity <=0)
      {
        quantity = 1;
      }
    this.productQuantity = quantity
    console.log(this.productQuantity);
  }

  handleRemovetoCart(id: undefined | string){
    console.log("here");
    let localcart = localStorage.getItem('localcart');
    if(localcart){

      this.product.removeItemCart(id);
      this.removeitem = false;
    }
    else{
     
     
      id && this.product.removetocartUser(id).subscribe((res:any)=>{

          if(res){
            let  user = localStorage.getItem('user');
            user = user && JSON.parse(user).id;
            if(user){
            this.product.fetchCartWithUser(user);

          }
        }

        });

        this.removeitem = false;
      }
    }



  

}
