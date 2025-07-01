"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Header from '@/components/header';
import Footer from '@/components/footer';
import SamediMiraclesHero from './hero';
import { createPortal } from 'react-dom';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '400px'
};

const center = {
  lat: 5.348578,  // Exact latitude for Camp Josué
  lng: -4.020156   // Exact longitude for Camp Josué
};

const markerStyles = {
  color: '#007bff',
  fontSize: '24px',
  fontWeight: 'bold'
};

const mapStyles = {
  width: '100%',
  height: '100%'
};

export default function MontagneDeSionPage() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = [
    { src: '/image/MS/MS1.jpg', alt: 'Session de prière' },
    { src: '/image/MS/MS2.jpg', alt: 'Temps de prière' },
    { src: '/image/MS/MS3.jpg', alt: 'Expérience spirituelle' },
    { src: '/image/MS/MS4.jpg', alt: 'Expérience spirituelle' },
    { src: '/image/MS/MS5.jpg', alt: 'Temps de prière' },
    { src: '/image/MS/MS6.jpg', alt: 'Session de prière' },
    { src: '/image/MS/MS7.jpg', alt: 'Expérience spirituelle' },
    { src: '/image/MS/MS8.jpg', alt: 'Temps de prière' },
    { src: '/image/MS/MS9.jpg', alt: 'Session de prière' },
    { src: '/image/MS/MS10.jpg', alt: 'Session de prière' },
    { src: '/image/MS/MS11.jpg', alt: 'Session de prière' },
    { src: '/image/MS/MS12.jpg', alt: 'Session de prière' },  
    { src: '/image/MS/MS13.jpg', alt: 'Session de prière' },
    { src: '/image/MS/MS14.jpg', alt: 'Session de prière' },
    { src: '/image/MS/MS15.jpg', alt: 'Session de prière' },
    { src: '/image/MS/MS16.jpg', alt: 'Session de prière' },
    { src: '/image/MS/MS17.jpg', alt: 'Session de prière' },
    { src: '/image/MS/MS18.jpg', alt: 'Session de prière' },
    { src: '/image/MS/MS19.jpg', alt: 'Session de prière' },
    { src: '/image/MS/MS20.jpg', alt: 'Session de prière' },
  ];

  const handleImageClick = (index: number) => {
    setSelectedImage(images[index].src);
    setCurrentIndex(index);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
    setSelectedImage(images[currentIndex].src);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    setSelectedImage(images[currentIndex].src);
  };

  return (
    <div className="min-h-screen bg-white">
      <SamediMiraclesHero />
      <main className="container mx-auto px-4 py-16">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold mb-4 text-blue-600">Montagne de Sion</h1>
          <p className="text-xl text-gray-600">
            MONTAGNE DE SION : Ma Montagne de Prières, de Prodiges et de Miracles…🔥✨
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-lg shadow-lg p-8 mb-12"
        >
          <h2 className="text-3xl font-semibold mb-8">Programme Annuel</h2>
          <p className="text-gray-600 mb-8">
            La Montagne de Sion est un programme spirituel intensif qui se déroule sur les trois premiers mois de chaque année (janvier à mars). 
            Chaque session est adaptée au thème général du programme et offre une expérience spirituelle unique.
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div 
              whileInView={{ x: [0, -20, 0] }}
              transition={{ duration: 1 }}
              className="relative h-[300px] rounded-lg overflow-hidden"
            >
              <Image
                src="/image/MS/MS10.jpg"
                alt="Expérience spirituelle"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                <h3 className="text-white text-2xl font-semibold">Expérience Spirituelle</h3>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              <h3 className="text-2xl font-semibold">Structure du Programme</h3>
              <div className="space-y-4">
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  className="bg-blue-50 p-4 rounded-lg"
                >
                  <h4 className="font-semibold">Période</h4>
                  <p className="text-gray-600">Janvier - Mars</p>
                  <p className="mt-2">Sessions intensives sur 3 mois</p>
                </motion.div>
               
              </div>
            </motion.div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-lg shadow-lg p-8 mb-12"
        >
          <h2 className="text-3xl font-semibold mb-8">Structure de chaque Session</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div 
              whileInView={{ x: [0, 20, 0] }}
              transition={{ duration: 1 }}
              className="relative h-[300px] rounded-lg overflow-hidden"
            >
              <Image
                src="/image/MS/MS3.jpg"
                alt="Temps de prière"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              <h3 className="text-2xl font-semibold">Programme Quotidien</h3>
              <div className="space-y-4">
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  className="bg-blue-50 p-4 rounded-lg"
                >
                  <h4 className="font-semibold">19h00 - 21h00</h4>
                  <p className="text-gray-600">Tous les vendredis</p>
                </motion.div>
               
              </div>
            </motion.div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-lg shadow-lg p-8 mb-12"
        >
          <h2 className="text-3xl font-semibold mb-8">Objectifs du Programme</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div 
              whileInView={{ x: [0, -20, 0] }}
              transition={{ duration: 1 }}
              className="space-y-4"
            >
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">Renforcement de la foi</h3>
                <p className="text-gray-600">
                  Approfondissez votre relation avec Dieu et fortifiez votre foi.
                </p>
              </div>
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">Renouveau spirituel</h3>
                <p className="text-gray-600">
                  Expérimentez un renouveau spirituel profond et transformateur.
                </p>
              </div>
            </motion.div>

            <motion.div 
              whileInView={{ x: [0, 20, 0] }}
              transition={{ duration: 1 }}
              className="relative h-[300px] rounded-lg overflow-hidden"
            >
              <Image
                src="/image/MS/MS2.jpg"
                alt="Renouveau spirituel"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
              </div>
            </motion.div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-lg shadow-lg p-8"
        >
          <h2 className="text-3xl font-semibold mb-8">Comment Participer</h2>
          <div className="space-y-6">
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="bg-blue-50 p-6 rounded-lg"
            >
              <h3 className="font-semibold mb-4">Contactez-nous</h3>
              <p className="text-gray-600">
                Pour participer à la Montagne de Sion, veuillez nous contacter :
                <br /><br />
                <strong>Adresse :</strong> Cocody 2 Plateaux, Aghien<br />
                Boulevard Latrille (près de la pharmacie St-Gabrielle)<br /><br />
                <strong>Contact :</strong> +225 XX XX XX XX
              </p>
            </motion.div>
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="bg-blue-50 p-6 rounded-lg"
            >
              <h3 className="font-semibold mb-4">Localisation</h3>
              <p className="text-gray-600 mb-4">
                La Montagne de Sion se tient à Abidjan, Cocody 2 Plateaux, Aghien<br />
                Sur le boulevard Latrille, non loin de la pharmacie St-Gabrielle, Camp josuée
              </p>
              <div className="w-full h-[400px] rounded-lg overflow-hidden">
                <LoadScript
                  googleMapsApiKey="AIzaSyDWZJIj6SxGdRGcP0U1vuk786-Lqrcus6I"
                  libraries={['places']}
                >
                  <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={center}
                    zoom={17}
                      >
                    <Marker 
  position={center}
  title="Montagne de Sion"
  label={{
    text: 'MS',
    color: '#007bff',
    fontSize: '24px',
    fontWeight: 'bold'
  }}
  icon={{
    path: 'M12 2L10.91 8.09L16 12l-5.09 3.91L12 22l4-6-4-6z',
    fillColor: '#007bff',
    fillOpacity: 1,
    scale: 1.5,
    strokeColor: '#000',
    strokeWeight: 0.5
  }}
/>
                  </GoogleMap>
                </LoadScript>
              </div>
            </motion.div>
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="bg-blue-50 p-6 rounded-lg"
            >
              <h3 className="font-semibold mb-4">Préparation spirituelle</h3>
              <p className="text-gray-600">
                Préparation spirituelle recommandée avant la première session
              </p>
            </motion.div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-lg shadow-lg p-8 mb-12"
        >
          <h2 className="text-3xl font-semibold mb-8">Galerie Photos</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {images.map((image, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                onClick={() => handleImageClick(index)}
                className="relative group rounded-lg overflow-hidden cursor-pointer"
              >
                <Image
                  src={image.src}
                  alt=""
                  width={400}
                  height={300}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {selectedImage && (
          createPortal(
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center"
              onClick={closeModal}
            >
              <motion.div 
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.95 }}
                className="relative max-w-4xl max-h-[90vh] m-4"
                onClick={(e) => e.stopPropagation()}
              >
                <button 
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/50 p-2 rounded-full hover:bg-white/70"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button 
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/50 p-2 rounded-full hover:bg-white/70"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
                <button 
                  onClick={closeModal}
                  className="absolute top-4 right-4 bg-white/50 p-2 rounded-full hover:bg-white/70"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                <Image
                  src={selectedImage}
                  alt=""
                  width={1920}
                  height={1080}
                  className="object-contain"
                  priority
                />
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/50 p-2 rounded-full text-white font-semibold">
                  {currentIndex + 1} / {images.length}
                </div>
              </motion.div>
            </motion.div>,
            document.body
          )
        )}

      </main>
    </div>
  );
}
