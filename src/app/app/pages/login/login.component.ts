import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  form: FormGroup
  formError = {
    "show": false,
    "message": ""
  }

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      emailUser: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required]),
    })
  }

  onSubmit() {
    console.log(this.form)
    this.form.reset()
  }

  login() {
    if(this.form.valid) {
      if(!(this.http.post<any[]>("https://www.bitlusion.com/auth/session.php", {
        request: "signin",
        emailUser: this.form.controls['emailUser'].value,
        password: this.form.controls['password'].value
      }).subscribe(res => {
        if(res['status']) {
          localStorage.setItem("session_id", res['session_id'])
          localStorage.setItem("username", res['username'])
          this.formError[0] = false
          this.router.navigate(["/dashboard"])
        } else {
          this.formError['show'] = true
          this.formError['message'] = "Incorrect username or password."
        }
      }))) {
        this.formError['show'] = true
        this.formError['message'] = "System error!"
      }
    } else {
      this.formError['show'] = true
      this.formError['message'] = "Fill in the mandatory fields."
    }
  }
}
