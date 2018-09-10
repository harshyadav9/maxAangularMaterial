import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material";

@Component({
    
    template:`<h2 mat-dialog-title>Stop Timer Dialog</h2>
    <mat-dialog-content>
      <p>The percentage completed is {{passedData.progress}} </p>
    </mat-dialog-content>
      <mat-dialog-actions>
        <button mat-raised-button  [mat-dialog-close]= "true"  color="primary">Yes</button>
        <button mat-raised-button [mat-dialog-close]= "false" color="warn">Cancel</button>
      </mat-dialog-actions>
    `
})
export class DialogComponent{
    constructor(@Inject(MAT_DIALOG_DATA) public passedData: any){

    }
    
}