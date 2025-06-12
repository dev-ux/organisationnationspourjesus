"use client";

import Image from "next/image";

const PastorMessage = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Image section */}
            <div className="relative h-[400px] md:h-[500px]">
              <Image
                src="/image/past.jpg"
                alt="Pasteur Herman Tano"
                fill
                className="object-cover rounded-lg"
                priority
              />
            </div>

            {/* Content section */}
            <div className="space-y-6">
              <h2 className="text-4xl font-bold text-gray-900">
                Un Message de notre Pasteur
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed">
                "Chers frères et sœurs, que la paix de Dieu soit avec vous. 
                Nous sommes ici pour vous accueillir et vous accompagner dans 
                votre parcours spirituel. Notre mission est de vous aider à 
                grandir dans votre foi et à vivre selon les enseignements 
                de notre Seigneur Jésus-Christ."
              </p>
              <p className="text-xl text-gray-600 leading-relaxed">
                "Rejoignez-nous pour partager des moments de prière, 
                d'enseignement biblique et de communion fraternelle. 
                Nous sommes là pour vous soutenir et vous guider dans votre 
                cheminement spirituel."
              </p>
              <div className="pt-8">
                <h3 className="text-2xl font-bold text-gray-900">Pasteur Herman Tano</h3>
                <p className="text-gray-600">Pasteur Principal</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PastorMessage;
