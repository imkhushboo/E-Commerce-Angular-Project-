import { Component, OnInit } from '@angular/core';
import { SellerService } from '../services/seller.service';
import { Router } from '@angular/router';
import { Signup } from '../data-type';


@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrls: ['./seller-auth.component.css']
})
export class SellerAuthComponent implements OnInit{
  
  
  
  constructor(private  seller : SellerService,private route: Router){}
  ngOnInit(): void {
    this.seller.reload();
    }

    showLogin :boolean = false
    authErrormsg : string =  ''

  signup (data : Signup) : void{
    console.log(data);
    this.seller.userSignup(data) && (this.showLogin = true);

  }

  loginup (data : Signup) : void{
    this.seller.userLoginup(data);
    this.seller.isLoginError.subscribe((error) =>{
      if(error)
        {

          this.authErrormsg = "Email or password incorrect!";
        }

    })

  }

  openLogin() : void{
    this.showLogin = true;
  }
  openSignup() : void{
    this.showLogin = false;
  }

}
