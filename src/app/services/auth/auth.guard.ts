import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthRequestService } from '../auth-request/auth-request.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {
  constructor(private auth: AuthRequestService) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot, route: ActivatedRouteSnapshot){
    return this.auth.isAuth();
  }
}
