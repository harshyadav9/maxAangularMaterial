import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit,OnDestroy {
  isAuth:boolean = false;
  authSubscription:Subscription;
  constructor(private authService:AuthService) { }
  @Output()  onSideNavClick = new EventEmitter<void>();
  
  ngOnInit() {
    this.authSubscription = this.authService.authChange.subscribe((value:boolean)=>{
      this.isAuth = value;
    });
  }

  ngOnDestroy(){
    this.authSubscription.unsubscribe();
  }


  onLogout(){
    this.authService.logout();
  }
  onSideNavButtonClick(){
    this.onSideNavClick.emit();

  }

  

}
