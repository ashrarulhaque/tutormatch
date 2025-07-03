import { Booking, Teacher } from "./types";
import axios from 'axios';

export async function fetchTeacherData(): Promise<Teacher[]> {
  const res = await fetch('/api/search'); 
  return await res.json();
}

export async function fetchBookingData(): Promise<Booking[]> {
  const res = await fetch('/api/booking');
  return await res.json();
}

// utils/actions.ts
export const getCurrentUser = async () => {
  const res = await fetch("http://localhost:5000/api/profile", {
    credentials: 'include',
  });

  if (!res.ok) {
    if (res.status === 401) {
      return null; // Unauthenticated
    }
    throw new Error("Failed to fetch user");
  }

  return res.json();
};


export const logoutUser = async () => {
  const res = await axios.post('/api/logout', {}, { withCredentials: true });
  return res.data;
};