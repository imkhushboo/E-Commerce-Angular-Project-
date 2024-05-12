import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Order } from '../data-type';

@Component({
  selector: 'app-myorder',
  templateUrl: './myorder.component.html',
  styleUrls: ['./myorder.component.css']
})
export class MyorderComponent implements OnInit{
  constructor(private product:ProductService){}

  Orders: Order[] = []

  ngOnInit(): void {
 
    this.getOrders();
  }

  handleCancelOrder(id:string | undefined){
    this.product.CancelOrder(id).subscribe(()=>{
      this.getOrders();
        })
  }

  getOrders(){
    let user = localStorage.getItem('user');
    let userId = user && JSON.parse(user).id;

    this.product.fetchOrders(userId).subscribe((res)=>{
      this.Orders = res;
    })

  }

}
