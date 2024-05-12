import { CanActivateFn, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { SellerService } from './services/seller.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class authGuard {
  constructor(private sellerService: SellerService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if(localStorage.getItem('seller')){
    return true;
    }


    // Access SellerService methods or properties
    return this.sellerService.isSellerLogin.value;
  }
}
