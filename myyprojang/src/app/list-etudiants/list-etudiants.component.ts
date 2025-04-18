import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { StudentService, Student, NewStudent } from '../student-service.service';

@Component({
  selector: 'app-list-etudiants',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './list-etudiants.component.html',
  styleUrls: ['./list-etudiants.component.scss']
})
export class ListEtudiantsComponent implements OnInit {
  students: Student[] = [];
  newStudent: NewStudent = {
    name: '',
    age: 0,
    grade: '',
    department: '',
    formation: ''
  };
  formations: string[] = [];
  departments: string[] = [];
  isLoading: boolean = false;
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private studentService: StudentService) { }

  ngOnInit(): void {
    this.loadStudents();
  }

  async loadStudents() {
    this.isLoading = true;
    try {
      this.students = await this.studentService.getStudents();
      this.updateFormationsAndDepartments();
      this.errorMessage = '';
    } catch (error) {
      this.errorMessage = 'Erreur lors du chargement des étudiants.';
      console.error(error);
    } finally {
      this.isLoading = false;
    }
  }

  updateFormationsAndDepartments() {
    // Extraire les formations uniques
    const uniqueFormations = new Set(this.students.map(student => student.formation));
    this.formations = Array.from(uniqueFormations).filter(f => f !== 'Non défini' && f !== '');
    
    // Extraire les départements uniques
    const uniqueDepartments = new Set(this.students.map(student => student.department));
    this.departments = Array.from(uniqueDepartments).filter(d => d !== 'Non défini' && d !== '');
  }

  async addStudent() {
    if (!this.validateForm()) {
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';
    
    try {
      const student = await this.studentService.addStudent(this.newStudent);
      if (student) {
        this.students.push(student);
        this.updateFormationsAndDepartments();
        this.resetForm();
        this.successMessage = 'Étudiant ajouté avec succès!';
        setTimeout(() => this.successMessage = '', 3000);
      }
    } catch (error) {
      this.errorMessage = "Erreur lors de l'ajout de l'étudiant.";
      console.error(error);
    } finally {
      this.isLoading = false;
    }
  }

  validateForm(): boolean {
    if (!this.newStudent.name) {
      this.errorMessage = 'Le nom est obligatoire.';
      return false;
    }
    
    if (!this.newStudent.age || this.newStudent.age < 16) {
      this.errorMessage = "L'âge doit être d'au moins 16 ans.";
      return false;
    }
    
    if (!this.newStudent.grade) {
      this.errorMessage = 'Le niveau d\'études est obligatoire.';
      return false;
    }
    
    if (!this.newStudent.department) {
      this.errorMessage = 'Le département est obligatoire.';
      return false;
    }
    
    if (!this.newStudent.formation) {
      this.errorMessage = 'La formation est obligatoire.';
      return false;
    }
    
    return true;
  }

  resetForm() {
    this.newStudent = {
      name: '',
      age: 0,
      grade: '',
      department: '',
      formation: ''
    };
  }

  async deleteStudent(id: number) {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cet étudiant?')) {
      return;
    }
    
    this.isLoading = true;
    
    try {
      const deletedId = await this.studentService.deleteStudent(id);
      if (deletedId) {
        this.students = this.students.filter(student => student.id !== deletedId);
        this.updateFormationsAndDepartments();
        this.successMessage = 'Étudiant supprimé avec succès!';
        setTimeout(() => this.successMessage = '', 3000);
      }
    } catch (error) {
      this.errorMessage = "Erreur lors de la suppression de l'étudiant.";
      console.error(error);
    } finally {
      this.isLoading = false;
    }
  }

  getStudentsByFormation(formation: string): number {
    return this.students.filter(student => student.formation === formation).length;
  }

  getStudentsByDepartment(department: string): number {
    return this.students.filter(student => student.department === department).length;
  }
}