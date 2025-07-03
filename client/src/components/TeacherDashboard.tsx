import { Calendar, Clock, Star, Heart, Users, Video } from "lucide-react";
import { Teacher, Booking } from "../utils/types";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

interface TeacherDashboardContentProps {
  teacher: Teacher;
  activeTab: "upcoming" | "past";
  setActiveTab: React.Dispatch<React.SetStateAction<"upcoming" | "past">>;
  filteredBookings: Booking[];
  userBookings: Booking[];
}

export default function TeacherDashboardContent({
  teacher,
  activeTab,
  setActiveTab,
  filteredBookings,
}: TeacherDashboardContentProps) {
  const reviews = teacher.reviews ?? [];
  const navigate = useNavigate();

  return (
    <div className="grid gap-8 md:grid-cols-3">
      {/* MAIN CONTENT */}
      <div className="md:col-span-2 space-y-8">
        {/* Your Lessons */}
        <div className="rounded-xl bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">Your Lessons</h2>
            <div className="flex rounded-lg bg-gray-100 p-1">
              {['upcoming', 'past'].map((tab) => (
                <button
                  key={tab}
                  className={`px-3 py-1 text-sm font-medium rounded-md ${
                    activeTab === tab
                      ? 'bg-white shadow-sm text-gray-900'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                  onClick={() => setActiveTab(tab as 'upcoming' | 'past')}
                >
                  {tab[0].toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6">
            {filteredBookings.length > 0 ? (
              <div className="space-y-4">
                {filteredBookings.map((lesson) => {
                  const student = lesson?.studentId;
                  return (
                    <div
                      key={String(lesson._id)}
                      className="flex flex-col sm:flex-row sm:items-center border rounded-lg p-4 hover:border-primary-200"
                    >
                      <div className="flex items-start space-x-4 flex-1">
                        <img
                          src={student?.avatar || '/placeholder-avatar.png'}
                          alt={student?.name || 'Student'}
                          className="h-16 w-16 rounded-full object-cover"
                        />
                        <div>
                          <h3 className="font-medium text-gray-900">
                            {lesson.subject?.join(', ') || 'No Subject'} with {student?.name || 'Unnamed Student'}
                          </h3>
                          <div className="mt-1 flex items-center text-gray-600 text-sm">
                            <Calendar className="mr-1 h-4 w-4" />
                            {lesson.date ? new Date(lesson.date).toLocaleDateString() : 'No Date'}
                            <span className="mx-2">•</span>
                            <Clock className="mr-1 h-4 w-4" />
                            {lesson.startTime || '-'} - {lesson.endTime || '-'}
                          </div>
                          <div className="mt-1 text-sm">
                            {lesson.online ? (
                              <span className="text-primary-600 flex items-center">
                                <Video className="h-4 w-4 mr-1" />
                                Online
                              </span>
                            ) : (
                              <span className="text-secondary-600 flex items-center">
                                <Users className="h-4 w-4 mr-1" />
                                In-person
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="flex h-48 flex-col items-center justify-center rounded-lg border border-dashed border-gray-300 p-8">
                <Calendar className="h-10 w-10 text-gray-400" />
                <h3 className="mt-2 text-lg font-medium text-gray-900">No {activeTab} bookings</h3>
                <p className="mt-1 text-center text-gray-600">
                  {activeTab === 'upcoming'
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

        {/* Recent Reviews */}
        <div className="rounded-xl bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Reviews</h2>
          {reviews.length > 0 ? (
            reviews.map((review) => (
              <div key={String(review._id)} className="flex items-start space-x-4 mb-4">
                <img
                  src={review.studentAvatar || '/placeholder-avatar.png'}
                  alt={review.studentName || 'Student'}
                  className="h-12 w-12 rounded-full object-cover"
                />
                <div>
                  <p className="font-medium text-gray-900">{review.studentName || 'Unnamed Student'}</p>
                  <p className="text-sm text-gray-700">{review.comment || 'No comment provided.'}</p>
                  <p className="text-sm text-gray-500">
                    {review.date ? new Date(review.date).toLocaleDateString() : 'No date'} • ⭐ {review.rating || 0}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-gray-600">No reviews yet.</div>
          )}
        </div>
      </div>

      {/* SIDEBAR */}
      <div className="space-y-8">
        {/* Profile Card */}
        <div className="rounded-xl bg-white p-6 shadow-sm">
          <div className="flex items-center space-x-4">
            <img
              src={teacher?.avatar || '/placeholder-avatar.png'}
              alt={teacher?.name || 'Teacher'}
              className="h-16 w-16 rounded-full object-cover"
            />
            <div>
              <h2 className="font-semibold text-gray-900">{teacher?.name || 'Unnamed Teacher'}</h2>
              <p className="text-sm text-gray-600">{teacher?.email || 'No email provided'}</p>
            </div>
          </div>
          <div className="mt-4 text-sm text-gray-700 space-y-1">
            <p>Subjects: {teacher?.subjects?.join(', ') || 'N/A'}</p>
            <p>
              Rating: {teacher?.rating ?? 0} ⭐ ({teacher?.reviewCount ?? 0} reviews)
            </p>
            <p>Rate: ₹{teacher?.hourlyRate ?? 0}/hr</p>
            <p>Location: {teacher?.location || 'N/A'}</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="rounded-xl bg-white p-6 shadow-sm space-y-2">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Quick Actions</h2>
          <button onClick={() => navigate('/profile')} className="w-full border rounded-lg px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
            Edit Profile
          </button>
          <button className="w-full border rounded-lg px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
            Set Availability
          </button>
          <button className="w-full border rounded-lg px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
            Manage Subjects
          </button>
        </div>
      </div>
    </div>
  );
}