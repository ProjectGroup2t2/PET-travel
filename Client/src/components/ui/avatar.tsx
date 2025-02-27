import React from 'react';

export const Avatar = ({ className, children }: { className?: string; children: React.ReactNode }) => (
  <div className={`flex items-center justify-center rounded-full bg-gray-200 ${className}`}>
    {children}
  </div>
);

export const AvatarImage = ({ src, alt }: { src: string; alt: string }) => (
  <img src={src} alt={alt} className="rounded-full w-full h-full object-cover" />
);

export const AvatarFallback = ({ children }: { children: React.ReactNode }) => (
  <span className="text-gray-500 text-xl">{children}</span>
);
