import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Flickity from 'flickity';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  private flickityInstance: Flickity | undefined;

  localSessionId = null
  localUsername = null
  cartItems: any = []
  keysArray: any[] = []
  dataProduct: {[k: string]: any} = {};
  i: any = 0

  totalPrice = 0

  carouselData = [
    {"name": "rosa", "price": 8.49, "image": "rosa.jpg"},
    {"name": "bonsai", "price": 29.99, "image": "bonsai.jpg"},
    {"name": "innaffiatoi", "price": 7.99, "image": "innaffiatoio.jpg"}
  ]

  constructor(private http: HttpClient, private router: Router, private el: ElementRef) { }

  ngOnInit(): void {
    this.localSessionId = localStorage.getItem("session_id")
    this.localUsername = localStorage.getItem("username")

    this.http.post("https://www.bitlusion.com/auth/session.php", {
      request: "checkSessionId",
      session_id: this.localSessionId,
      username: this.localUsername
    }).subscribe(res => {
      if (!(res == true)) {
        localStorage.removeItem("session_id")
        localStorage.removeItem("username")
        this.router.navigate(['/login'])
      }
    })
    this.cart()

    this.total()
  }

  logout() {
    localStorage.removeItem("session_id")
    localStorage.removeItem("username")
    this.router.navigate(['/login'])
  }

  cart() {
    this.http.post<string>("https://www.bitlusion.com/data/get-data.php", {
      request: "get-cart",
      username: this.localUsername
    }).subscribe(res => {
      if (JSON.stringify(res) == '{}') {
        this.cartItems = []
      } else {
        this.cartItems = JSON.parse(res)
      }
      this.keysArray = Object.keys(this.cartItems)
      this.getProductData(this.keysArray)
    })
  }

  getProductData(products) {
    for(let product of products){
      this.http.post("https://www.bitlusion.com/data/get-data.php", {
        request: "product-data",
        product: product
      }).subscribe(res => {
        this.dataProduct[product] = res
        console.log(this.dataProduct)
      })
    }
  }

  addItem(operation, item){
    let req =  (operation == "add") ? 'addToCart' : 'rmToCart'
    console.log(req)
    this.http.post<boolean>("https://www.bitlusion.com/data/get-data.php", {
      "request": req,
      "user": localStorage.getItem("username"),
      "product": item
    }).subscribe(res => {
      if(res == true){
        if(req == "addToCart"){
          this.cartItems[item] += 1
        } else {
          if(this.cartItems[item] > 0){
            this.cartItems[item] -= 1
          }
        }
      }
      this.total()
    })
  }

  total(){
    this.http.post<number>("https://www.bitlusion.com/data/get-data.php", {
      "request": "total",
      "user": localStorage.getItem("username"),
    }).subscribe(res => {
      this.totalPrice = res
    })
  }
}
