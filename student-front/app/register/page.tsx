"use client";

import { useState, useEffect } from "react";

// Définir les types pour les départements et formations
interface Department {
  id: number;
  name: string;
}

interface Formation {
  id: number;
  name: string;
}

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [grade, setGrade] = useState("");
  const [department, setDepartment] = useState<Department | null>(null);
  const [formation, setFormation] = useState<Formation | null>(null);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [formations, setFormations] = useState<Formation[]>([]);
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Charger les départements et formations disponibles
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Chargement des départements
        const deptRes = await fetch("http://localhost:8000/departments");
        const deptData = await deptRes.json();
        setDepartments(deptData);

        // Chargement des formations
        const formRes = await fetch("http://localhost:8000/formations");
        const formData = await formRes.json();
        setFormations(formData);
      } catch (error) {
        console.error("Erreur lors du chargement des données :", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Vérifier si les départements et formations sont bien sélectionnés
    if (!department || !formation) {
      alert("Veuillez sélectionner un département et une formation valides.");
      return;
    }

    setIsLoading(true);
    const newStudent = { 
      name, 
      age, 
      grade, 
      department_id: department.id,
      formation_ids: [formation.id],
      password,
    };

    try {
      const response = await fetch("http://localhost:8000/students", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newStudent),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Étudiant ajouté avec succès");
        // Réinitialiser le formulaire
        setName("");
        setAge(0);
        setGrade("");
        setDepartment(null);
        setFormation(null);
        setPassword("");
      } else {
        const errorMessage = JSON.stringify(data, null, 2);
        alert(`Erreur lors de l'ajout de l'étudiant: ${errorMessage}`);
      }
    } catch (error) {
      console.error("Erreur lors de l'ajout de l'étudiant", error);
      alert("Une erreur est survenue lors de l'ajout de l'étudiant.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="bg-indigo-600 px-6 py-4">
          <h1 className="text-2xl font-bold text-white text-center">Inscription Étudiant</h1>
        </div>
        
        <div className="px-6 py-8">
          {isLoading && (
            <div className="text-center mb-4">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-indigo-500 border-t-transparent"></div>
              <p className="mt-2 text-gray-600">Chargement en cours...</p>
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Nom complet
              </label>
              <input
                id="name"
                type="text"
                placeholder="Entrez votre nom"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            
            <div>
              <label htmlFor="age" className="block text-sm font-medium text-gray-700">
                Âge
              </label>
              <input
                id="age"
                type="number"
                placeholder="Votre âge"
                required
                min="16"
                value={age || ""}
                onChange={(e) => setAge(Number(e.target.value))}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Mot de passe
              </label>
              <input
                id="password"
                type="password"
                placeholder="Créez un mot de passe sécurisé"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            
            <div>
              <label htmlFor="grade" className="block text-sm font-medium text-gray-700">
                Niveau d'études
              </label>
              <input
                id="grade"
                type="text"
                placeholder="Ex: Licence, Master..."
                required
                value={grade}
                onChange={(e) => setGrade(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            
            <div>
              <label htmlFor="department" className="block text-sm font-medium text-gray-700">
                Département
              </label>
              <select
                id="department"
                value={department ? department.name : ""}
                onChange={(e) => {
                  const selectedDept = departments.find(dept => dept.name === e.target.value);
                  setDepartment(selectedDept || null);
                }}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="">Sélectionner un département</option>
                {departments.length > 0 ? (
                  departments.map((dept) => (
                    <option key={dept.id} value={dept.name}>
                      {dept.name}
                    </option>
                  ))
                ) : (
                  <option disabled>Chargement des départements...</option>
                )}
              </select>
            </div>
            
            <div>
              <label htmlFor="formation" className="block text-sm font-medium text-gray-700">
                Formation
              </label>
              <select
                id="formation"
                value={formation ? formation.name : ""}
                onChange={(e) => {
                  const selectedForm = formations.find(form => form.name === e.target.value);
                  setFormation(selectedForm || null);
                }}
                required
                disabled={formations.length === 0}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-100 disabled:text-gray-500"
              >
                <option value="">Sélectionner une formation</option>
                {formations.length > 0 ? (
                  formations.map((form) => (
                    <option key={form.id} value={form.name}>
                      {form.name}
                    </option>
                  ))
                ) : (
                  <option disabled>Chargement des formations...</option>
                )}
              </select>
            </div>
            
            <div className="pt-4">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-300"
              >
                {isLoading ? 'Traitement en cours...' : 'S\'inscrire'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;