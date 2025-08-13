'use client'
import React from 'react';
import { Globe, Phone, Mail, MapPin, Download, Facebook } from 'lucide-react';

const ContactCard = () => {
  // Hardcoded contact data
  const contactData = {
    name: "Ambassadors Club",
    organization: "A non-partisan, shared platform for resident and non-resident Ambassadors, Heads of Mission, and Diplomats accredited to Nepal to foster diplomacy and cooperation.",
    title: "Company",
    phone: "+977 14500300",
    email: "info@ambassadorsclubnepal.com",
    address: "Bishalnagar Bishalbasti Gate-B House 269, Kathmandu, 44600, Nepal",
    website: "https://ambassadorsclubnepal.com",
    facebook: "https://www.facebook.com/ambassadorsclub.nepal",
    image: '/ambclub.webp'
  };

  // Function to generate VCF content
  const generateVcfContent = () => {
    return `BEGIN:VCARD
VERSION:3.0
N:Club;Ambassadors
FN:Ambassadors Club
ORG:A non-partisan, shared platform for resident and non-resident Ambassadors, Heads of Mission, and Diplomats accredited to Nepal to foster diplomacy and cooperation.
TITLE:Company 
ADR:;;Bishalnagar Bishalbasti Gate-B House 269;Kathmanu;;44600;Nepal
TEL;TYPE=CELL,VOICE:+977 14500300
EMAIL:info@ambassadorsclubnepal.com
URL:https://ambassadorsclubnepal.com
X-SOCIALPROFILE;TYPE=facebook:https://www.facebook.com/ambassadorsclub.nepal
PHOTO;ENCODING=b;TYPE=WEBP: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
END:VCARD
`;
  };

  // Function to download VCF file
  const downloadVcf = () => {
    const vcfContent = generateVcfContent();
    const blob = new Blob([vcfContent], { type: 'text/vcard' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = 'ambassadors_club.vcf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black p-4">
      <div className="bg-black rounded-xl shadow-lg max-w-md w-full overflow-hidden border border-amber-700">
        {/* Header with black and gold gradient */}
        <div className="bg-gradient-to-r from-black to-amber-900 p-6 text-amber-400">
          <div className="flex items-center gap-4">
            <div className="flex-shrink-0">
              <img 
                src={contactData.image}
                alt="Ambassadors Club Logo" 
                className="rounded-full w-24 h-24 border-2 border-amber-500 object-cover shadow-md"
              />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-amber-400">Ambassadors Club</h1>
              <p className="text-amber-300 text-xs">{contactData.organization}</p>
            </div>
          </div>
        </div>
        
        {/* Contact Details */}
        <div className="p-6 bg-black text-gray-200">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Phone size={18} className="text-amber-400 flex-shrink-0" />
              <span>{contactData.phone}</span>
            </div>
            
            <div className="flex items-center gap-3">
              <Mail size={18} className="text-amber-400 flex-shrink-0" />
              <a href={`mailto:${contactData.email}`} className="text-amber-400 hover:text-amber-300 hover:underline">
                {contactData.email}
              </a>
            </div>
            
            <div className="flex items-start gap-3">
              <MapPin size={18} className="text-amber-400 flex-shrink-0 mt-1" />
              <span>{contactData.address}</span>
            </div>
            
            <div className="flex items-center gap-3">
              <Globe size={18} className="text-amber-400 flex-shrink-0" />
              <a href={contactData.website} target="_blank" rel="noopener noreferrer" className="text-amber-400 hover:text-amber-300 hover:underline">
                {contactData.website.replace('https://', '')}
              </a>
            </div>
            
            <div className="flex items-center gap-3">
              <Facebook size={18} className="text-amber-400 flex-shrink-0" />
              <a href={contactData.facebook} target="_blank" rel="noopener noreferrer" className="text-amber-400 hover:text-amber-300 hover:underline">
                Facebook
              </a>
            </div>
          </div>
          
          {/* Download Button */}
          <div className="mt-6">
            <button 
              onClick={downloadVcf}
              className="w-full bg-gradient-to-r from-amber-600 to-amber-500 text-black py-3 px-4 rounded-lg hover:from-amber-500 hover:to-amber-400 transition-colors flex items-center justify-center gap-2 font-medium"
            >
              <Download size={18} />
              Save Contact
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactCard;