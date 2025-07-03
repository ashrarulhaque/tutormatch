// This file contains mock data for the teacher booking platform
// In a production environment, this would be replaced with API calls to a backend

import { Types } from 'mongoose';

export interface Teacher {
  _id: string;
  name: string;
  email: string;
  avatar: string;
  countryCode?: number; // default is 91 if not set
  phoneNumber?: number;
  gender: 'Male' | 'Female' | 'Prefer not to say'; 
  subjects: string[] | [];
  rating: number;         // default: 0
  reviewCount: number;    // default: 0
  reviews?: Review[];
  hourlyRate: number;
  location?: string;
  online?: boolean;
  inPerson?: boolean;
  bio?: string;
  experience?: string;
  education?: string[];
  availability?: {
    days?: string[];
    timeSlots?: string[];
  };
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Student {
  _id: Types.ObjectId;
  name: string;
  email: string;
  gender: 'Male' | 'Female' | 'Prefer not to say';
  countryCode?: number;
  phoneNumber?: number;
  avatar?: string;
  institution?: {
    name?: string;
    class?: string;
  };
  subject: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Review {
  _id: Types.ObjectId; 
  studentId: Types.ObjectId; // Reference to Student model
  studentName: string;
  studentAvatar: string;
  rating: number;
  date: string | Date;
  comment: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Booking {
  _id: Types.ObjectId;
  teacherId: Teacher;
  studentId: Student;
  subject: string[];
  date: Date;
  startDate: string;
  endDate?: string;
  startTime: string;
  endTime?: string;
  status?: 'ongoing' | 'completed' | 'cancelled';
  online?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
};

export interface User {
  _id: string;
  name: string;
  email: string;
  password?: string; 
  subject?: string[];
  gender: 'Male' | 'Female' | 'Prefer not to say';
  role: 'Student' | 'Teacher';
  avatar?: string;
  roleId: string;
  roleModel: 'Student' | 'Teacher';
  createdAt?: string;
  updatedAt?: string;
};

export type CurrentUser =
  | (User & { role: 'Student'; profile: Student })
  | (User & { role: 'Teacher'; profile: Teacher });


// Mock student data (for the currently logged-in user)
export const currentStudent = {
  id: 's1',
  name: 'Sam Taylor',
  email: 'sam.taylor@example.com',
  avatar: 'https://images.pexels.com/photos/5384445/pexels-photo-5384445.jpeg?auto=compress&cs=tinysrgb&w=600',
};


export const studentBookings = [
  {
    id: 'b1',
    teacherId: '1',
    studentId: 's1',
    subject: 'Calculus',
    date: '2023-06-15',
    startTime: '4:00 PM',
    endTime: '5:30 PM',
    status: 'scheduled',
    online: true,
  },
  {
    id: 'b2',
    teacherId: '3',
    studentId: 's1',
    subject: 'Spanish Conversation',
    date: '2023-06-12',
    startTime: '1:00 PM',
    endTime: '2:00 PM',
    status: 'scheduled',
    online: true,
  },
  {
    id: 'b3',
    teacherId: '2',
    studentId: 's1',
    subject: 'Essay Review',
    date: '2023-05-30',
    startTime: '3:00 PM',
    endTime: '4:00 PM',
    status: 'completed',
    online: false,
  },
];