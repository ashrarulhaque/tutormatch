import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { format, addDays } from 'date-fns';
import { Calendar, Clock, Video, Users, CreditCard, ChevronLeft, ChevronRight, Check } from 'lucide-react';
import { Teacher } from '../utils/types';
import { useTeachers } from '../hooks/customhooks';

const BookingPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [teacher, setTeacher] = useState<Teacher | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);
  const [lessonType, setLessonType] = useState<'online' | 'in-person'>('online');
  const [subject, setSubject] = useState<string>('');
  const [step, setStep] = useState<number>(1);
  
  // Generate next 14 days for date selection
  const dateOptions = Array.from({ length: 14 }, (_, i) => addDays(new Date(), i));
  
  // Time slots generation
  const generateTimeSlots = () => {
    // In a real app, this would be filtered based on teacher's availability
    const slots = [
      '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
      '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM',
      '05:00 PM', '06:00 PM', '07:00 PM'
    ];
    return slots;
  };
  
  const timeSlots = generateTimeSlots();

  const {data: teachers=[]} = useTeachers();

  useEffect(() => {
    if (id) {
      const foundTeacher = teachers.find(t => t._id === id);
      if (foundTeacher) {
        setTeacher(foundTeacher);
        // Set the default subject to the first subject in the teacher's list
        if (foundTeacher.subjects.length > 0) {
          setSubject(foundTeacher.subjects[0]);
        }
        
        // Set the default lesson type based on teacher's capabilities
        if (foundTeacher.online) {
          setLessonType('online');
        } else if (foundTeacher.inPerson) {
          setLessonType('in-person');
        }
      }
    }
  }, [id]);
  
  const handleNextStep = () => {
    if (step < 3) {
      setStep(step + 1);
    }
  };
  
  const handlePrevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };
  
  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send booking data to the backend
    alert('Booking successful! You will receive a confirmation email shortly.');
    // Redirect to dashboard or confirmation page
  };
  
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
  
  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <Link to={`/teachers/${teacher._id}`} className="mb-4 inline-flex items-center text-sm font-medium text-gray-700 hover:text-primary-600">
        <ChevronLeft className="mr-1 h-4 w-4" />
        Back to Teacher Profile
      </Link>
      
      <div className="rounded-xl bg-white p-6 shadow-sm md:p-8">
        <div className="mb-6 border-b border-gray-200 pb-6">
          <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">Book a Lesson with {teacher.name}</h1>
          <div className="mt-2 flex items-center">
            <div className="flex items-center">
              <img
                src={teacher.avatar}
                alt={teacher.name}
                className="h-10 w-10 rounded-full object-cover"
              />
              <span className="ml-2 font-medium text-gray-700">{teacher.name}</span>
            </div>
            <span className="mx-2 text-gray-400">•</span>
            <span className="text-gray-600">${teacher.hourlyRate}/hour</span>
          </div>
        </div>
        
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className={`flex h-8 w-8 items-center justify-center rounded-full ${
                step >= 1 ? 'bg-primary-600 text-white' : 'bg-gray-200 text-gray-500'
              }`}>
                {step > 1 ? <Check className="h-5 w-5" /> : 1}
              </div>
              <div className={`ml-2 text-sm font-medium ${
                step >= 1 ? 'text-gray-900' : 'text-gray-500'
              }`}>
                Select Date & Time
              </div>
            </div>
            
            <div className="mx-4 h-0.5 flex-1 bg-gray-200">
              <div
                className="h-0.5 bg-primary-600"
                style={{ width: `${(step - 1) * 50}%` }}
              ></div>
            </div>
            
            <div className="flex items-center">
              <div className={`flex h-8 w-8 items-center justify-center rounded-full ${
                step >= 2 ? 'bg-primary-600 text-white' : 'bg-gray-200 text-gray-500'
              }`}>
                {step > 2 ? <Check className="h-5 w-5" /> : 2}
              </div>
              <div className={`ml-2 text-sm font-medium ${
                step >= 2 ? 'text-gray-900' : 'text-gray-500'
              }`}>
                Lesson Details
              </div>
            </div>
            
            <div className="mx-4 h-0.5 flex-1 bg-gray-200">
              <div
                className="h-0.5 bg-primary-600"
                style={{ width: `${(step - 2) * 100}%` }}
              ></div>
            </div>
            
            <div className="flex items-center">
              <div className={`flex h-8 w-8 items-center justify-center rounded-full ${
                step >= 3 ? 'bg-primary-600 text-white' : 'bg-gray-200 text-gray-500'
              }`}>
                {step > 3 ? <Check className="h-5 w-5" /> : 3}
              </div>
              <div className={`ml-2 text-sm font-medium ${
                step >= 3 ? 'text-gray-900' : 'text-gray-500'
              }`}>
                Payment
              </div>
            </div>
          </div>
        </div>
        
        <form onSubmit={handleBookingSubmit}>
          {/* Step 1: Date and Time Selection */}
          {step === 1 && (
            <div className="animate-fade-in">
              <h2 className="text-xl font-semibold text-gray-900">Select Date & Time</h2>
              <p className="mt-2 text-gray-600">
                Choose a date and time that works for you. All times are in your local timezone.
              </p>
              
              <div className="mt-6">
                <h3 className="text-lg font-medium text-gray-900">Select a Date</h3>
                <div className="mt-3 flex overflow-x-auto py-2">
                  {dateOptions.map((date, index) => (
                    <button
                      key={index}
                      type="button"
                      className={`flex min-w-[100px] flex-col items-center rounded-lg border px-4 py-3 mr-2 ${
                        format(selectedDate, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd')
                          ? 'border-primary-600 bg-primary-50'
                          : 'border-gray-200 hover:border-primary-200'
                      }`}
                      onClick={() => setSelectedDate(date)}
                    >
                      <span className="text-sm font-medium text-gray-900">
                        {format(date, 'EEE')}
                      </span>
                      <span className="mt-1 text-2xl font-semibold text-gray-900">
                        {format(date, 'd')}
                      </span>
                      <span className="mt-1 text-xs text-gray-500">
                        {format(date, 'MMM')}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="mt-8">
                <h3 className="text-lg font-medium text-gray-900">Select a Time</h3>
                <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                  {timeSlots.map((slot, index) => (
                    <button
                      key={index}
                      type="button"
                      className={`flex items-center justify-center rounded-lg border py-3 ${
                        selectedTimeSlot === slot
                          ? 'border-primary-600 bg-primary-50 text-primary-700'
                          : 'border-gray-200 hover:border-primary-200'
                      }`}
                      onClick={() => setSelectedTimeSlot(slot)}
                    >
                      <Clock className="mr-2 h-4 w-4" />
                      {slot}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="mt-8 flex justify-end">
                <button
                  type="button"
                  className="btn-primary"
                  onClick={handleNextStep}
                  disabled={!selectedDate || !selectedTimeSlot}
                >
                  Next Step <ChevronRight className="ml-1 h-4 w-4" />
                </button>
              </div>
            </div>
          )}
          
          {/* Step 2: Lesson Details */}
          {step === 2 && (
            <div className="animate-fade-in">
              <h2 className="text-xl font-semibold text-gray-900">Lesson Details</h2>
              <p className="mt-2 text-gray-600">
                Provide details about your lesson to help {teacher.name} prepare.
              </p>
              
              <div className="mt-6 space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Subject</label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="input mt-1"
                    required
                  >
                    {(teacher?.subjects || ['']).map((subj, index) => (
                      <option key={index} value={subj}>
                        {subj}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Lesson Type</label>
                  <div className="mt-2 grid grid-cols-2 gap-3">
                    {teacher.online && (
                      <button
                        type="button"
                        className={`flex items-center justify-center rounded-lg border p-4 ${
                          lessonType === 'online'
                            ? 'border-primary-600 bg-primary-50'
                            : 'border-gray-200 hover:border-primary-200'
                        }`}
                        onClick={() => setLessonType('online')}
                      >
                        <div className="flex flex-col items-center">
                          <Video className={`h-6 w-6 ${
                            lessonType === 'online' ? 'text-primary-600' : 'text-gray-500'
                          }`} />
                          <span className={`mt-2 font-medium ${
                            lessonType === 'online' ? 'text-primary-700' : 'text-gray-700'
                          }`}>
                            Online Lesson
                          </span>
                        </div>
                      </button>
                    )}
                    
                    {teacher.inPerson && (
                      <button
                        type="button"
                        className={`flex items-center justify-center rounded-lg border p-4 ${
                          lessonType === 'in-person'
                            ? 'border-primary-600 bg-primary-50'
                            : 'border-gray-200 hover:border-primary-200'
                        }`}
                        onClick={() => setLessonType('in-person')}
                      >
                        <div className="flex flex-col items-center">
                          <Users className={`h-6 w-6 ${
                            lessonType === 'in-person' ? 'text-primary-600' : 'text-gray-500'
                          }`} />
                          <span className={`mt-2 font-medium ${
                            lessonType === 'in-person' ? 'text-primary-700' : 'text-gray-700'
                          }`}>
                            In-Person Lesson
                          </span>
                        </div>
                      </button>
                    )}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    What would you like to learn?
                  </label>
                  <textarea
                    className="input mt-1 h-32 resize-none"
                    placeholder="Describe what you'd like to cover in your lesson..."
                  ></textarea>
                </div>
              </div>
              
              <div className="mt-8 flex justify-between">
                <button
                  type="button"
                  className="btn-outline"
                  onClick={handlePrevStep}
                >
                  <ChevronLeft className="mr-1 h-4 w-4" /> Back
                </button>
                <button
                  type="button"
                  className="btn-primary"
                  onClick={handleNextStep}
                >
                  Next Step <ChevronRight className="ml-1 h-4 w-4" />
                </button>
              </div>
            </div>
          )}
          
          {/* Step 3: Payment */}
          {step === 3 && (
            <div className="animate-fade-in">
              <h2 className="text-xl font-semibold text-gray-900">Payment</h2>
              <p className="mt-2 text-gray-600">
                Review your booking details and complete the payment.
              </p>
              
              <div className="mt-6 rounded-lg border border-gray-200 bg-gray-50 p-4">
                <h3 className="font-medium text-gray-900">Booking Summary</h3>
                <div className="mt-4 space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Teacher:</span>
                    <span className="font-medium text-gray-900">{teacher.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subject:</span>
                    <span className="font-medium text-gray-900">{subject}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Date:</span>
                    <span className="font-medium text-gray-900">
                      {format(selectedDate, 'EEEE, MMMM d, yyyy')}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Time:</span>
                    <span className="font-medium text-gray-900">{selectedTimeSlot}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Lesson Type:</span>
                    <span className="font-medium text-gray-900">
                      {lessonType === 'online' ? 'Online' : 'In-Person'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Duration:</span>
                    <span className="font-medium text-gray-900">1 hour</span>
                  </div>
                  <div className="border-t border-gray-200 pt-3">
                    <div className="flex justify-between">
                      <span className="text-gray-900 font-medium">Total:</span>
                      <span className="text-xl font-bold text-gray-900">${teacher.hourlyRate}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-8">
                <h3 className="font-medium text-gray-900">Payment Method</h3>
                <div className="mt-3 rounded-lg border border-gray-200 p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <CreditCard className="h-6 w-6 text-gray-400" />
                      <span className="ml-2 text-gray-700">Credit Card</span>
                    </div>
                    <button
                      type="button"
                      className="text-sm font-medium text-primary-600 hover:text-primary-700"
                    >
                      Change
                    </button>
                  </div>
                  
                  <div className="mt-4 grid gap-4 md:grid-cols-2">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Card Number
                      </label>
                      <input
                        type="text"
                        className="input mt-1"
                        placeholder="0000 0000 0000 0000"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Cardholder Name
                      </label>
                      <input
                        type="text"
                        className="input mt-1"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Expiration Date
                      </label>
                      <input
                        type="text"
                        className="input mt-1"
                        placeholder="MM/YY"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        CVC
                      </label>
                      <input
                        type="text"
                        className="input mt-1"
                        placeholder="123"
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 flex justify-between">
                <button
                  type="button"
                  className="btn-outline"
                  onClick={handlePrevStep}
                >
                  <ChevronLeft className="mr-1 h-4 w-4" /> Back
                </button>
                <button
                  type="submit"
                  className="btn-primary"
                >
                  Complete Booking
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default BookingPage;