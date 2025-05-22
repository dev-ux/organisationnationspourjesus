import React from "react";



interface InfoCardProps {
  title: string;
  children: React.ReactNode;
}


export function InfoCard({ title, children }: InfoCardProps) {
  return (
    <div className="grid px-0">
      <h2 className="mb-2 text-blue-gray-900">
        {title}
      </h2>
      <p className="font-normal">{children}</p>
    </div>
  );
}

export default InfoCard;