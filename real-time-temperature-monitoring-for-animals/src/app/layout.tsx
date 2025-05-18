import React, { ReactNode } from "react";
import "./globals.css"; // Assuming you have global styles in this file

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <html lang="en">
      <head>
        <title>Animal Temperature Dashboard</title>
      </head>
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
}
