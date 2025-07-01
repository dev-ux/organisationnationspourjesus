"use client";

import React from 'react';
import Header from '@/components/header';
import Footer from '@/components/footer';
import OffrandesHero from './hero';
import Image from 'next/image';

export default function OffrandesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <OffrandesHero />
      <main className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-blue-800 mb-8 text-center">Offrandes</h1>
        
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold text-blue-700 mb-6">Donner avec Joie</h2>
          <p className="text-gray-600 mb-8 text-lg">
            Votre générosité nous aide à continuer notre mission de service et d'évangélisation. Chaque don, quelle que soit sa taille, est précieux et contribue à l'œuvre de Dieu.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-blue-50 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-xl font-semibold text-blue-700 mb-3">Virement Bancaire</h3>
              <p className="text-gray-600 mb-2">
                <strong>IBAN:</strong> FR76 xxx xxx xxx xxx xxx xxx
              </p>
              <p className="text-gray-600">
                <strong>BIC/SWIFT:</strong> xxxxx
              </p>
              <p className="text-gray-600 mt-2">
                N'oubliez pas d'indiquer votre nom et le motif du virement dans le libellé.
              </p>
            </div>

            <div className="bg-blue-50 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-xl font-semibold text-blue-700 mb-3">Paiement en Carte</h3>
              <p className="text-gray-600">
                Payez en toute sécurité avec votre carte bancaire
              </p>
              <div className="flex items-center gap-2 mt-4">
                <img src="/images/payment-icons/visa.png" alt="Visa" className="h-6" />
                <img src="/images/payment-icons/mastercard.png" alt="Mastercard" className="h-6" />
                <img src="/images/payment-icons/maestro.png" alt="Maestro" className="h-6" />
              </div>
            </div>

            <div className="bg-blue-50 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-xl font-semibold text-blue-700 mb-3">Transferts Internationaux</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-blue-600">Western Union</h4>
                  <p className="text-gray-600">
                    <strong>Nom du destinataire:</strong> ADJE RACHELLE LYNDA
                  </p>
                  <p className="text-gray-600">
                    Adresse: 123 Rue de la Paix, Cocody, Abidjan
                  </p>
                  <p className="text-gray-600">
                    Ville: Abidjan
                  </p>
                  <p className="text-gray-600">
                    Pays: Côte d'Ivoire
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-blue-600">RIA Money Transfer</h4>
                  <p className="text-gray-600">
                    <strong>Nom du destinataire:</strong> ADJE RACHELLE LYNDA
                  </p>
                  <p className="text-gray-600">
                    Adresse: 456 Boulevard de la République, Cocody, Abidjan
                  </p>
                  <p className="text-gray-600">
                    Ville: Abidjan
                  </p>
                  <p className="text-gray-600">
                    Pays: Côte d'Ivoire
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12">
            <h2 className="text-2xl font-semibold text-blue-700 mb-6">Types d'Offrandes</h2>
            <div className="space-y-6">
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-blue-700 mb-3">Offrandes régulières</h3>
                <p className="text-gray-600 mb-2">
                  Don mensuel ou hebdomadaire pour le soutien de l'église et ses activités quotidiennes.
                </p>
                <ul className="list-disc list-inside text-gray-600">
                  <li>Support des ministères</li>
                  <li>Entretien des locaux</li>
                  <li>Programmes éducatifs</li>
                </ul>
              </div>

              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-blue-700 mb-3">Offrandes spéciales</h3>
                <p className="text-gray-600 mb-2">
                  Don pour des projets spécifiques ou des missions ponctuelles.
                </p>
                <ul className="list-disc list-inside text-gray-600">
                  <li>Projets missionnaires</li>
                  <li>Événements spéciaux</li>
                  <li>Actions caritatives</li>
                </ul>
              </div>

              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-blue-700 mb-3">Dons en nature</h3>
                <p className="text-gray-600 mb-2">
                  Don de biens ou services pour l'église et ses activités.
                </p>
                <ul className="list-disc list-inside text-gray-600">
                  <li>Matériel informatique</li>
                  <li>Équipement audiovisuel</li>
                  <li>Services professionnels</li>
                </ul>
              </div>
            </div>
          </div>

       
        </div>
      </main>

      {/* Section galerie d'images */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-2xl font-semibold text-blue-700 mb-8 text-center">Impact de vos dons</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <div className="relative aspect-square rounded-lg overflow-hidden">
            <Image
              src="/image/dons/don.jpg"
              alt="Programmes éducatifs"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">              <p className="text-white text-center">Programmes éducatifs</p>
            </div>
          </div>
          <div className="relative aspect-square rounded-lg overflow-hidden">
            <Image
              src="/image/dons/don2.jpg"
              alt="Projets missionnaires"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            </div>
          </div>
          <div className="relative aspect-square rounded-lg overflow-hidden">
            <Image
              src="/image/dons/don3.jpg"
              alt="Actions caritatives"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            </div>
          </div>
          <div className="relative aspect-square rounded-lg overflow-hidden">
            <Image
              src="/image/dons/don4.jpg"
              alt="Communauté"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            </div>
          </div>
          <div className="relative aspect-square rounded-lg overflow-hidden">
            <Image
              src="/image/dons/don5.jpg"
              alt="Cultes et activités"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            </div>
          </div>
          <div className="relative aspect-square rounded-lg overflow-hidden">
            <Image
              src="/image/dons/don6.jpg"
              alt="Rénovation"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            </div>
          </div>
        </div>
      </div>

      {/* Section vidéos Facebook */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-2xl font-semibold text-blue-700 mb-8 text-center">Vidéos récentes</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold text-blue-700 mb-4">Dernières vidéos</h3>
            <div className="space-y-4">
              <div className="relative aspect-video rounded-lg overflow-hidden">
                <iframe
                  src="https://www.facebook.com/watch?ref=search&v=3171488012983187&external_log_id=852e1c31-2e2d-4ea8-845b-aa7ef3f742d5&q=la%20grande%20caravane%20ma%20jeunesse%20pour%20jesus"
                  width="100%"
                  height="100%"
                  style={{ border: 'none', overflow: 'hidden' }}
                  scrolling="no"
                  frameBorder="0"
                  allowFullScreen={true}
                  allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                ></iframe>
              </div>
              <div className="relative aspect-video rounded-lg overflow-hidden">
                <iframe
                  src="https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2FElohimMediaProduction%2Fvideos%2F464759727726299&show_text=0&width=560"
                  width="100%"
                  height="100%"
                  style={{ border: 'none', overflow: 'hidden' }}
                  scrolling="no"
                  frameBorder="0"
                  allowFullScreen={true}
                  allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                ></iframe>
              </div>
              <div className="relative aspect-video rounded-lg overflow-hidden">
                <iframe
                  src="https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2Fpasteurhermanntano%2Fvideos%2F1526937231421182&show_text=0&width=560"
                  width="100%"
                  height="100%"
                  style={{ border: 'none', overflow: 'hidden' }}
                  scrolling="no"
                  frameBorder="0"
                  allowFullScreen={true}
                  allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                ></iframe>
              </div>
              <div className="relative aspect-video rounded-lg overflow-hidden">
                <iframe
                  src="https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2FElohimMediaProduction%2Fvideos%2F464759727726299&show_text=0&width=560"
                  width="100%"
                  height="100%"
                  style={{ border: 'none', overflow: 'hidden' }}
                  scrolling="no"
                  frameBorder="0"
                  allowFullScreen={true}
                  allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                ></iframe>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-50 to-white p-6">
              <h3 className="text-xl font-semibold text-blue-700 mb-4">À propos des vidéos</h3>
              <p className="text-gray-600 mb-6 text-lg">
                Suivez nos vidéos sur Facebook pour voir l'impact de vos dons et les activités de l'église.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                  <img src="/images/facebook-icon.png" alt="Facebook" className="h-10 w-10" />
                  <a
                    href="https://www.facebook.com/nationspourjesus"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
                  >
                    Rejoignez-nous sur Facebook
                  </a>
                </div>
                <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                  <img src="/images/youtube-icon.png" alt="YouTube" className="h-10 w-10" />
                  <a
                    href="https://www.youtube.com/channel/UCI6ZJZJZJZJZJZJZJZJZJ"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-red-600 hover:text-red-800 font-medium transition-colors"
                  >
                    Abonnez-vous à notre chaîne YouTube
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
