import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { StudentService } from '../student-service.service';

import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
interface Student {
  id: number;
  name: string;
  age: number;
  grade: string;
} 

@Component({
  selector: 'app-list-etudiants',
  imports: [CommonModule,FormsModule,
    MatButtonModule,
    MatInputModule,
    MatListModule,
    MatFormFieldModule,
    MatIconModule
  ],
  templateUrl: './list-etudiants.component.html',
  styleUrl: './list-etudiants.component.scss'
})
export class ListEtudiantsComponent {
  students: Student[] = [];
  newStudent: Student = { id: 0, name: '', age: 0, grade: '' };

  constructor(private studentService: StudentService) { }

  ngOnInit(): void {
    this.loadStudents();
  }

  async loadStudents() {
    this.students = await this.studentService.getStudents();
  }

  async addStudent() {
    const student = await this.studentService.addStudent(this.newStudent);
    if (student) {
      this.students.push(student);
      this.newStudent = { id: 0, name: '', age: 0, grade: '' };
    }
  }

  async deleteStudent(id: number) {
    const deletedId = await this.studentService.deleteStudent(id);
    if (deletedId) {
      this.students = this.students.filter(student => student.id !== deletedId);
    }
  }
}
