import React from 'react';
import { Star, Github, Twitter, MessageSquare } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white/80 backdrop-blur-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center mb-4">
              <Star className="w-6 h-6 text-primary-600" />
              <span className="ml-2 text-lg font-display font-bold">DreamStake</span>
            </div>
            <p className="text-gray-600 max-w-md">
              Turn your dreams into reality through goal-oriented staking. Join challenges, stay committed, and earn rewards.
            </p>
          </div>
          
          <div>
            <h3 className="font-display font-semibold mb-4 text-gray-900">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-primary-600">Active Challenges</a></li>
              <li><a href="#" className="text-gray-600 hover:text-primary-600">Create Challenge</a></li>
              <li><a href="#" className="text-gray-600 hover:text-primary-600">How It Works</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-display font-semibold mb-4 text-gray-900">Community</h3>
            <div className="flex space-x-4">
              <a href="#" className="p-2 rounded-lg bg-gray-100 hover:bg-primary-100 text-gray-600 hover:text-primary-600 transition-all duration-200 hover:-translate-y-1">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-gray-100 hover:bg-primary-100 text-gray-600 hover:text-primary-600 transition-all duration-200 hover:-translate-y-1">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-gray-100 hover:bg-primary-100 text-gray-600 hover:text-primary-600 transition-all duration-200 hover:-translate-y-1">
                <MessageSquare className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm">© 2024 DreamStake. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-500 hover:text-primary-600 text-sm">Privacy Policy</a>
              <a href="#" className="text-gray-500 hover:text-primary-600 text-sm">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}