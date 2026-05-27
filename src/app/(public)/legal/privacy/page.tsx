import React from 'react';

export const metadata = {
  title: 'Datenschutzerklärung | Aykin',
  description: 'Informationen zum Datenschutz bei Aykin.',
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#FAF8F5] pt-24 pb-20 px-5">
      <div className="max-w-3xl mx-auto bg-white p-8 md:p-12 rounded-[32px] shadow-sm border border-[#F2E8E0]">
        <h1 className="font-calistoga text-4xl text-[#1A1A1A] mb-8">Datenschutzerklärung</h1>
        
        <div className="prose prose-stone max-w-none font-nunito text-[#1A1A1A]">
          <h2>1. Datenschutz auf einen Blick</h2>
          <h3>Allgemeine Hinweise</h3>
          <p>
            Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können.
          </p>

          <h2>2. Datenerfassung auf dieser Website</h2>
          <h3>Wer ist verantwortlich für die Datenerfassung?</h3>
          <p>
            Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen Kontaktdaten können Sie dem Impressum dieser Website entnehmen.
          </p>
          
          <h3>Wie erfassen wir Ihre Daten?</h3>
          <p>
            Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen. Hierbei kann es sich z. B. um Daten handeln, die Sie in ein Kontaktformular eingeben oder bei einer Bestellung hinterlassen.
          </p>
          <p>
            Andere Daten werden automatisch oder nach Ihrer Einwilligung beim Besuch der Website durch unsere IT-Systeme erfasst. Das sind vor allem technische Daten (z. B. Internetbrowser, Betriebssystem oder Uhrzeit des Seitenaufrufs).
          </p>

          <h2>3. Firebase Auth und Firestore</h2>
          <p>
            Wir nutzen Dienste von Google Firebase (Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland) für die Authentifizierung von Nutzern und zur Speicherung von Bestelldaten. 
            Diese Daten werden verschlüsselt auf Google-Servern gespeichert.
          </p>

          <h2>4. Ihre Rechte</h2>
          <p>
            Sie haben jederzeit das Recht, unentgeltlich Auskunft über Herkunft, Empfänger und Zweck Ihrer gespeicherten personenbezogenen Daten zu erhalten. Sie haben außerdem ein Recht, die Berichtigung oder Löschung dieser Daten zu verlangen.
          </p>

          <p className="text-sm text-[#7a5a52] mt-12 italic">
            Stand: {new Date().toLocaleDateString('de-DE', { month: 'long', year: 'numeric' })}
            <br />
            Dies ist ein Platzhalter-Text. Bitte durch juristisch geprüften Text ersetzen.
          </p>
        </div>
      </div>
    </div>
  );
}
