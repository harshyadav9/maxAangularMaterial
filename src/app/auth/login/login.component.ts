import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup , Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { UIService } from '../../shared/ui.service';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import { Store } from '@ngrx/store';
import * as fromApp from '../../app.reducer';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm:FormGroup;
  isLoading$:Observable<boolean>;
  constructor(private fb:FormBuilder,private authService:AuthService ,  public uiService:UIService , private store:Store<{ui:fromApp.State}>) {

    this.loginForm = this.fb.group({
      email:[null,Validators.compose([Validators.required , Validators.email])],
      password:[null,Validators.required] 
    })
   }

  ngOnInit() {
    this.isLoading$ = this.store.pipe(map(state=>state.ui.isLoading));
    this.store.subscribe(data=>console.log("data",data))
  }

  onSubmit(form:any){
   
    this.authService.login({
      email:form.email,
      password:form.password
    });
    console.log(form);
    
  }

}
