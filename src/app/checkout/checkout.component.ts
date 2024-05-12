import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Cart, Order } from '../data-type';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit{
  constructor(private product:ProductService,private route:Router){}

  totalPrice:number = 0
  cartData:Cart[] | undefined

  ngOnInit(): void {
    let user = localStorage.getItem('user');
    let userid = user && JSON.parse(user).id;
    this.product.fetchCartWithUser(userid);
    this.product.cartdata.subscribe((res:Cart[])=>{
      this.cartData = res;
      let price = 0;
      res.forEach((product:Cart)=>{
        if(product.quantity)
        price += (product.productPrice)*(product.quantity)
      else{
        price += (product.productPrice)
      }
      })
     
      this.totalPrice = price + 100 - price/10 + price/10;
    })

    // console.log(this.priceSummary.price/10);

   

  }

  handleOrder(val:any){
    let user = localStorage.getItem('user');
    let userId = user && JSON.parse(user).id;
    let order:Order={
      ...val,
      userId,
      totalPrice:this.totalPrice
    }
    this.product.handlePlaceOrder(order).subscribe((res)=>{
      alert("Order Successfully Placed!!");
      setTimeout(()=>{
        this.route.navigate(['my-order'])
      },3000);

      this.cartData?.forEach((items)=>{
        setTimeout(()=>{
          this.product.deleteitemfromCart(items.productid).subscribe(()=>{
            let user = localStorage.getItem('user');
            let userid = user && JSON.parse(user).id;
            this.product.fetchCartWithUser(userid);
          })


        },600)
      })
    })
    
  }

}
