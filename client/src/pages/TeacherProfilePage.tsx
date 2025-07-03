import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, MapPin, Video, Users, Bookmark, BookOpen, Clock, Calendar, ExternalLink, ChevronRight, MessageCircle } from 'lucide-react';
import { Teacher, Review } from '../utils/types';
import TeacherProfileSkeleton from '../components/ProfileSkeleton';
import { useTeachers } from '../hooks/customhooks';

const TeacherProfilePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [teacher, setTeacher] = useState<Teacher | null>(null);
  const [teacherReviews, setTeacherReviews] = useState<Review[]>([]);
  const [activeTab, setActiveTab] = useState('about');

  const { data: teachers = [], isLoading, isError } = useTeachers();

  useEffect(() => {
    if (id) {
      const foundTeacher = teachers.find((t) => String(t._id) === String(id));
      if (foundTeacher) {
        setTeacher(foundTeacher);
        const foundReviews = foundTeacher.reviews || [];
        if (foundReviews?.length > 0) {
          setTeacherReviews(foundReviews)
        }
      }
    }
  }, [id, teachers]);

  if (isLoading) {
    return (
      <TeacherProfileSkeleton/>
    )
  }

  if (!teacher) {
    return (
      <div className="container mx-auto flex h-96 items-center justify-center px-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Teacher not found</h2>
          <p className="mt-2 text-gray-600">The teacher you're looking for doesn't exist or has been removed.</p>
          <Link to="/search" className="btn-primary mt-4">
            Back to Search
          </Link>
        </div>
      </div>
    );
  }
  
  if (isError) {
    return (
      <div className="container mx-auto flex h-96 items-center justify-center px-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Teacher not found</h2>
          <p className="mt-2 text-gray-600">Server Error</p>
          <Link to="/search" className="btn-primary mt-4">
            Back to Search
          </Link>
        </div>
      </div>
    )
  }
  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
      {/* Teacher Profile Header */}
      <div className="rounded-xl bg-white p-6 shadow-sm md:p-8">
        <div className="flex flex-col md:flex-row md:items-start md:space-x-6">
          <div className="mb-4 md:mb-0">
            <img
              src={teacher.avatar}
              alt={teacher.name}
              className="h-32 w-32 rounded-full object-cover md:h-40 md:w-40"
            />
          </div>
          
          <div className="flex-1">
            <div className="flex flex-col justify-between md:flex-row">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">{teacher.name}</h1>
                <div className="mt-2 flex flex-wrap items-center gap-2">
                  {(teacher.subjects ?? ['']).map((subject, index) => (
                    <span key={index} className="badge-blue">
                      {subject}
                    </span>
                  ))}
                </div>
                
                <div className="mt-4 flex items-center">
                  <div className="flex items-center">
                    <Star className="h-5 w-5 fill-amber-400 text-amber-400" />
                    <span className="ml-1 font-medium">{teacher.rating}</span>
                  </div>
                  <span className="mx-2 text-gray-400">•</span>
                  <span className="text-gray-600">{teacher.reviewCount} reviews</span>
                  <span className="mx-2 text-gray-400">•</span>
                  <div className="flex items-center text-gray-600">
                    <MapPin className="mr-1 h-4 w-4" />
                    {teacher.location}
                  </div>
                </div>
                
                <div className="mt-2 flex flex-wrap gap-2">
                  {teacher.online && (
                    <span className="flex items-center rounded-full bg-primary-50 px-3 py-1 text-sm font-medium text-primary-700">
                      <Video className="mr-1 h-4 w-4" /> Online Lessons
                    </span>
                  )}
                  {teacher.inPerson && (
                    <span className="flex items-center rounded-full bg-secondary-50 px-3 py-1 text-sm font-medium text-secondary-700">
                      <Users className="mr-1 h-4 w-4" /> In-person Lessons
                    </span>
                  )}
                </div>
              </div>
              
              <div className="mt-4 md:mt-0 md:text-right">
                <div className="text-2xl font-bold text-gray-900">₹{teacher.hourlyRate}<span className="text-sm font-normal text-gray-500">/hour</span></div>
                
                <div className="mt-4 flex space-x-2">
                  <Link to={`/booking/${teacher._id}`} className="btn-primary">
                    Book Now
                  </Link>
                  <button className="btn-outline">
                    <MessageCircle className="mr-1 h-4 w-4" /> Message
                  </button>
                  <button className="btn-outline">
                    <Bookmark className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Tabs Navigation */}
      <div className="mt-8 border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            className={`border-b-2 px-1 pb-4 text-sm font-medium ${
              activeTab === 'about'
                ? 'border-primary-600 text-primary-600'
                : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('about')}
          >
            About
          </button>
          <button
            className={`border-b-2 px-1 pb-4 text-sm font-medium ${
              activeTab === 'reviews'
                ? 'border-primary-600 text-primary-600'
                : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('reviews')}
          >
            Reviews ({teacherReviews.length})
          </button>
          <button
            className={`border-b-2 px-1 pb-4 text-sm font-medium ${
              activeTab === 'availability'
                ? 'border-primary-600 text-primary-600'
                : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('availability')}
          >
            Availability
          </button>
        </nav>
      </div>
      
      {/* Tab Content */}
      <div className="mt-8">
        {/* About Tab */}
        {activeTab === 'about' && (
          <div className="grid gap-8 md:grid-cols-3">
            <div className="md:col-span-2 space-y-8">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">About {teacher.name}</h2>
                <p className="mt-4 text-gray-700 leading-relaxed">{teacher.bio}</p>
              </div>
              
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Experience</h2>
                <p className="mt-4 text-gray-700 leading-relaxed">{teacher.experience}</p>
              </div>
              
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Education</h2>
                <ul className="mt-4 space-y-2">
                  {(teacher.education ?? ['']).map((edu, index) => (
                    <li key={index} className="flex items-start">
                      <BookOpen className="mr-2 h-5 w-5 text-primary-600" />
                      <span className="text-gray-700">{edu}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            <div>
              <div className="rounded-xl bg-gray-50 p-6">
                <h3 className="font-semibold text-gray-900">Teaching Details</h3>
                
                <div className="mt-4 space-y-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Subjects</h4>
                    <div className="mt-1 flex flex-wrap gap-1">
                      {(teacher.subjects ?? ['']).map((subject, index) => (
                        <span key={index} className="badge-blue">
                          {subject}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Lesson Types</h4>
                    <div className="mt-1 space-y-1">
                      {teacher.online && (
                        <div className="flex items-center text-gray-700">
                          <Video className="mr-2 h-4 w-4 text-primary-600" />
                          Online lessons
                        </div>
                      )}
                      {teacher.inPerson && (
                        <div className="flex items-center text-gray-700">
                          <Users className="mr-2 h-4 w-4 text-secondary-600" />
                          In-person lessons
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Location</h4>
                    <div className="mt-1 flex items-center text-gray-700">
                      <MapPin className="mr-2 h-4 w-4 text-gray-500" />
                      {teacher.location}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Rating</h4>
                    <div className="mt-1 flex items-center">
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map(star => (
                          <Star 
                            key={star}
                            className={`h-4 w-4 ${star <= Math.round(teacher.rating) ? 'fill-amber-400 text-amber-400' : 'text-gray-300'}`} 
                          />
                        ))}
                      </div>
                      <span className="ml-2 text-gray-700">{teacher.rating} ({teacher.reviewCount} reviews)</span>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6">
                  <Link to={`/booking/${teacher._id}`} className="btn-primary w-full">
                    Book a Lesson
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Reviews Tab */}
        {activeTab === 'reviews' && (
          <div className="space-y-8">
            <div className="rounded-xl bg-white p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-gray-900">Student Reviews</h2>
              <div className="mt-2 flex items-center">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map(star => (
                    <Star 
                      key={star}
                      className={`h-5 w-5 ${star <= Math.round(teacher.rating) ? 'fill-amber-400 text-amber-400' : 'text-gray-300'}`} 
                    />
                  ))}
                </div>
                <span className="ml-2 text-lg font-medium">{teacher.rating}</span>
                <span className="ml-1 text-gray-600">({teacher.reviewCount} reviews)</span>
              </div>
            </div>
            
            {teacherReviews.length > 0 ? (
              <div className="space-y-4">
                {teacherReviews.map(review => (
                  <div key={String(review._id)} className="rounded-xl bg-white p-6 shadow-sm">
                    <div className="flex items-start space-x-4">
                      <img
                        src={review.studentAvatar}
                        alt={review.studentName}
                        className="h-12 w-12 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <div className="flex flex-col justify-between sm:flex-row">
                          <h3 className="font-medium text-gray-900">{review.studentName}</h3>
                          <span className="mt-1 text-sm text-gray-500 sm:mt-0">
                            {new Date(review.date).toLocaleDateString('en-US', {
                              month: 'long',
                              day: 'numeric',
                              year: 'numeric',
                            })}
                          </span>
                        </div>
                        <div className="mt-1 flex">
                          {[1, 2, 3, 4, 5].map(star => (
                            <Star 
                              key={star}
                              className={`h-4 w-4 ${star <= review.rating ? 'fill-amber-400 text-amber-400' : 'text-gray-300'}`} 
                            />
                          ))}
                        </div>
                        <p className="mt-3 text-gray-700">{review.comment}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="rounded-xl bg-white p-8 text-center shadow-sm">
                <div className="mx-auto h-16 w-16 rounded-full bg-gray-100 flex items-center justify-center">
                  <Star className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="mt-4 text-lg font-medium text-gray-900">No reviews yet</h3>
                <p className="mt-2 text-gray-600">
                  This tutor hasn't received any reviews yet. Be the first to leave a review after your lesson!
                </p>
              </div>
            )}
          </div>
        )}
        
        {/* Availability Tab */}
        {activeTab === 'availability' && (
          <div className="space-y-8">
            <div className="rounded-xl bg-white p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-gray-900">Availability</h2>
              <p className="mt-2 text-gray-600">
                Book lessons during the following times. All times are in your local timezone.
              </p>
              
              <div className="mt-6 space-y-4">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">Available Days</h3>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {(teacher.availability?.days ?? ['']).map((day, index) => (
                      <span key={index} className="badge-blue">
                        {day}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium text-gray-900">Time Slots</h3>
                  <div className="mt-2 space-y-2">
                    {(teacher.availability?.timeSlots ?? ['']).map((slot, index) => (
                      <div key={index} className="flex items-center rounded-lg border border-gray-200 p-3">
                        <Clock className="mr-3 h-5 w-5 text-gray-500" />
                        <span className="text-gray-700">{slot}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="mt-8">
                <Link to={`/booking/${teacher._id}`} className="btn-primary">
                  Book a Lesson <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TeacherProfilePage;