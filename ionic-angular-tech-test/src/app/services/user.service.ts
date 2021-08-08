import { Injectable } from '@angular/core';
import { User } from '../models/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _currentUser: User;
  constructor() { }

  set user(user: User){
    this._currentUser = user
  }

  get userData(): User {
    return this._currentUser;
  }
}
