export interface Signup{
    name : string,
    email : string,
    password : string
}


export interface Loginup{
    email : string,
    password : string
}


export interface Product{
        productName: string,
        productPrice: number,
        productCategory: string,
        productImageLink: string,
        productColor: string,
        productDescription: string,
        id:string,
        quantity:undefined | number
}


export interface Cart{
    productName: string,
    productPrice: number,
    productCategory: string,
    productImageLink: string,
    productColor: string,
    productDescription: string,
    productid:string,
    quantity:undefined | number
    user :  string ,

}



export interface PriceSummary{
    price: number,
    tax : number,
    delievery:number,
    discount:number,
    total:number


}

export interface Order{
    name:string,
    email:string,
    address:string,
    contact:string,
    userId:string,
    totalPrice:number,
    id:string | undefined

}