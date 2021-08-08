import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post.interface';
import { User } from 'src/app/models/user.interface';
import { RequestService } from 'src/app/services/request.service'
import { UserService } from 'src/app/services/user.service'
import { AddPostFormComponent } from '../add-post-form/add-post-form.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent implements OnInit {

  public posts: Post[];
  public loggedInUserPosts: Post[];
  public otherUserPosts: Post[];
  public user: User;
  public listEnd: number = 4;
  private _users: User[];
  
  constructor(private _requestService: RequestService, public _userService: UserService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this._getPosts();
    this._getUsers();
    this.user = this._userService.userData;
  }
  
  addPost():void{
      const dialogRef = this.dialog.open(AddPostFormComponent);
      dialogRef.afterClosed().subscribe(result => {
        this._getPosts();
      });
  }
  
  loadMorePosts():void{
    this.listEnd = this.listEnd + 4;
    
  }

  tabChanged(event): void{
    this.listEnd = 4;
  }

  getUserName(id:number): string{
    const userDetails = this._users.find(user => user.id == id )
    return userDetails.name;
  }

  private _getUsers():void{
    this._requestService.getUsersFromApi().subscribe((res: User[]) => {
      this._users = res;
    })
  }

  private _getPosts():void {
    this._requestService.getPostsFromApi().subscribe((res: Post[]) => {
      this.posts = res;
      this._refreshPosts(res);
    }, error => {
      console.log('Handle error here')
    })
  }

  private _refreshPosts(posts:Post[]): void{
    this._setUserPosts(posts);
    this._setOtherUserPosts(posts)
  }

  private _setUserPosts(posts:Post[]): void{
    this.loggedInUserPosts = this.posts.filter((post) => {
      return post.userId == this.user.id
    })

    // hack to add posts from local storage
    const localPosts = JSON.parse(localStorage.getItem('posts')) || [];
    const newPosts = localPosts.filter((post) => {
      return post.userId == this.user.id;
    });
    this.loggedInUserPosts = [...newPosts, ...this.loggedInUserPosts];
  }

  private _setOtherUserPosts(posts:Post[]):void{
    this.otherUserPosts = this.posts.filter((post) => {
      return post.userId !== this.user.id
    })
    // hack to add posts from local storage
    const localPosts = JSON.parse(localStorage.getItem('posts')) || [];
    const newPosts = localPosts.filter((post) => {
      return post.userId !== this.user.id;
    });
    this.otherUserPosts = [...newPosts, ...this.otherUserPosts];
  }


}
