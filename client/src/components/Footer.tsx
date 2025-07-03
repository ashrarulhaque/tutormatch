import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Facebook, Twitter, Instagram, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <BookOpen className="h-6 w-6 text-primary-600" />
              <span className="text-lg font-bold text-gray-900">TutorMatch</span>
            </div>
            <p className="text-sm text-gray-600">
              Connecting students with the perfect tutors for personalized learning experiences.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-gray-500">
                <span className="sr-only">Facebook</span>
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-500">
                <span className="sr-only">Twitter</span>
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-500">
                <span className="sr-only">Instagram</span>
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-900">Platform</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/search" className="text-sm text-gray-600 hover:text-primary-600">
                  Find Tutors
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="text-sm text-gray-600 hover:text-primary-600">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="#" className="text-sm text-gray-600 hover:text-primary-600">
                  How It Works
                </Link>
              </li>
              <li>
                <Link to="#" className="text-sm text-gray-600 hover:text-primary-600">
                  Pricing
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-900">Company</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="#" className="text-sm text-gray-600 hover:text-primary-600">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="#" className="text-sm text-gray-600 hover:text-primary-600">
                  Careers
                </Link>
              </li>
              <li>
                <Link to="#" className="text-sm text-gray-600 hover:text-primary-600">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="#" className="text-sm text-gray-600 hover:text-primary-600">
                  Press
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-900">Support</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="#" className="text-sm text-gray-600 hover:text-primary-600">
                  Help Center
                </Link>
              </li>
              <li>
                <Link to="#" className="text-sm text-gray-600 hover:text-primary-600">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="#" className="text-sm text-gray-600 hover:text-primary-600">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="#" className="text-sm text-gray-600 hover:text-primary-600">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-200 pt-8">
          <p className="text-center text-sm text-gray-500">
            &copy; {new Date().getFullYear()} TutorMatch. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;