import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Loginup, Signup } from '../data-type';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {
 constructor(private http :HttpClient,private route:Router) { }
 isUserLogin = new BehaviorSubject<boolean>(false)
 isLoginError = new EventEmitter<boolean>(false)

 userSignup(data :Signup){
  return this.http.post("http://localhost:3000/users",data,{observe:'response'}).subscribe((result)=>{
    console.log(result);
  })
 }

 userLoginup(data : Loginup){
  console.log(data);
  return this.http.get(`http://localhost:3000/users?email=${data.email}&password=${data.password}`,{observe : 'response'}).subscribe((result:any )=>{
    // console.log("result" , result);

    if(result && result.body && result.body.length)
      {
        // console.log("Successfully Login!");
        this.isUserLogin.next(true);
        localStorage.setItem("user" , JSON.stringify(result.body[0]))
        this.isLoginError.next(false);
        this.route.navigate(['/']);

      }
      else{
        this.isLoginError.next(true);
        console.log("error occured!!");
      }
  })
  
}
}
