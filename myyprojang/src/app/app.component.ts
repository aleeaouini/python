import { Component } from '@angular/core';
import { ListEtudiantsComponent } from './list-etudiants/list-etudiants.component';

@Component({
  selector: 'app-root',
  imports: [ListEtudiantsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'myyprojang';
}
