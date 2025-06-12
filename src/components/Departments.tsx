'use client';

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@material-tailwind/react";
import { motion } from "framer-motion";
import { useSession, SessionStatus } from "next-auth/react";
import { ChangeEvent } from "react";
import ImageUpload from "./ImageUpload";

interface Department {
  title: string;
  description: string;
  image: string;
  icon: string;
}

interface InputProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

interface ButtonProps {
  children: string;
  color: string;
  onClick: () => void;
  className?: string;
}

const InputComponent = ({ label, name, value, onChange }: InputProps) => (
  <div className="mb-4">
    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <input
      type="text"
      name={name}
      value={value}
      onChange={onChange}
      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
    />
  </div>
);

const ButtonComponent = ({ children, color, onClick, className = "" }: ButtonProps) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 rounded-md text-white ${
      color === "blue" ? "bg-blue-600 hover:bg-blue-700" : "bg-green-600 hover:bg-green-700"
    } ${className}`}
  >
    {children}
  </button>
);

const DepartmentCard = ({ department }: { department: Department }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="relative overflow-hidden rounded-2xl bg-white p-8 sm:p-10"
  >
    <div className="absolute inset-0 -m-1 bg-gradient-to-r from-gray-900/50 to-gray-800/50 rounded-2xl blur-3xl" />
    <div className="relative">
      <div className="flex items-center gap-x-4 mb-8">
        <div className="flex-none rounded-lg bg-indigo-50 p-3">
          <svg className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold leading-8 tracking-tight text-gray-900">
          {department.title}
        </h3>
      </div>
      <p className="text-sm leading-6 text-gray-600">
        {department.description}
      </p>
      <div className="mt-6">
        <Image
          src={department.image}
          alt={department.title}
          width={300}
          height={200}
          className="object-cover rounded-lg"
          priority
        />
      </div>
    </div>
  </motion.div>
);

export default function Departments() {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [newDepartment, setNewDepartment] = useState<Department>({
    title: "",
    description: "",
    image: "",
    icon: "department"
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewDepartment(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const { data: session } = useSession();

  useEffect(() => {
    // Rediriger vers la page de connexion si l'utilisateur n'est pas connecté
    if (!session) {
      window.location.href = '/login';
      return;
    }

    fetchDepartments();
  }, [session]);

  // Afficher un spinner pendant le chargement
  if (!session) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  const fetchDepartments = async () => {
    try {
      const response = await fetch('/api/departments');
      const data = await response.json();
      setDepartments(data.departments);
    } catch (error) {
      console.error('Error fetching departments:', error);
    }
  };

  // Vérifier si l'utilisateur est admin
  const isAdmin = session?.user?.email === "admin@example.com"; // Remplacer avec l'email de l'admin réel

  // Vérifier si l'utilisateur est connecté
  const isLoggedIn = !!session;

  return (
    <div className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Nos Départements
          </h2>
          <p className="mt-2 text-lg leading-8 text-gray-600">
            Découvrez les différents services qui font fonctionner notre église
          </p>
        </div>

        {/* Admin Panel pour les utilisateurs connectés */}
        {isLoggedIn && (
          <div className="mt-12">
            <ButtonComponent
              color="blue"
              onClick={() => setShowAdminPanel(!showAdminPanel)}
              className="mb-4"
            >
              {showAdminPanel ? "Masquer" : "Ajouter un département"}
            </ButtonComponent>

            {showAdminPanel && (
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="space-y-4">
                  <InputComponent
                    label="Titre"
                    name="title"
                    value={newDepartment.title}
                    onChange={handleInputChange}
                  />
                  <InputComponent
                    label="Description"
                    name="description"
                    value={newDepartment.description}
                    onChange={handleInputChange}
                  />
                  <ImageUpload
                    onImageUpload={(url) => setNewDepartment(prev => ({ ...prev, image: url }))}
                  />
                  <ButtonComponent
                    color="green"
                    onClick={async () => {
                      try {
                        console.log('Sending department data:', newDepartment);
                        const response = await fetch('/api/departments', {
                          method: 'POST',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify(newDepartment),
                        });
                        
                        if (!response.ok) {
                          const errorData = await response.json();
                          console.error('API Error:', errorData);
                          alert(errorData.error || 'Une erreur est survenue lors de l\'ajout du département');
                          return;
                        }

                        await fetchDepartments();
                        setNewDepartment({ title: '', description: '', image: '', icon: 'department' });
                        setShowAdminPanel(false);
                      } catch (error) {
                        console.error('Error adding department:', error);
                        alert('Une erreur est survenue lors de l\'ajout du département');
                      }
                    }}
                  >
                    Ajouter
                  </ButtonComponent>
                </div>
              </div>
            )}
          </div>
        )}

        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
              {departments.map((department) => (
                <DepartmentCard key={department.title} department={department} />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
