import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';  
import { RouterModule } from '@angular/router';
import { ListEtudiantsComponent } from './list-etudiants/list-etudiants.component';  
import { AppComponent } from './app.component'; 
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [
    AppComponent,  
    ListEtudiantsComponent, 
  ],
  imports: [
    BrowserModule,
    CommonModule,  
    RouterModule.forRoot([]),  
    FormsModule,
    MatButtonModule,
    MatInputModule,
    MatListModule,
    MatFormFieldModule,
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]  
})
export class AppModule { }
