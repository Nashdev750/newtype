import React from 'react';
import { TermsSection } from '../components/TermsSection';
import {Helmet} from 'react-helmet'
import { Header } from '../components/Header';

export function Terms() {
  return (
    <>
    <Helmet>
                    <title>Monkeytype | Terms of Service</title>
                    <link rel="canonical" href="https://monkeytype.live/terms" />
              </Helmet>
   
    <div className="min-h-screen bg-[#232323] text-white p-4 md:p-8">
        <Header/>
    <main className="max-w-[850px] mx-auto mt-4">
    <h1 className="text-3xl font-bold mb-8 text-[#e2b714]">Terms of Service</h1>
      <TermsSection title="1. Acceptance of Terms">
        <p>
          By accessing and using monkeytype.live, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use the Service.
        </p>
      </TermsSection>

      <TermsSection title="2. Description of Service">
        <p>
          Monkeytype is a minimalistic and customizable typing test platform. We provide users with tools to measure and improve their typing speed and accuracy.
        </p>
      </TermsSection>

      <TermsSection title="3. User Conduct">
        <ul className="list-disc pl-4 space-y-2">
          <li>Do not attempt to manipulate test results or rankings</li>
          <li>Do not use automated tools or scripts to interact with the Service</li>
          <li>Do not interfere with other users' experience</li>
          <li>Do not attempt to access restricted areas of the Service</li>
        </ul>
      </TermsSection>

      <TermsSection title="4. User Accounts and Login">
        <p>
        To access certain features of the Service, you may choose to log in using your Gmail account. By using this feature, you grant us limited access to your Gmail-provided data necessary for authentication purposes. We do not store, share, or process any of your personal information beyond what is required to facilitate login
        </p>
      </TermsSection>

      <TermsSection title="5. Intellectual Property">
        <p>
          The Service's content, features, and functionality are owned by monkeytype and are protected by international copyright, trademark, and other intellectual property laws.
        </p>
      </TermsSection>

      <TermsSection title="6. Modifications to Service">
        <p>
          We reserve the right to modify or discontinue the Service at any time, with or without notice. We shall not be liable to you or any third party for any modification, suspension, or discontinuance.
        </p>
      </TermsSection>

      <TermsSection title="7. Limitation of Liability">
        <p>
          The Service is provided "as is" without warranties of any kind. We are not liable for any damages arising from your use of the Service.
        </p>
      </TermsSection>

      <TermsSection title="8. Contact">
        <p>
          For questions about these Terms, please contact us through our support channels.
        </p>
      </TermsSection>
      </main>
      </div>
      </>
  );
}