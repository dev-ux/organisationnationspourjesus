"use client";

import AdminAuth from "@/components/admin/AdminAuth";
import { ReactNode } from "react";
import { useSession } from "next-auth/react";

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const { data: session } = useSession();

  // Vérifier si l'utilisateur est connecté et est admin
  if (!session) {
    return <div className="flex items-center justify-center h-screen">
      <p className="text-red-500">Accès non autorisé</p>
    </div>;
  }

  // Check if user has admin role
  if (session.user?.role !== 'admin') {
    return <div className="flex items-center justify-center h-screen">
      <p className="text-red-500">Accès réservé aux administrateurs</p>
    </div>;
  }

  return (
    <AdminAuth>
      <div className="min-h-screen bg-gray-50">
        <nav className="bg-white shadow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex">
                <div className="flex-shrink-0 flex items-center">
                  <h1 className="text-xl font-bold text-gray-900">Administration</h1>
                </div>
              </div>
              <div className="flex items-center">
                <div className="ml-3 relative">
                  <button
                    type="button"
                    className="bg-white rounded-full flex text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    onClick={() => window.location.href = "/"}
                  >
                    <span className="sr-only">Retour au site</span>
                    <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </nav>
        <main>{children}</main>
      </div>
    </AdminAuth>
  );
}
