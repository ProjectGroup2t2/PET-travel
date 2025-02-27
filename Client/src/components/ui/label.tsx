import React from 'react';

export const Label = ({ children }: { children: React.ReactNode }) => (
  <label className="text-sm font-medium text-gray-700">{children}</label>
);
