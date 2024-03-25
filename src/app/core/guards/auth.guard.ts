import { CanActivate, CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';

export class AuthGuard implements CanActivate{
  constructor(private auth: AuthService){
  
  }
  canActivate():boolean{
  if(this.auth.isLoggedIn()){
  return true
  }
  else{
  return false
  }
}}