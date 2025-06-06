"use client";
import React from "react";

const PageContainer: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <div className="max-w-screen-md mx-auto mt-16 px-4 py-12 rounded-2xl flex flex-col">
    {children}
  </div>
);

export default PageContainer;
