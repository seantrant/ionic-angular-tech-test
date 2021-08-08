import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../models/post.interface';

@Injectable({
  providedIn: 'root'
})
export class RequestService {
  private _apiUrl: string = 'https://jsonplaceholder.typicode.com/';

  constructor(private _http: HttpClient) { }

  getEmailDataFromApi(email): Observable<any>{ 
    return this._http.get(`${this._apiUrl}users?email=${email}`)
  }

  getPostsFromApi(): Observable<any>{ 
    return this._http.get(`${this._apiUrl}posts`)
  }

  getUsersFromApi(): Observable<any>{ 
    return this._http.get(`${this._apiUrl}users`)
  }

  createPost(post:Post){
    // return this._http.post(`${this._apiUrl}posts`, post)

    // hack to simulate adding posts
    let localPosts:any = JSON.parse(localStorage.getItem('posts')) || [];
    localPosts.push(post)
    localStorage.setItem('posts', JSON.stringify(localPosts))
  }

}
