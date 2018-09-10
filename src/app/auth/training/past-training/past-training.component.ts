import { Component, OnInit , ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { TrainingService } from '../training.service';
import { Excercise } from '../excercise.model';
import { MatTableDataSource , MatSort , PageEvent, MatPaginator} from '@angular/material';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-past-training',
  templateUrl: './past-training.component.html',
  styleUrls: ['./past-training.component.css']
})
export class PastTrainingComponent implements OnInit, AfterViewInit , OnDestroy {
  excercises:Excercise[] = [];
  subsc:Subscription;
  pageEvent: PageEvent;
  displayedColumns:string[] = ["name","calories","duration","date","state"];
  dataSource = new MatTableDataSource<Excercise>();
  // MatSort gives access to underlying property of matsort and mat-sort-header
  @ViewChild(MatSort) sort:MatSort
  @ViewChild(MatPaginator) paginator:MatPaginator
  constructor(private trainingService:TrainingService) { }

  ngOnInit() {
    
    this.subsc = this.trainingService.completeOrCancelExc.subscribe((data:Excercise[])=>{
      this.dataSource.data = data;
      console.log("this.dataSource.data",this.dataSource.data);
    });

    

    this.trainingService.fetchCancelOrCompleteExcercise();
  };

 

  ngAfterViewInit(){    
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
  }
  

  doFilter(filterValue:string){
    this.dataSource.filter =  filterValue.trim().toLowerCase();
  }

  ngOnDestroy(){
    if(this.subsc)
      this.subsc.unsubscribe();
  }

}
