import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RequestService } from 'src/app/services/request.service'
import { UserService } from 'src/app/services/user.service'
import { User } from 'src/app/models/user.interface'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  public emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  constructor(private _router: Router, private _requestService: RequestService, private _userService: UserService) { }

  onSubmit(): void{
    if(this.emailFormControl.valid){
      this._requestService.getEmailDataFromApi(this.emailFormControl.value).subscribe((res: User[]) => {
        if(res.length > 0){
          this._userService.user = res[0]
          this._router.navigate(['posts'])
        }
      }, error => {
        console.log('Handle error here')
      })
    }
  }

}
