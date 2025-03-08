import { Brain, Mail, MapPin, Phone } from 'lucide-react';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-[#2D336B] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2">
              <Brain className="h-8 w-8" />
              <span className="text-xl font-bold">NeuroVED</span>
            </div>
            <p className="mt-4 text-sm text-gray-300">
              Revolutionizing healthcare through advanced AI technology and machine learning solutions.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-gray-300 hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/services" className="text-gray-300 hover:text-white transition-colors">Services</Link></li>
              <li><Link href="/technology" className="text-gray-300 hover:text-white transition-colors">Technology</Link></li>
              <li><Link href="/case-studies" className="text-gray-300 hover:text-white transition-colors">Case Studies</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              <li><Link href="/services#NeuroVEDical-models" className="text-gray-300 hover:text-white transition-colors">NeuroVEDical Models</Link></li>
              <li><Link href="/services#data-management" className="text-gray-300 hover:text-white transition-colors">Data Management</Link></li>
              <li><Link href="/services#ai-assistants" className="text-gray-300 hover:text-white transition-colors">AI Assistants</Link></li>
              <li><Link href="/services#administration" className="text-gray-300 hover:text-white transition-colors">Administration</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-2">
              <li className="flex items-center space-x-2">
                <MapPin className="h-5 w-5 text-[#A9B5DF]" />
                <span className="text-gray-300">123 NeuroVEDical Center Dr.</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="h-5 w-5 text-[#A9B5DF]" />
                <span className="text-gray-300">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="h-5 w-5 text-[#A9B5DF]" />
                <span className="text-gray-300">contact@NeuroVED.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-300 text-sm">
              © {new Date().getFullYear()} NeuroVED. All rights reserved.
            </p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <Link href="/privacy" className="text-gray-300 hover:text-white text-sm">Privacy Policy</Link>
              <Link href="/terms" className="text-gray-300 hover:text-white text-sm">Terms of Service</Link>
              <Link href="/compliance" className="text-gray-300 hover:text-white text-sm">Compliance</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;