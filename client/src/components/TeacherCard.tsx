import React from 'react';
import { Link } from 'react-router-dom';
import { Star, MapPin, Video, Users, Check } from 'lucide-react';
import { Teacher } from '../utils/types';

interface TeacherCardProps {
  teacher: Teacher;
}

const TeacherCard: React.FC<TeacherCardProps> = ({ teacher }) => {
  return (
    <Link to={`/teachers/${teacher._id}`} className="card group overflow-hidden transition-all duration-300 hover:translate-y-[-4px]">
      <div className="flex items-start space-x-4">
        <img
          src={teacher.avatar}
          alt={teacher.name}
          className="h-20 w-20 rounded-full object-cover"
        />
        <div>
          <h3 className="font-semibold text-gray-900">
            <Link
              to={`/teachers/${teacher._id}`}
              className="hover:text-primary-600"
            >
              {teacher.name}
            </Link>
          </h3>
          <div className="mt-1 flex items-center">
            <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
            <span className="ml-1 text-sm font-medium">{teacher.rating}</span>
            <span className="ml-1 text-sm text-gray-500">
              ({teacher.reviewCount} reviews)
            </span>
          </div>
          <div className="mt-1 flex items-center text-sm text-gray-500">
            <MapPin className="mr-1 h-4 w-4" />
            {teacher.location}
          </div>
        </div>
      </div>

      <div className="mt-4">
        <div className="flex flex-wrap gap-1">
          {teacher.subjects.slice(0, 3).map((subject, index) => (
            <span key={index} className="badge-blue">
              {subject}
            </span>
          ))}
          {teacher.subjects.length > 3 && (
            <span className="badge bg-gray-100 text-gray-800">
              +{teacher.subjects.length - 3} more
            </span>
          )}
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div className="flex space-x-2">
          {teacher.online && (
            <span className="flex items-center rounded-full bg-primary-50 px-2 py-1 text-xs font-medium text-primary-700">
              <Video className="mr-1 h-3 w-3" /> Online
            </span>
          )}
          {teacher.inPerson && (
            <span className="flex items-center rounded-full bg-secondary-50 px-2 py-1 text-xs font-medium text-secondary-700">
              <Users className="mr-1 h-3 w-3" /> In-person
            </span>
          )}
        </div>
        <div className="text-right">
          <span className="text-lg font-bold text-gray-900">₹{teacher.hourlyRate}</span>
          <span className="text-sm text-gray-500">/hr</span>
        </div>
      </div>

      <div className="mt-4 flex justify-between">
        <Link
          to={`/teachers/${teacher._id}`}
          className="btn-outline flex-1 hover:btn-primary"
        >
          View Profile
        </Link>
        <Link
          to={`/booking/${teacher._id}`}
          className="btn-primary ml-2 flex-1"
        >
          Book Now
        </Link>
      </div>
    </Link>
  );
};

export default TeacherCard;