import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';  
import { RouterModule } from '@angular/router';
import { ListEtudiantsComponent } from './list-etudiants/list-etudiants.component';  
import { AppComponent } from './app.component'; 
import { FormsModule } from '@angular/forms';

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
  ],
  providers: [],
  bootstrap: [AppComponent]  
})
export class AppModule { }
