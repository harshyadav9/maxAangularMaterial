import { Component, OnInit, EventEmitter, Input, OnDestroy } from '@angular/core';
import { Excercise } from '../excercise.model';
import { TrainingService } from '../training.service';
import { NgForm } from '@angular/forms';
import { AngularFirestore } from 'angularfire2/firestore';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { UIService } from '../../../shared/ui.service';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit , OnDestroy {
  selectedTraining;
  excercisesSubFlag:Boolean = true;
  isloading:boolean = true;
  // @Input('trainings') trainings :Excercise[];
  trainings:Excercise[];
  subsc:Subscription;
  constructor(private trainigService:TrainingService, private uiService:UIService) {    
    // console.log("value",value);
   }

  ngOnInit() {
    this.uiService.loadingStateChanged.subscribe(flag=>
      {
       this.excercisesSubFlag = flag;
      });

      
    console.log("trainings",this.trainings);
   this.subsc =  this.trainigService.excercisesSub.subscribe((data:Excercise[])=>{
        this.trainings = data;
        
    });
     this.fetchAgain();
  }

  fetchAgain(){
    this.trainigService.fetchAllExcercise();   
  }

  ngOnDestroy(){
    if(this.subsc)
      this.subsc.unsubscribe();
  }
 
// as person will reply on that i"ll e orking on all those things and the following will be don eon that morning  
  selectTraining(form:NgForm){
    console.log("form",form);
    this.trainigService.startExcercise(form.value.selectDrop);
    
  }

 

}
