import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import logo from '../assets/logo.png';

const Footer = () => {
  return (
    <footer className="bg-foreground text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center mb-4">
              <img src={logo} alt="EliteTutors" className="h-10 w-auto filter brightness-0 invert" />
            </div>
            <p className="text-gray-300 mb-4 text-sm">
              Connecting students with qualified tutors across the Middle East. 
              Your journey to academic excellence starts here.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="sm" className="p-2 hover:bg-white/10">
                <Facebook className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" className="p-2 hover:bg-white/10">
                <Twitter className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" className="p-2 hover:bg-white/10">
                <Instagram className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" className="p-2 hover:bg-white/10">
                <Linkedin className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Find Tutors</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Become a Tutor</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Subjects</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Study Resources</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Subjects */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Popular Subjects</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Mathematics</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Physics</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Chemistry</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">English</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Arabic</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Biology</a></li>
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Stay Connected</h3>
            <div className="space-y-3 mb-6">
              <div className="flex items-center text-sm text-gray-300">
                <Mail className="h-4 w-4 mr-2" />
                info@elitetutors.com
              </div>
              <div className="flex items-center text-sm text-gray-300">
                <Phone className="h-4 w-4 mr-2" />
                +965 1234 5678
              </div>
              <div className="flex items-center text-sm text-gray-300">
                <MapPin className="h-4 w-4 mr-2" />
                Middle East Region
              </div>
            </div>
            
            {/* Newsletter */}
            <div>
              <h4 className="font-medium mb-2">Newsletter</h4>
              <p className="text-sm text-gray-300 mb-3">
                Get updates on new tutors and educational resources
              </p>
              <div className="flex space-x-2">
                <Input
                  type="email"
                  placeholder="Your email"
                  className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                />
                <Button className="bg-accent hover:bg-accent/90">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-white/10 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm text-gray-300 mb-4 md:mb-0">
              © 2024 EliteTutors. All rights reserved.
            </div>
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

