import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, BookOpen } from 'lucide-react';

const HeroSearch: React.FC = () => {
  const navigate = useNavigate();
  const [subject, setSubject] = useState('');
  const [location, setLocation] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/search?subject=${encodeURIComponent(subject)}&location=${encodeURIComponent(location)}`);
  };

  return (
    <div className="overflow-hidden rounded-xl bg-white shadow-xl transition-all">
      <form onSubmit={handleSearch} className="flex flex-col md:flex-row">
        <div className="flex flex-1 items-center border-b px-4 py-3 md:border-b-0 md:border-r">
          <BookOpen className="mr-2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="What do you want to learn?"
            className="w-full border-0 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-0"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
        </div>
        
        <div className="flex flex-1 items-center border-b px-4 py-3 md:border-b-0 md:border-r">
          <MapPin className="mr-2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Your location"
            className="w-full border-0 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-0"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
        
        <div className="p-2">
          <button
            type="submit"
            className="w-full rounded-lg bg-primary-600 px-8 py-2 text-sm font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 md:w-auto"
          >
            <Search className="mr-2 inline h-5 w-5" />
            Search
          </button>
        </div>
      </form>
    </div>
  );
};

export default HeroSearch;