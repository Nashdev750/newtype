import React from 'react';

type ContactSectionProps = {
  title: string;
  children: React.ReactNode;
};

export function ContactSection({ title, children }: ContactSectionProps) {
  return (
    <section className="mb-8">
      <h2 className="text-xl font-semibold mb-4 text-[#e2b714]">{title}</h2>
      <div className="space-y-4 text-[#d1d0c5]">{children}</div>
    </section>
  );
}