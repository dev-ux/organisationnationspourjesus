"use client";
import AdminLayout from "./layout";
import { useSession } from "next-auth/react";

export default function AdminDashboard() {
  const { data: session } = useSession();

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="border-4 border-dashed border-gray-200 rounded-lg h-96">
            <h2 className="text-2xl font-bold mb-8">Bienvenue dans l'administration</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <AdminSection
                title="Mot du Pasteur"
                description="Gérez le message du Pasteur"
                href="/admin/pastor-message"
              />
              <AdminSection
                title="Actualités"
                description="Gérez les actualités du site"
                href="/admin/news"
              />
              <AdminSection
                title="Départements"
                description="Gérez les différents départements"
                href="/admin/departments"
              />
              <AdminSection
                title="Galerie Photos"
                description="Ajoutez et gérez les photos de la galerie"
                href="/addpicture"
              />
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

interface AdminSectionProps {
  title: string;
  description: string;
  href: string;
}

function AdminSection({ title, description, href }: AdminSectionProps) {
  return (
    <div className="bg-white overflow-hidden shadow rounded-lg">
      <div className="p-5">
        <div className="flex items-center">
          <div className="ml-5">
            <div className="text-sm font-medium text-indigo-600 truncate">
              {title}
            </div>
            <p className="mt-1 text-sm text-gray-500 truncate">
              {description}
            </p>
            <div className="mt-4">
              <a
                href={href}
                className="flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-500"
              >
                Accéder à la section
                <svg className="ml-2 h-5 w-5 text-indigo-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
