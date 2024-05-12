import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Cart, PriceSummary } from '../data-type';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-cart-paghe',
  templateUrl: './cart-paghe.component.html',
  styleUrls: ['./cart-paghe.component.css']
})
export class CartPagheComponent implements OnInit{
  constructor(private product : ProductService,private route:Router,private active:ActivatedRoute){}
  Carts: Cart[]  = [];
  priceSummary: PriceSummary={
    price:0,
    tax:0,
    delievery:0,
    total:0,
    discount:0


  }



  ngOnInit(): void {
    this.loadDetails();

  }

  loadDetails(){
    let user = localStorage.getItem('user');
    let userid = user && JSON.parse(user).id;
    this.product.fetchCartWithUser(userid);
    this.product.cartdata.subscribe((res:Cart[])=>{
      // if(!res.length) {
      //   this.route.navigate(['/']);
      // }
      this.Carts = res;
      console.log(this.Carts);

      // if(this.Carts.length === 0){
      //   this.route.navigate(['/']);
      // }

      res.forEach((product:Cart)=>{
        if(product.quantity)
        this.priceSummary.price += (product.productPrice)*(product.quantity)
      else{
        this.priceSummary.price += (product.productPrice)
      }
      })
      this.priceSummary.delievery = 100;
      this.priceSummary.tax = this.priceSummary.price/10;
      this.priceSummary.discount = this.priceSummary.price/10;
  
      this.priceSummary.total = this.priceSummary.price + this.priceSummary.delievery - this.priceSummary.discount + this.priceSummary.tax;
     
    })


  }
  handleRemoveToCart(productid:string){
    this.product.removetocartUser(productid).subscribe(()=>{
      console.log("removed!!");
      let user = localStorage.getItem('user');
      let userid = user && JSON.parse(user).id;
       this.product.fetchCartWithUser(userid);
    })

  }


  handleCheckout(){
    this.route.navigate(['checkout']);
  }

}
