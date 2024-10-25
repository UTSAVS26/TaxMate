// components/AboutSection.js
import React from "react";

export function AboutSection() {
  return (
    <section className="bg-background text-foreground py-12 px-6 md:px-12 lg:px-24">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 flex items-center">
          About Us
        </h2>
        <p className="text-lg text-muted-foreground mb-4">
          Welcome to TaxMate, your intelligent companion for navigating the complex world of taxation.
        </p>
      </div>
    </section>
  );
}
