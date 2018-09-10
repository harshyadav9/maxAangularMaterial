import { Excercise } from "./excercise.model";
import { Subject, Subscription } from 'rxjs';
import { Injectable } from "@angular/core";
import { AngularFirestore } from "angularfire2/firestore";
import { map } from "rxjs/operators";
import { UIService } from "../../shared/ui.service";
import { MatSnackBar } from "@angular/material";


@Injectable()
export class TrainingService{
    constructor(private firebaseDb:AngularFirestore , private uiService:UIService , private snackbar:MatSnackBar){   

    }

    public excercises:Excercise[] = [];
    private currentExcercise:Excercise;    
    public excercise = new Subject<Excercise>();
    public excercisesSub = new Subject<Excercise[]>();
    public completeOrCancelExc = new Subject<Excercise[]>();
    private availableExcercise:Excercise[] = [];
    private currentId:string;
    private subs:Subscription[] = [];

    fetchAllExcercise(){
        this.uiService.loadingStateChanged.next(true);
        this.subs.push(this.firebaseDb.collection('availableExcercises').snapshotChanges().pipe(map(docData=>{
            return docData.map(docIn=>{
              return {
                id:docIn.payload.doc.id,
                ...docIn.payload.doc.data()  
              }
            });
            // throw(new Error())
        })
      ).subscribe((excercise:Excercise[])=>{
        this.uiService.loadingStateChanged.next(false);
        this.availableExcercise = excercise;
        // console.log("Asasasas",[...this.availableExcercise]);
        this.excercisesSub.next([...this.availableExcercise]);
      } , error=> {
        this.uiService.loadingStateChanged.next(false);
        this.excercisesSub.next(null);
        this.snackbar.open(error,null,{duration:2000});
      })); 
      
    }
    
   

    fetchCancelOrCompleteExcercise(){
        this.subs.push(this.firebaseDb.collection('finishedExcercises').valueChanges().subscribe((excercise:Excercise[])=>{
            console.log("excercise",excercise);
            this.completeOrCancelExc.next(excercise);
        }));
    };


    cancelSubscription(){
        if(this.subs)
            this.subs.forEach(sub=>sub.unsubscribe());
    }

   

    startExcercise(excerId){
        console.log("excerId",excerId);
        this.currentId = excerId;
        console.log("availableExcercise",this.availableExcercise);
        this.currentExcercise = this.availableExcercise.find(ex=>ex.id === excerId);
        if(this.currentExcercise !== undefined)
        {
            console.log("Asasasas",{...this.currentExcercise});
            this.excercise.next({...this.currentExcercise});            
        }
           
        
    }

    completeExcercise(){
        this.addDataToDatabase({...this.currentExcercise,
            date:new Date(),
            state:'completed'});        
        this.excercise.next(null);
    }

    private addDataToDatabase(excercise:Excercise){
        
        this.firebaseDb.collection('finishedExcercises').add(excercise);

    }

    getAllExcercies(){
        return this.excercises;
    }

    cancelExcercise(progress:number){
        let obj:Excercise = {...this.currentExcercise,
            date:new Date(),
            duration:this.currentExcercise.duration * (progress/100),
            calories:this.currentExcercise.calories * (progress/100),
            state:'cancelled'};
        this.addDataToDatabase(obj);        
        this.excercise.next(null);
        // this.firebaseDb.doc(`availableExcercises/${this.currentId}`).update({lastDate:obj.date});
    }

    getCurrentTraining(){
        return {...this.currentExcercise};
    }

    getExcercises(){
        return this.availableExcercise.slice();
    }
}