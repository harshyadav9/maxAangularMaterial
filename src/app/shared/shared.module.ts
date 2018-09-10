import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MaterialModule } from "../material.module";
import { CommonModule } from "@angular/common";

@NgModule({
    imports:[FormsModule , MaterialModule , CommonModule],
    exports:[FormsModule , MaterialModule , CommonModule]
})
export class SharedModule{

}