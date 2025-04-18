"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface Student {
  id: number;
  name: string;
  age: number;
  grade: string;
  department_id: number;
  formation_ids: number[];
}

interface Department {
  id: number;
  name: string;
}

interface Formation {
  id: number;
  name: string;
}

const ProfilePage = () => {
  const [student, setStudent] = useState<Student | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [department, setDepartment] = useState<Department | null>(null);
  const [formations, setFormations] = useState<Formation[]>([]);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const studentId = localStorage.getItem("studentId");
      const studentName = localStorage.getItem("studentName");

      if (!studentId || !studentName) {
        router.push("/login");
        return;
      }

      try {
        setLoading(true);
        // Récupérer les informations détaillées de l'étudiant
        const response = await fetch(`http://localhost:8000/students/${studentId}`);
        
        if (!response.ok) {
          throw new Error("Impossible de récupérer les informations de l'étudiant");
        }
        
        const studentData = await response.json();
        setStudent(studentData);

        // Récupérer les départements pour trouver celui de l'étudiant
        const deptResponse = await fetch("http://localhost:8000/departments");
        const departments: Department[] = await deptResponse.json();
        const studentDept = departments.find(dept => dept.id === studentData.department_id);
        if (studentDept) {
          setDepartment(studentDept);
        }

        // Récupérer les formations pour trouver celles de l'étudiant
        const formResponse = await fetch("http://localhost:8000/formations");
        const allFormations: Formation[] = await formResponse.json();
        const studentFormations = allFormations.filter(form => 
          studentData.formation_ids.includes(form.id)
        );
        setFormations(studentFormations);

      } catch (error) {
        console.error("Erreur:", error);
        setError(error instanceof Error ? error.message : "Une erreur est survenue");
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("studentId");
    localStorage.removeItem("studentName");
    router.push("/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
        <p className="mt-4 text-gray-600">Chargement du profil...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center">
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md">
          <p>{error}</p>
        </div>
        <button
          onClick={() => router.push("/login")}
          className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
        >
          Retour à la connexion
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="bg-indigo-600 px-6 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-white">Profil Étudiant</h1>
            <button
              onClick={handleLogout}
              className="bg-white text-indigo-600 px-4 py-2 rounded-md hover:bg-gray-100"
            >
              Déconnexion
            </button>
          </div>
        </div>

        {student && (
          <div className="p-6">
            <div className="mb-8 flex items-center space-x-4">
              <div className="bg-indigo-100 rounded-full p-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zm-4 7a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800">{student.name}</h2>
                <p className="text-gray-600">ID: {student.id}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-gray-700 mb-2">Informations personnelles</h3>
                <div className="space-y-2">
                  <p className="flex justify-between">
                    <span className="text-gray-500">Âge:</span>
                    <span className="font-medium">{student.age} ans</span>
                  </p>
                  <p className="flex justify-between">
                    <span className="text-gray-500">Niveau d'études:</span>
                    <span className="font-medium">{student.grade}</span>
                  </p>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-gray-700 mb-2">Département et Formation</h3>
                <div className="space-y-2">
                  <p className="flex justify-between">
                    <span className="text-gray-500">Département:</span>
                    <span className="font-medium">{department?.name || "Non spécifié"}</span>
                  </p>
                  <div>
                    <p className="text-gray-500 mb-1">Formation(s):</p>
                    {formations.length > 0 ? (
                      <ul className="list-disc list-inside pl-2">
                        {formations.map(formation => (
                          <li key={formation.id} className="font-medium">{formation.name}</li>
                        ))}
                      </ul>
                    ) : (
                      <p className="font-medium">Aucune formation associée</p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-200">
              <Link href="/"
                className="inline-flex items-center text-indigo-600 hover:text-indigo-500"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Retour à l'accueil
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;