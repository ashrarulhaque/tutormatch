import { Link } from "react-router-dom";
import {
  Calendar,
  Clock,
  Heart,
  Star,
  Users,
  Video,
  ChevronRight,
} from "lucide-react";
import TeacherCard from "./TeacherCard";
import { Booking, Student } from "../utils/types";
import { useTeachers } from "../hooks/customhooks";
import LoadingSpinner from "./LoadingSpinner";
import { useNavigate } from "react-router-dom";

interface Props {
  student: Student;
  activeTab: "upcoming" | "past";
  setActiveTab: React.Dispatch<React.SetStateAction<"upcoming" | "past">>;
  filteredBookings: Booking[];
}

export default function StudentDashboardContent({
  student,
  activeTab,
  setActiveTab,
  filteredBookings,
}: Props) {
    
  const { data: teachers = [], isLoading } = useTeachers();
  const navigate = useNavigate();

  const recommendedTeacher = teachers.find(
    (t) => t._id.toString() === "6857113b40e5204a1ebb965c"
  );

  const favoriteTeachers = teachers.slice(0, 2);

  if (isLoading) {
    <LoadingSpinner />;
  }

  return (
    <div className="grid gap-8 md:grid-cols-3">
      <div className="md:col-span-2 space-y-8">
        {/* Bookings */}
        <div className="rounded-xl bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">
              Your Bookings
            </h2>
            <div className="flex rounded-lg bg-gray-100 p-1">
              <button
                className={`px-3 py-1 text-sm font-medium rounded-md ${
                  activeTab === "upcoming"
                    ? "bg-white shadow-sm text-gray-900"
                    : "text-gray-600 hover:text-gray-900"
                }`}
                onClick={() => setActiveTab("upcoming")}
              >
                Upcoming
              </button>
              <button
                className={`px-3 py-1 text-sm font-medium rounded-md ${
                  activeTab === "past"
                    ? "bg-white shadow-sm text-gray-900"
                    : "text-gray-600 hover:text-gray-900"
                }`}
                onClick={() => setActiveTab("past")}
              >
                Past
              </button>
            </div>
          </div>

          <div className="mt-6">
            {filteredBookings.length > 0 ? (
              <div className="space-y-4">
                {filteredBookings.map((booking) => (
                  <div
                    key={String(booking._id)}
                    className="flex flex-col rounded-lg border border-gray-200 p-4 hover:border-primary-200 sm:flex-row sm:items-center"
                  >
                    <div className="flex flex-1 items-start space-x-4">
                      <img
                        src={booking.teacherId.avatar}
                        alt={booking.teacherId.name}
                        className="h-16 w-16 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900">
                          {booking.subject} with {booking.teacherId.name}
                        </h3>
                        <div className="mt-1 flex items-center text-gray-600">
                          <Calendar className="mr-1 h-4 w-4" />
                          <span>
                            {new Date(booking.date).toLocaleDateString(
                              "en-US",
                              {
                                weekday: "short",
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              }
                            )}
                          </span>
                          <span className="mx-2">•</span>
                          <Clock className="mr-1 h-4 w-4" />
                          <span>
                            {booking.startTime} - {booking.endTime}
                          </span>
                        </div>
                        <div className="mt-1 flex items-center">
                          {booking.online ? (
                            <span className="flex items-center text-sm text-primary-600">
                              <Video className="mr-1 h-4 w-4" /> Online Lesson
                            </span>
                          ) : (
                            <span className="flex items-center text-sm text-secondary-600">
                              <Users className="mr-1 h-4 w-4" /> In-person
                              Lesson
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 flex sm:mt-0 sm:ml-4">
                      {activeTab === "upcoming" ? (
                        <>
                          <button className="btn-outline mr-2 flex-1 text-sm sm:flex-none">
                            Reschedule
                          </button>
                          <Link
                            to={`/teachers/${booking.teacherId}`}
                            className="btn-primary flex-1 text-sm sm:flex-none"
                          >
                            Join Lesson
                          </Link>
                        </>
                      ) : (
                        <>
                          <button className="btn-outline mr-2 flex-1 text-sm sm:flex-none">
                            <Star className="mr-1 h-4 w-4" /> Leave Review
                          </button>
                          <Link
                            to={`/booking/${booking.teacherId}`}
                            className="btn-primary flex-1 text-sm sm:flex-none"
                          >
                            Book Again
                          </Link>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex h-48 flex-col items-center justify-center rounded-lg border border-dashed border-gray-300 p-8">
                <Calendar className="h-10 w-10 text-gray-400" />
                <h3 className="mt-2 text-lg font-medium text-gray-900">
                  No {activeTab} bookings
                </h3>
                <p className="mt-1 text-center text-gray-600">
                  {activeTab === "upcoming"
                    ? "You don't have any upcoming lessons scheduled."
                    : "You haven't had any lessons yet."}
                </p>
                <Link to="/search" className="btn-primary mt-4">
                  Find a Tutor
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="rounded-xl bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">
              Recent Activity
            </h2>
            <button className="text-sm font-medium text-primary-600 hover:text-primary-700">
              View All
            </button>
          </div>

          <div className="mt-6 space-y-4">
            <div className="flex items-start space-x-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-100 text-primary-600">
                <Star className="h-5 w-5" />
              </div>
              <div>
                <p className="text-gray-700">
                  You completed a lesson with{" "}
                  <span className="font-medium">James Wilson</span>
                </p>
                <span className="text-sm text-gray-500">2 days ago</span>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary-100 text-secondary-600">
                <Calendar className="h-5 w-5" />
              </div>
              <div>
                <p className="text-gray-700">
                  You booked a new lesson with{" "}
                  <span className="font-medium">Dr. Emily Chen</span>
                </p>
                <span className="text-sm text-gray-500">4 days ago</span>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-100 text-amber-600">
                <Heart className="h-5 w-5" />
              </div>
              <div>
                <p className="text-gray-700">
                  You added <span className="font-medium">Maria Rodriguez</span>{" "}
                  to favorites
                </p>
                <span className="text-sm text-gray-500">1 week ago</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-8">
        {/* User Profile */}
        <div className="rounded-xl bg-white p-6 shadow-sm">
          <div className="flex items-center space-x-4">
            <img
              src={student.avatar}
              alt={student.name}
              className="h-16 w-16 rounded-full object-cover"
            />
            <div>
              <h2 className="font-semibold text-gray-900">{student.name}</h2>
              <p className="text-sm text-gray-600">{student.name}</p>
            </div>
          </div>

          <div className="mt-6 space-y-2">
            <button onClick={() => navigate('/profile')} className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
              Edit Profile
            </button>
            <button className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
              Payment Methods
            </button>
            <button className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
              Notification Settings
            </button>
          </div>
        </div>

        {/* Favorite Teachers */}
        <div className="rounded-xl bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">
              Favorite Tutors
            </h2>
            <button className="text-sm font-medium text-primary-600 hover:text-primary-700">
              View All
            </button>
          </div>

          <div className="mt-6 space-y-4">
            {favoriteTeachers.length > 0 ? (
              favoriteTeachers.map((teacher) => (
                <div
                  key={teacher._id}
                  className="flex items-center space-x-3 rounded-lg border border-gray-200 p-3 hover:border-primary-200"
                >
                  <img
                    src={teacher.avatar}
                    alt={teacher.name}
                    className="h-12 w-12 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">
                      {teacher.name}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {teacher.subjects[0]}
                    </p>
                  </div>
                  <Link
                    to={`/booking/${teacher._id}`}
                    className="rounded-full bg-primary-50 p-2 text-primary-600 hover:bg-primary-100"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                </div>
              ))
            ) : (
              <div className="flex h-32 flex-col items-center justify-center rounded-lg border border-dashed border-gray-300 p-4">
                <Heart className="h-8 w-8 text-gray-400" />
                <p className="mt-2 text-center text-sm text-gray-600">
                  You haven't added any tutors to your favorites yet.
                </p>
              </div>
            )}
          </div>
        </div>

        {recommendedTeacher && (
          <div className="rounded-xl bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">
                Recommended For You
              </h2>
              <Link
                to="/search"
                className="text-sm font-medium text-primary-600 hover:text-primary-700"
              >
                View All
              </Link>
            </div>

            <div className="mt-6">
              <TeacherCard teacher={recommendedTeacher} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
