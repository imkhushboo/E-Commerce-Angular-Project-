import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { Product } from '../data-type';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
  constructor(private route : Router,private  product : ProductService){}
  menutype = "default"
  sellername : string = ""
  username :string =""
  suggestedProduct:undefined | Product[]
  cartItems : number = 0
  
  ngOnInit():void{
    this.route.events.subscribe((val :any)=>{
      if(val.url )
        {
          // console.log(val.url);
          if(localStorage.getItem('seller') && val.url.includes('seller'))
            {
              let  sellerdata = localStorage.getItem('seller');
              let sellerstore = sellerdata && JSON.parse(sellerdata);
              this.sellername = sellerstore[0].name;
             this.menutype = "seller"
            }
            else if(localStorage.getItem('user') )
              {
                let  userdata = localStorage.getItem('user');
                let userstore = userdata && JSON.parse(userdata);
                this.username = userstore.name;
               this.menutype = "user"
              }

            else{
              this.menutype = "default"
            }
            

            let cartData = localStorage.getItem('localcart');
            if(cartData)
              {

                this.cartItems = JSON.parse(cartData).length;
              }

              this.product.cartdata.subscribe((items)=>{
                console.log(items);
                this.cartItems = items.length;
                console.log(val.url);
               
              })

              if(val.url === '/cart-page' && this.cartItems === 0){
                this.route.navigate(['/']);
              }
              

            

        }
    })

  }
  // ngOnDestroy(): void {
  //   this.product.cartdata.unsubscribe();
  // }


  logout() : void{
    localStorage.removeItem('seller');
    this.route.navigate(['/seller-auth']);
    
  }
  logoutUser():void{
    localStorage.removeItem('user');
    this.route.navigate(['/']);
    this.product.cartdata.emit([]);
  }


  searchProduct(data: KeyboardEvent) {
    // Check if data and target exist
    if (data && data.target) {
      // Extract the input value from the event target
      const inputValue = (data.target as HTMLInputElement).value.trim().toLowerCase();
  
      // Call the searchProduct method which returns an Observable
      this.product.searchProduct(inputValue).subscribe((result)=>{
        result && (this.suggestedProduct = result);
      })

      // console.log(this.suggestedProduct);
      
    }
  }


  hideSearch(){
    this.suggestedProduct = undefined
  }

  submitSearch(val:string)
  {
    console.log(val);
    this.route.navigate([`search/${val}`])
  }


  showproductDetails(id:string)
  {
    console.log("hello..");
    this.route.navigate([`details/${id}`])
  }
}
  