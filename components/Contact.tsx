import React from 'react';
import { Mail, MessageSquare, MapPin } from 'lucide-react';

const Contact: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto px-6 py-12 md:py-20 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="grid md:grid-cols-2 gap-12">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-6">Get in Touch</h1>
          <p className="text-lg text-gray-600 mb-10">
            Have questions about your subscription, a technical issue, or just want to share your success story? We'd love to hear from you.
          </p>
          
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="bg-brand-50 p-3 rounded-lg text-brand-600">
                <Mail size={24} />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">Email Us</h3>
                <p className="text-gray-500">support@lingualift.com</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="bg-brand-50 p-3 rounded-lg text-brand-600">
                <MessageSquare size={24} />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">Live Chat</h3>
                <p className="text-gray-500">Available Mon-Fri, 9am-5pm EST</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="bg-brand-50 p-3 rounded-lg text-brand-600">
                <MapPin size={24} />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">Office</h3>
                <p className="text-gray-500">123 Innovation Dr, San Francisco, CA</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-200">
          <form className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-brand-500 transition-all" placeholder="Your name" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input type="email" className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-brand-500 transition-all" placeholder="you@example.com" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
              <textarea rows={4} className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-brand-500 transition-all" placeholder="How can we help?"></textarea>
            </div>
            <button className="w-full bg-brand-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-brand-700 transition-colors shadow-lg shadow-brand-200">Send Message</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;