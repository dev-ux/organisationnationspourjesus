import React from "react";


interface TestimonialCardProps {
  img: string;
  feedback: string;
  client: string;
  title: string;
}

export function TestimonialCard({
  img,
  feedback,
  client,
  title,
}: TestimonialCardProps) {
  return (
    <div className="items-center text-center">
      <div className="mb-3">
        <img
          src={img}
          alt={client}
          className="w-24 h-24 rounded-full mb-3"
        />
      </div>
      <h6 className="text-blue-gray-900">
        {client}
      </h6>
      <p className="mb-3 font-medium text-gray-700">
        {title}
      </p>
      <p className="mb-5 font-normal text-gray-500">
        &quot;{feedback}&quot;
      </p>
    </div>
  );
}

export default TestimonialCard;