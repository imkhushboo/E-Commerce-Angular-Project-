import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Cart, Order, Product } from '../data-type';
import { Observable, map, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http : HttpClient) { }

  cartdata = new EventEmitter<Cart[]| []>

  addProduct(data:Product):any{
    return this.http.post("http://localhost:3000/products",data);
  }

  getProductList()
  {
    return this.http.get<Product[]>("http://localhost:3000/products");
  }

  deleteProduct(id:string)
  {
    return this.http.delete(`http://localhost:3000/products/${id}`)
  }

  getProductDetails(id:string)
  {
    return this.http.get<Product>(`http://localhost:3000/products/${id}`);
  }

  updateProductDetails(product :Product)
  {
    return this.http.put(`http://localhost:3000/products/${product.id}`,product);
  }

  popularProduct(){
    return this.http.get<Product[]>(`http://localhost:3000/products?_limit=4`);
  }

  trendyProduct(){
    return this.http.get<Product[]>(`http://localhost:3000/products?_limit=8`);
  }
  searchProduct(inputValue: string): Observable<Product[]> {
    return this.http.get<Product[]>(`http://localhost:3000/products`)
      .pipe(
        map((result: Product[]) => {
          return result.filter((product: Product) => {
            const { id, productName, productPrice, productCategory, productColor, productDescription } = product;
            return (
              id.toLowerCase().includes(inputValue.toLowerCase()) ||
              productName.toLowerCase().includes(inputValue.toLowerCase()) ||
              productCategory.toLowerCase().includes(inputValue.toLowerCase()) ||
              productColor.toLowerCase().includes(inputValue.toLowerCase()) ||
              productDescription.toLowerCase().includes(inputValue.toLowerCase()) ||
              productPrice === parseFloat(inputValue)
            );
          });
        })
      );
  }

  handleAddtolocalCart(data:Product)
  {
    let cart = []
    let localstore = localStorage.getItem('localcart');
    if(!localStorage.getItem('localcart'))
    {
      localStorage.setItem('localcart',JSON.stringify([{productid:data.id,productCategory:data.productCategory,productName:data.productName, productPrice:data.productPrice,  productColor:data.productColor, productDescription:data.productDescription,productImageLink:data.productImageLink,quantity:data.quantity,user:""}]));
      this.cartdata.emit([{productid:data.id,productCategory:data.productCategory,productName:data.productName, productPrice:data.productPrice,  productColor:data.productColor, productDescription:data.productDescription,productImageLink:data.productImageLink,quantity:data.quantity,user:""}]);
    }
    else if(localstore){
      cart = JSON.parse(localstore);
      console.log(cart);
      cart.push(data);
      localStorage.setItem('localcart',JSON.stringify(cart));

    }
    this.cartdata.emit(cart);
  }

 

  removeItemCart(id: string | undefined) {
    if (id) {
      console.log("Deleting item with ID:", id);
      // Assuming the item is stored locally
      let localCart = localStorage.getItem('localcart');
  
      if (localCart) {
        console.log("Deleting from local cart");
        let cart: Cart[] = JSON.parse(localCart);
        cart = cart.filter((item) => item.productid !== id);
        console.log(cart);
        localStorage.setItem('localcart', JSON.stringify(cart));
        this.cartdata.emit(cart);
      }
    } else {
      console.log("ID is undefined. Cannot delete.");
      return; // Exit function if ID is undefined
    }
  
    
    
  }


  removetocartUser(id: string): Observable<any> {
    // Fetch the user ID from localStorage
    let user = localStorage.getItem('user');
    user = user && JSON.parse(user).id;
  
    // Make GET request to fetch cart items for the user
    return this.http.get(`http://localhost:3000/carts?user=${user}&productid=${id}`, { observe: 'response' }).pipe(
      switchMap((res: any) => {
        console.log(res);
        const itemId = res.body[0].id; // Assuming you're getting the ID of the item to delete from the response body
  
        // Make DELETE request to remove the item from the cart
        return this.http.delete(`http://localhost:3000/carts/${itemId}`);
      })
    );
  }
  

  handleAddtoCartUser(data : Cart):any{
    return this.http.post("http://localhost:3000/carts",data,{observe : 'response'})

  }


  fetchCartWithUser(user:string){    
    this.http.get<Cart[] | []>(`http://localhost:3000/carts?user=${user}`,{observe:'response'}).subscribe((result)=>{
      console.log(result.body);
    if(result.body)  
    this.cartdata.emit(result.body);
    });
  }


  handlePlaceOrder(data:Order){
    return this.http.post('http://localhost:3000/orders',data);
  }

  fetchOrders(userId:string){
    return this.http.get<Order[]>(`http://localhost:3000/orders?userId=${userId}`)
  }


  deleteitemfromCart(id:string):Observable<any>{
    let user = localStorage.getItem('user');
    user = user && JSON.parse(user).id;
  
    // Make GET request to fetch cart items for the user
    return this.http.get(`http://localhost:3000/carts?user=${user}&productid=${id}`, { observe: 'response' }).pipe(
      switchMap((res: any) => {
        console.log(res);
        const itemId = res.body[0].id; // Assuming you're getting the ID of the item to delete from the response body
  
        // Make DELETE request to remove the item from the cart
        return this.http.delete(`http://localhost:3000/carts/${itemId}`);
      })
    );
  }


  CancelOrder(id:string|undefined):any{
    return id && this.http.delete(`http://localhost:3000/orders/${id}`);
  }

  
  
}
  
