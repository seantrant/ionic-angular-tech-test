import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { RequestService } from 'src/app/services/request.service';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user.interface';
import { Post } from 'src/app/models/post.interface';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-post-form',
  templateUrl: './add-post-form.component.html',
  styleUrls: ['./add-post-form.component.scss'],
})
export class AddPostFormComponent implements OnInit {

  public addPostForm:FormGroup;
  public requiredError:string = 'Fields is required';
  public minCharacterError:string = 'Minimum 4 character are required';
  private _user: User;

  constructor(
    public formBuilder: FormBuilder, 
    private _requestService: RequestService, 
    private _userService: UserService,
    public dialog: MatDialogRef<AddPostFormComponent>) { }
  
  get getControl(){
    return this.addPostForm.controls;
  }

  ngOnInit(): void {
    this.addPostForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(1)]],
      body: ['', [Validators.required, Validators.minLength(1)]],
    })  

    this._user = this._userService.userData;
  }

  onSubmit(): void{
    if(this.addPostForm.valid){
      const newPost: Post = {
        userId: this._user.id,
        id: null,
        title: this.getControl.title.value,
        body: this.getControl.body.value
      }
      this._requestService.createPost(newPost)
      this.dialog.close();
    }
  }

}
