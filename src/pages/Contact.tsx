import React from 'react';
import { ContactSection } from '../components/ContactSection';
// import { SocialLink } from '../components/contact/SocialLink';
import { ContactForm } from '../components/ContactForm';
import { Header } from '../components/Header';

export function Contact() {
  return (
    <>
    <div className="min-h-screen bg-[#232323] text-white p-4 md:p-8">
            <Header/>
    <main className="max-w-[850px] mx-auto mt-4">
       <h1 className="text-3xl font-bold mb-8 text-[#e2b714]">Contact Us</h1>
      
      <ContactSection title="Get in Touch">
        <p>
          Have questions, suggestions, or found a bug? We'd love to hear from you! 
          You can submit your message anonymously, or include your email if you'd like us to respond.
        </p>
        <ContactForm />
      </ContactSection>

      <ContactSection title="Social Media">
      <p>Comming soon</p>
        {/* <div className="space-y-3">
          <SocialLink
            href="https://github.com/monkeytypegame/monkeytype"
            platform="GitHub"
            username="monkeytypegame"
          />
          <SocialLink
            href="https://discord.gg/monkeytype"
            platform="Discord"
            username="monkeytype"
          />
          <SocialLink
            href="https://twitter.com/monkeytypegame"
            platform="Twitter"
            username="@monkeytypegame"
          />
        </div> */}
      </ContactSection>

      <ContactSection title="Contributing">
        <p>Comming soon</p>
        {/* <p>
          Monkeytype is open source! If you'd like to contribute to the project, 
          check out our GitHub repository and read our contribution guidelines.
        </p>
        <a 
          href="https://github.com/monkeytypegame/monkeytype/blob/master/CONTRIBUTING.md"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-2 text-[#e2b714] hover:underline"
        >
          Contribution Guidelines →
        </a> */}
      </ContactSection>
      </main>
      </div>
    </>
  );
}