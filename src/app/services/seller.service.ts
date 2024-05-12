import { EventEmitter, Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Loginup, Signup } from '../data-type';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SellerService {

  constructor(private http : HttpClient,private route : Router) { }
  isSellerLogin = new BehaviorSubject<boolean>(false)
  isLoginError = new EventEmitter<boolean>(false)
  userSignup(data : Signup){
    return this.http.post("http://localhost:3000/seller",data , {observe : 'response'}).subscribe((result )=>{
      console.log("result" , result);

    })
    
  }


  userLoginup(data : Loginup){
    console.log(data);
    return this.http.get(`http://localhost:3000/seller?email=${data.email}&password=${data.password}`,{observe : 'response'}).subscribe((result:any )=>{
      console.log("result" , result);

      if(result && result.body && result.body.length)
        {
          console.log("Successfully Login!");
          this.isSellerLogin.next(true);
          this.isLoginError.next(false);
          localStorage.setItem("seller" , JSON.stringify(result.body))
          this.route.navigate(['seller-home']);

        }
        else{
          this.isLoginError.next(true);
          console.log("error occured!!");
        }
    })
    
  }
  reload(){
    console.log("hello");
    if(localStorage.getItem('seller')){
      
      this.isSellerLogin.next(true);
      this.route.navigate(['seller-home']);
    }
  }
}
