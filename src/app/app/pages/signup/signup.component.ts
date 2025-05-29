import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  form: FormGroup
  formError = {
    "show": false,
    "message": ""
  }

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      'name': new FormControl(null, Validators.required),
      'surname': new FormControl(null, Validators.required),
      'user': new FormControl(null, Validators.required),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, Validators.required)
    })
  }

  onSubmit() {
    console.log(this.form)
    this.form.reset()
  }

  checkUser() {
    this.http.post("https://www.bitlusion.com/auth/session.php", {
      request: "checkUserExist",
      user: this.form.controls['user'].value
    }).subscribe(res => {
      if(res == true) {
        this.form.controls['user'].setErrors({ incorrect: true })
        this.formError['show'] = true
        this.formError['message'] = "Username already exists"
      } else {
        this.form.controls['user'].setErrors(null)
        this.formError['show'] = false
      }
    })
  }

  inFocOut() {
    this.formError['show'] = false
    this.formError['message'] = ""
  }

  signup() {
    if(this.form.valid) {
      this.http.post("https://www.bitlusion.com/auth/session.php", {
        request: "signup",
        name: this.form.controls['name'].value,
        surname: this.form.controls['surname'].value,
        user: this.form.controls['user'].value,
        email: this.form.controls['email'].value,
        password: this.form.controls['password'].value
      }).subscribe(res => {
        if(res["status"]) {
          localStorage.setItem("session_id", res['session_id'])
          localStorage.setItem("username", res['username'])
          this.router.navigate(['/'])
        } else {
          this.formError['show'] = true
          this.formError['message'] = "Error!"
        }
      })
    }
  }
}
