import React from 'react';
import { Link } from 'react-router-dom';
import { Search, Globe, Calendar, Star, BookOpen, Video, MapPin, Clock } from 'lucide-react';
import HeroSearch from '../components/HeroSearch';

const HomePage: React.FC = () => {
  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-600 to-primary-800 py-16 text-white sm:py-24 lg:py-32">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/5905857/pexels-photo-5905857.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')] bg-cover bg-center bg-no-repeat opacity-10"></div>
        </div>
        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              Find Your Perfect Tutor
            </h1>
            <p className="mt-6 text-xl leading-8">
              Connect with expert tutors for personalized learning experiences, 
              online or in-person. Achieve your academic goals with TutorMatch.
            </p>
          </div>

          <div className="mx-auto mt-12 max-w-2xl">
            <HeroSearch />
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-4 text-sm">
            <span className="flex items-center rounded-full bg-white/10 px-3 py-1 backdrop-blur-sm">
              <BookOpen className="mr-1 h-4 w-4" /> 10,000+ Tutors
            </span>
            <span className="flex items-center rounded-full bg-white/10 px-3 py-1 backdrop-blur-sm">
              <Star className="mr-1 h-4 w-4" /> 4.8 Average Rating
            </span>
            <span className="flex items-center rounded-full bg-white/10 px-3 py-1 backdrop-blur-sm">
              <Globe className="mr-1 h-4 w-4" /> 100+ Subjects
            </span>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              How TutorMatch Works
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
              Finding the right tutor is easy with our simple three-step process.
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-3">
            <div className="card group flex flex-col items-center text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary-100 text-primary-600 transition-all group-hover:bg-primary-600 group-hover:text-white">
                <Search className="h-8 w-8" />
              </div>
              <h3 className="mt-6 text-xl font-semibold text-gray-900">Search</h3>
              <p className="mt-2 text-gray-600">
                Browse tutors by subject, location, or availability. Filter results to find your perfect match.
              </p>
            </div>

            <div className="card group flex flex-col items-center text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary-100 text-primary-600 transition-all group-hover:bg-primary-600 group-hover:text-white">
                <Calendar className="h-8 w-8" />
              </div>
              <h3 className="mt-6 text-xl font-semibold text-gray-900">Book</h3>
              <p className="mt-2 text-gray-600">
                Schedule sessions that fit your calendar. Choose between online or in-person tutoring.
              </p>
            </div>

            <div className="card group flex flex-col items-center text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary-100 text-primary-600 transition-all group-hover:bg-primary-600 group-hover:text-white">
                <Star className="h-8 w-8" />
              </div>
              <h3 className="mt-6 text-xl font-semibold text-gray-900">Learn</h3>
              <p className="mt-2 text-gray-600">
                Connect with your tutor and start learning. Rate your experience and track your progress.
              </p>
            </div>
          </div>

          <div className="mt-12 text-center">
            <Link to="/search" className="btn-primary">
              Find a Tutor Now
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-50 py-16 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Why Choose TutorMatch
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Our platform offers unique features designed to make your learning experience exceptional.
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="card">
              <Video className="h-8 w-8 text-primary-600" />
              <h3 className="mt-4 text-xl font-semibold text-gray-900">Online & In-Person</h3>
              <p className="mt-2 text-gray-600">
                Choose between virtual lessons or face-to-face sessions based on your preference.
              </p>
            </div>

            <div className="card">
              <MapPin className="h-8 w-8 text-primary-600" />
              <h3 className="mt-4 text-xl font-semibold text-gray-900">Location-Based</h3>
              <p className="mt-2 text-gray-600">
                Find tutors near you for convenient in-person sessions without long commutes.
              </p>
            </div>

            <div className="card">
              <Star className="h-8 w-8 text-primary-600" />
              <h3 className="mt-4 text-xl font-semibold text-gray-900">Verified Reviews</h3>
              <p className="mt-2 text-gray-600">
                Read authentic reviews from students who have worked with each tutor.
              </p>
            </div>

            <div className="card">
              <BookOpen className="h-8 w-8 text-primary-600" />
              <h3 className="mt-4 text-xl font-semibold text-gray-900">Subject Expertise</h3>
              <p className="mt-2 text-gray-600">
                Access specialists in over 100 subjects from math and science to languages and music.
              </p>
            </div>

            <div className="card">
              <Clock className="h-8 w-8 text-primary-600" />
              <h3 className="mt-4 text-xl font-semibold text-gray-900">Flexible Scheduling</h3>
              <p className="mt-2 text-gray-600">
                Book sessions that fit your schedule with our easy-to-use calendar system.
              </p>
            </div>

            <div className="card">
              <Globe className="h-8 w-8 text-primary-600" />
              <h3 className="mt-4 text-xl font-semibold text-gray-900">Global Reach</h3>
              <p className="mt-2 text-gray-600">
                Connect with tutors worldwide for language practice or specialized knowledge.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary-600 py-16 text-white sm:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Ready to Start Learning?
            </h2>
            <p className="mt-4 text-xl">
              Join thousands of students who have found their perfect tutors on TutorMatch.
            </p>
            <div className="mt-8 flex flex-col justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
              <Link to="/search" className="btn bg-white text-primary-700 hover:bg-gray-100">
                Find a Tutor
              </Link>
              <Link to="/register" className="btn border border-white bg-transparent hover:bg-white/10">
                Sign Up Now
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;