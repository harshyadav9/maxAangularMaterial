import { Component , ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { UIService } from './shared/ui.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit{
  @ViewChild('sidenav') sidenav;
  constructor(private authService:AuthService){
      this.authService.initAuthListener();
  }

  
  onClose()
  {
    this.sidenav.close();
  } 
  ngAfterViewInit(){
    console.log("sidenav",this.sidenav);
  }
  title = 'app';
}
