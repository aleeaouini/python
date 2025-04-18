from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Liste d'étudiants (exemples)
students = [
<<<<<<< HEAD
    {"id": 1, "name": "John", "age": 21, "grade": "A"},
    {"id": 2, "name": "Jane", "age": 22, "grade": "B"},
    {"id": 3, "name": "Jack", "age": 23, "grade": "C"}
=======
    {"id": 1, "name": "alee", "age": 20, "grade": "2"},
    
>>>>>>> f68f97395d2444d8cb42f016ab5a030edf70e459
]

# Ajouter CORS middleware pour permettre l'accès depuis le frontend Angular
app.add_middleware(
    CORSMiddleware,
    
    allow_origins=["http://localhost:4200"],  # L'URL de ton frontend Angular
    allow_credentials=True,
    allow_methods=["*"],  # Permet toutes les méthodes HTTP
    allow_headers=["*"],  # Permet tous les en-têtes
)

@app.get("/students")
def get_students():
    return students

@app.get("/students/{student_id}")
def get_student(student_id: int):
    for student in students:
        
        if student["id"] == student_id:
            return student
    return {"error": "Student not found"}

@app.post("/students")
def add_student(student: dict):
    student["id"] = len(students) + 1  # Assigner un ID unique
    students.append(student)
    return student

@app.delete("/students/{student_id}")
def delete_student(student_id: int):
    global students
    students = [student for student in students if student["id"] != student_id]
    return {"message": f"Student with id {student_id} deleted"}
