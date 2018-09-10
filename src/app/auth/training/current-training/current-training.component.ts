import { Component, OnInit, EventEmitter } from '@angular/core';
import {MatDialog} from '@angular/material';
import { DialogComponent } from './dialog.component';
import { TrainingService } from '../training.service';
import { Excercise } from '../excercise.model';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.css']
})
export class CurrentTrainingComponent implements OnInit {
  spinnerProgress:number=0;
  currentTraining:Excercise;
  stepFunc:number;
  timer;
  timerFlag:boolean = true;
  constructor(private dialog: MatDialog, private trainingService:TrainingService) {


   }

  ngOnInit() {
    
    this.startOrResumeTimer();
  }


  startOrResumeTimer(){
    this.currentTraining =  this.trainingService.getCurrentTraining();
    this.stepFunc = (this.currentTraining.duration/100) * 1000;
    this.timer =  window.setInterval(()=>{
      this.spinnerProgress = this.spinnerProgress + 1;    
      console.log("stepFunc",this.stepFunc);
      if(this.spinnerProgress == 100) 
      {
        this.trainingService.completeExcercise();
        this.timerFlag = false; 
        clearInterval(this.timer);  
      }  
             
    },this.stepFunc);
  }

  stopTimer(){
    clearInterval(this.timer); 
    let dialog = this.dialog.open(DialogComponent,{data:{'progress':this.spinnerProgress}});
    dialog.afterClosed().subscribe(result=>{
      console.log(`Dialog closed : ${result}`);
      if(result)
        this.trainingService.cancelExcercise(this.spinnerProgress);
      else
        this.startOrResumeTimer();
    })
  }

}
