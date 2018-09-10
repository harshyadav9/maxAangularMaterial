import { NgModule } from "@angular/core";
import {MatButtonModule , MatIconModule , MatFormFieldModule ,
     MatInputModule,MatCardModule,MatDatepickerModule,MatNativeDateModule,
     MatCheckboxModule,MatSidenavModule,MatToolbarModule,MatListModule,MatMenuModule,
     MatTabsModule,MatSelectModule,MatProgressSpinnerModule,MatDialogModule,MatTableModule,
     MatSortModule,MatPaginatorModule,MatSnackBarModule} from '@angular/material';
import {FlexLayoutModule} from '@angular/flex-layout';


const MAT_MODULES = [MatButtonModule,MatIconModule,MatFormFieldModule,MatInputModule,
    FlexLayoutModule,MatCardModule,MatDatepickerModule,MatNativeDateModule,
    MatCheckboxModule,MatSidenavModule,MatToolbarModule,MatListModule,MatMenuModule,MatTabsModule,
    MatSelectModule,MatProgressSpinnerModule,MatDialogModule,MatTableModule,MatSortModule,MatPaginatorModule,MatSnackBarModule];
@NgModule({
    imports:[MAT_MODULES],
    exports:[MAT_MODULES]
})

export class MaterialModule{}