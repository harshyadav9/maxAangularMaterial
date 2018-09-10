import { Component, OnInit, OnDestroy } from '@angular/core';
import { TrainingService } from './training.service';
import { Excercise } from './excercise.model';
import { Subscription } from 'rxjs';
// import { ViewEncapsulation } from '@angular/compiler/src/core';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit, OnDestroy{
  currentTrainingShown:boolean = false;
  excerciseSubsription:Subscription;
  // trainings = [];
  constructor(private trainingService:TrainingService) { }

  ngOnInit() {
      // this.trainings = this.trainingService.getExcercises();
      this.excerciseSubsription = this.trainingService.excercise.subscribe((
        exercise:Excercise)=>{
          if(exercise)
            this.currentTrainingShown = true;
          else
            this.currentTrainingShown = false;
          
    });
  }

  ngOnDestroy(){
    if(this.excerciseSubsription)
      this.excerciseSubsription.unsubscribe();
  }

}
