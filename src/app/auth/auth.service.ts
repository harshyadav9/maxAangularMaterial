import { User } from "./user.model";
import { AuthData } from "./auth-data.model";
import { Subject } from "rxjs/Subject";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { AngularFireAuth, AngularFireAuthModule } from 'angularfire2/auth';
import { TrainingService } from "./training/training.service";
import { MatSnackBar } from "@angular/material";
import { UIService } from "../shared/ui.service";
import { Store } from "@ngrx/store";
import * as fromApp from '../app.reducer';
@Injectable()
export class AuthService {
   
    private user:User;
    private isAutheticated:boolean = false;
    public authChange = new Subject<boolean>();
    
    constructor(private router:Router ,  private afAuth:AngularFireAuth , 
        private trainingService:TrainingService , private snackbar:MatSnackBar , private uiService:UIService,
        private store:Store<{ui:fromApp.State}>){

    }
    registerUser(authData:AuthData){
        // this.uiService.loadingStateChanged.next(true);
        this.store.dispatch({type:'START_LOADING'});
        this.afAuth.auth.createUserWithEmailAndPassword(authData.email , authData.password).then(
            result=>{
                this.initAuthListener();
                // this.uiService.loadingStateChanged.next(true);
                this.store.dispatch({type:'STOP_LOADING'});
            }).catch(error=>{
                console.log("error" , error.message);
                this.snackbar.open(error.message,null,{duration:2000});
                // this.uiService.loadingStateChanged.next(false);
                this.store.dispatch({type:'STOP_LOADING'});
            });
        
    }

     initAuthListener(){
        this.afAuth.authState.subscribe(user=>{
            console.log("user",user);
            if(user)
            {
                this.isAutheticated = true;
                this.router.navigate(['/training']);
                this.authChange.next(true);
               
            }
            else
            {
                this.isAutheticated = false;
                this.router.navigate(['/login']);
                this.authChange.next(false);
            }
        });
    }

    login(authData:AuthData){
        // this.uiService.loadingStateChanged.next(true);
        this.store.dispatch({type:'START_LOADING'});
        console.log("current user logged in",this.afAuth.auth.currentUser);
        // this.afAuth.auth.setPersistence("SESSION");
        this.afAuth.auth.signInWithEmailAndPassword(authData.email , authData.password).then(
            result=>{
                this.initAuthListener();
                // this.uiService.loadingStateChanged.next(false);
                this.store.dispatch({type:'STOP_LOADING'});
            }).catch(error=>{
                let snackbarRef = this.snackbar.open(error.message,"click me",{duration:2000});
                // this.uiService.loadingStateChanged.next(false);
                this.store.dispatch({type:'STOP_LOADING'});
            });
            
        
    }



    logout(){
        this.afAuth.auth.signOut();
       
        this.user = null;
        
        this.isAutheticated = false;
        this.authChange.next(false);
        this.router.navigate(["/login"]);
        this.trainingService.cancelSubscription();
        console.log("current user logged in",this.afAuth.auth.currentUser);
    }

    getUser(){
        return {... this.user};
    }

    isAuth(){
        return this.isAutheticated;       
    }

   

}