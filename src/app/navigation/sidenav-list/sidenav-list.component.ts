import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit , OnDestroy {

  @Output('sidenavClose') sidenavClose = new EventEmitter<void>();
  isSidenavAuth:boolean = false;
  authSidenavSubscription:Subscription

  constructor(private authService:AuthService) { }

  ngOnInit() {
    this.authSidenavSubscription = this.authService.authChange.subscribe((value:boolean)=>{
      this.isSidenavAuth = value;
    });
  }

  ngOnDestroy(){
    this.authSidenavSubscription.unsubscribe();
  }

  onSidenavclose(){
    this.sidenavClose.emit();
  }

}
