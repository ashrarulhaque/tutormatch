import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Booking } from "../utils/types";
import { useAuth } from "../contexts/AuthContext";
import { fetchBookingData } from "../utils/actions";

import StudentDashboardContent from "../components/StudentDashboard";
import TeacherDashboardContent from "../components/TeacherDashboard";

const DashboardPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>("upcoming");
  const [userBookings, setUserBookings] = useState<Booking[]>([]);


  const { user } = useAuth();

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const bookings = await fetchBookingData();
        setUserBookings(bookings);
      } catch (error) {
        console.error("Failed to fetch bookings:", error);
      }
    };

    fetchBookings();
  }, [user]);
  // Filter bookings based on active tab
  const filteredBookings = userBookings?.filter((booking) => {
    if (activeTab === "upcoming") {
      return booking.status === "ongoing";
    } else if (activeTab === "past") {
      return booking.status === "completed";
    }
    return true;
  });

  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="mt-1 text-gray-600">
            {user?.role === 'Student'
              ? 'Manage your bookings and favorite tutors'
              : 'Manage your upcoming lessons and student progress'}
          </p>
        </div>
        <div className="mt-4 md:mt-0">
          {user?.role === 'Student' ? (
            <Link to="/search" className="btn-primary">
              Find New Tutors
            </Link>
          ) : (
            <Link to="/availability" className="btn-primary">
              Set Availability
            </Link>
          )}
        </div>
      </div>

      {user?.role === 'Student' && (
        <StudentDashboardContent
          student={user?.profile}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          filteredBookings={filteredBookings}
        />
      )}

      {user?.role === 'Teacher' && (
        <TeacherDashboardContent
          teacher={user?.profile}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          filteredBookings={filteredBookings}
          userBookings={userBookings}
        />
      )}
    </div>
  );
};


export default DashboardPage;
