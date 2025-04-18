import { Injectable } from '@angular/core';
import axios from 'axios';

export interface Student {
  id: number;
  name: string;
  age: number;
  grade: string;
  department: string;
  formation: string;
}

export interface NewStudent {
  name: string;
  age: number;
  grade: string;
  department: string;
  formation: string;
}

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private apiUrl = 'http://localhost:8000/students';

  constructor() { }

  async getStudents(): Promise<Student[]> {
    try {
      const response = await axios.get(this.apiUrl);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des étudiants:', error);
      return [];
    }
  }

  async addStudent(student: NewStudent): Promise<Student | null> {
    try {
      const response = await axios.post(this.apiUrl, {
        name: student.name,
        age: student.age,
        grade: student.grade,
        department: student.department,
        formation: student.formation
      });
      return response.data;
    } catch (error) {
      console.error('Erreur lors de l\'ajout de l\'étudiant:', error);
      return null;
    }
  }

  async deleteStudent(id: number): Promise<number | null> {
    try {
      await axios.delete(`${this.apiUrl}/${id}`);
      return id;
    } catch (error) {
      console.error("Erreur lors de la suppression de l'étudiant:", error);
      return null;
    }
  }
}