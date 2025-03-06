
import { Injectable } from '@angular/core';
import axios from 'axios';

interface Student {
  id: number;
  name: string;
  age: number;
  grade: string;
}

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private apiUrl = 'http://127.0.0.1:8000/students';

  constructor() { }

  async getStudents() {
    try {
      const response = await axios.get(this.apiUrl);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des étudiants:', error);
      return [];
    }
  }

  async addStudent(student: Student) {
    try {
      const response = await axios.post(this.apiUrl, student);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de l\'ajout de l\'étudiant:', error);
      return null;
    }
  }
  async deleteStudent(id: number) {
    try {
      await axios.delete(`${this.apiUrl}/${id}`);
      return id;
    } catch (error) {
      console.error("Erreur lors de la suppression de l'étudiant:", error);
      return null;
    }
  }
}  