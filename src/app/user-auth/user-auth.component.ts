import { Component, OnInit } from '@angular/core';
import { Cart, Product, Signup } from '../data-type';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css']
})
export class UserAuthComponent implements OnInit{

  constructor(private user : UserService,private route:Router,private product:ProductService){}

  ngOnInit(): void {
    if(localStorage.getItem('user'))
      {
        this.route.navigate(['']);
      } 
    
  }
  showLogin :boolean = false
  authErrormsg : string =  ''

signup (data : Signup) : void{
  console.log(data);
  this.user.userSignup(data) && (this.showLogin = true);

}

loginup (data : Signup) : void{
  this.user.userLoginup(data);
  this.user.isLoginError.subscribe((error) =>{
    console.log(error);
    if(error)
      {

        this.authErrormsg = "Email or password incorrect!";
      }
      else{
        this.localCartToRemoteCart();
      
      }

  })

}

openLogin() : void{
  this.showLogin = true;
}
openSignup() : void{
  this.showLogin = false;
}

localCartToRemoteCart(){
  let store = localStorage.getItem('localcart');
  let user = localStorage.getItem('user');
  const userid = user && JSON.parse(user).id;
  if(store )
    {
      let cartdata : Cart[] = JSON.parse(store);
      console.log(user);
    
        cartdata.forEach( (product : Cart,index)=> {
          let cartItem : Cart ={
            ...product,
            user: userid
          }
          setTimeout(()=>{
            this.product.handleAddtoCartUser(cartItem).subscribe((result:any)=>{
              console.log(result);
            
            })
          },500)
          if(cartdata.length === index + 1)
            {
              localStorage.removeItem('localcart');
            }


      })

      
      
    }

   
      setTimeout(()=>{
        console.log(userid);

        this.product.fetchCartWithUser(userid);              
      },2000);
  
}
}


