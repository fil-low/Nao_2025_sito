import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthRequestService {
  localSessionId = localStorage.getItem("session_id")
  localUsername = localStorage.getItem("username")

  constructor(private http: HttpClient) { }

  isAuth(): boolean {
    this.http.post("https://www.bitlusion.com/auth/session.php", {
      request: "checkSessionId",
      session_id: this.localSessionId,
      username: this.localUsername
    }).subscribe(res => {
      console.log(res)
      if (!(res == true)) {
        localStorage.removeItem("session_id")
        localStorage.removeItem("username")
        return false
      }
      return true
    })
    return false
  }

  isAdmin(): boolean {
    return true
  }
}
