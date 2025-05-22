import {
  } from "@material-tailwind/react";
  
  
  interface FeatureCardProps {
    icon: React.ElementType;
    title: string;
    children: React.ReactNode;
  }
  
  export function FeatureCard({ icon: Icon, title, children }: FeatureCardProps) {
    return (
      <div className="grid justify-start">
          <div className="mb-4 grid h-12 w-12 place-content-center rounded-lg bg-gray-900 p-2.5 text-left text-white">
            <Icon className="h-6 w-6" />
          </div>
          <h5 className="mb-2 text-blue-gray-900">
            {title}
          </h5>
          <p className="font-normal text-gray-500">
            {children}
          </p>
      </div>
    );
  }

  export default FeatureCard;
  