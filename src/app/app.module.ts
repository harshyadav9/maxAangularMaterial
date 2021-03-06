import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { MaterialModule } from './material.module';
import { WelcomeComponent } from './welcome/welcome.component';
import { AppRoutingModule } from './app.routing.module';
import { HeaderComponent } from './navigation/header/header.component';
import { SidenavListComponent } from './navigation/sidenav-list/sidenav-list.component';
import { DialogComponent } from './auth/training/current-training/dialog.component';
import { AuthService } from './auth/auth.service';
import { TrainingService } from './auth/training/training.service';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { environment } from '../environments/environment.prod';
import { UIService } from './shared/ui.service';
import { AuthModule } from './auth/auth.module';
import { StoreModule } from '@ngrx/store';  
import { appReducer } from './app.reducer';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    HeaderComponent,
    SidenavListComponent,
    DialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),    
    AuthModule,
    AngularFirestoreModule,
    StoreModule.forRoot({ui:appReducer})
  ],
  providers: [AuthService,TrainingService , UIService],
  bootstrap: [AppComponent],
  entryComponents:[DialogComponent]
})
export class AppModule { }
