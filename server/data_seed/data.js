export const teachers = [
  {
    name: "Anjali Mehra",
    email: "anjali.mehra@example.com",
    avatar: "https://images.pexels.com/photos/5212317/pexels-photo-5212317.jpeg?auto=compress&cs=tinysrgb&w=600",
    gender: "Female",
    countryCode: 91,
    phoneNumber: 9876543210,
    subjects: ["Math", "Physics"],
    rating: 4.8,
    reviewCount: 120,
    reviews: [
      '685705cc142bcc28f7a00f14',
      '685705cc142bcc28f7a00f15'
    ],
    hourlyRate: 800,
    location: "Mumbai",
    online: true,
    inPerson: false,
    bio: "Passionate about teaching Physics with a focus on problem-solving.",
    experience: "7 years of high school teaching",
    education: ["M.Sc Physics", "B.Ed"],
    availability: {
      days: ["Monday", "Wednesday", "Friday"],
      timeSlots: ["10:00-12:00", "14:00-16:00"],
    },
  },
  {
    name: "Ravi Sharma",
    email: "ravi.sharma@example.com",
    avatar: "https://images.pexels.com/photos/5212339/pexels-photo-5212339.jpeg?auto=compress&cs=tinysrgb&w=600",
    gender: "Male",
    subjects: ["Chemistry"],
    rating: 4.5,
    reviewCount: 85,
    reviews: [
      '685705cc142bcc28f7a00f17'
    ],
    hourlyRate: 700,
    location: "Delhi",
    online: false,
    inPerson: true,
    bio: "Chemistry expert with a love for interactive learning.",
    experience: "5 years tutoring NEET aspirants",
    education: ["M.Sc Chemistry"],
    availability: {
      days: ["Tuesday", "Thursday"],
      timeSlots: ["09:00-11:00", "13:00-15:00"],
    },
  },
  {
    name: "Sneha Kapoor",
    email: "sneha.kapoor@example.com",
    avatar: "https://images.pexels.com/photos/5905903/pexels-photo-5905903.jpeg?auto=compress&cs=tinysrgb&w=600",
    gender: "Female",
    subjects: ["English", "History"],
    rating: 4.9,
    reviewCount: 200,
    reviews: [
      '685705cc142bcc28f7a00f13'
    ],
    hourlyRate: 900,
    location: "Pune",
    online: true,
    inPerson: true,
    bio: "Experienced in teaching literature and humanities.",
    experience: "10+ years in international schools",
    education: ["MA English Literature", "CELTA Certification"],
    availability: {
      days: ["Monday", "Saturday"],
      timeSlots: ["08:00-10:00", "17:00-19:00"],
    },
  },
  {
    name: "Amit Khanna",
    email: "amit.khanna@example.com",
    avatar: "https://images.pexels.com/photos/8617942/pexels-photo-8617942.jpeg?auto=compress&cs=tinysrgb&w=600",
    gender: "Male",
    subjects: ["Mathematics"],
    rating: 4.3,
    reviewCount: 60,
    hourlyRate: 600,
    location: "Chandigarh",
    online: true,
    inPerson: false,
    bio: "Math mentor focused on JEE preparation.",
    experience: "6 years coaching experience",
    education: ["B.Tech", "M.Sc Mathematics"],
    availability: {
      days: ["Wednesday", "Friday"],
      timeSlots: ["11:00-13:00", "15:00-17:00"],
    },
  },
  {
    name: "Neha Verma",
    email: "neha.verma@example.com",
    avatar: "https://images.pexels.com/photos/5905948/pexels-photo-5905948.jpeg?auto=compress&cs=tinysrgb&w=600",
    gender: "Female",
    subjects: ["Biology"],
    rating: 4.6,
    reviewCount: 90,
    reviews: [
      '685705cc142bcc28f7a00f16'
    ],
    hourlyRate: 750,
    location: "Hyderabad",
    online: false,
    inPerson: true,
    bio: "Helping students love life sciences.",
    experience: "5 years teaching ICSE board",
    education: ["B.Sc Biology", "M.Sc Zoology"],
    availability: {
      days: ["Monday", "Thursday"],
      timeSlots: ["10:00-12:00", "16:00-18:00"],
    },
  },
  {
    name: "Rahul Nair",
    email: "rahul.nair@example.com",
    avatar: "https://images.pexels.com/photos/5212351/pexels-photo-5212351.jpeg?auto=compress&cs=tinysrgb&w=600",
    gender: "Male",
    subjects: ["Computer Science"],
    rating: 4.7,
    reviewCount: 130,
    hourlyRate: 1000,
    location: "Bangalore",
    online: true,
    inPerson: false,
    bio: "Software engineer turned tutor for coding enthusiasts.",
    experience: "8 years in tech industry",
    education: ["B.Tech CS", "Google Certified Educator"],
    availability: {
      days: ["Saturday", "Sunday"],
      timeSlots: ["09:00-11:00", "18:00-20:00"],
    },
  },
  {
    name: "Pooja Iyer",
    email: "pooja.iyer@example.com",
    avatar: "",
    gender: "Female",
    subjects: ["Economics", "Business Studies"],
    rating: 4.4,
    reviewCount: 75,
    hourlyRate: 700,
    location: "Chennai",
    online: true,
    inPerson: true,
    bio: "Economics with real-world applications.",
    experience: "7 years CBSE teaching",
    education: ["MBA", "B.Ed"],
    availability: {
      days: ["Tuesday", "Friday"],
      timeSlots: ["12:00-14:00", "16:00-18:00"],
    },
  },
  {
    name: "Siddharth Menon",
    email: "siddharth.menon@example.com",
    avatar: "",
    gender: "Male",
    subjects: ["Geography"],
    rating: 4.2,
    reviewCount: 40,
    hourlyRate: 500,
    location: "Kochi",
    online: false,
    inPerson: true,
    bio: "Helping students explore the world through maps.",
    experience: "4 years in state syllabus schools",
    education: ["M.A. Geography"],
    availability: {
      days: ["Wednesday", "Saturday"],
      timeSlots: ["10:00-12:00"],
    },
  },
  {
    name: "Fatima Sheikh",
    email: "fatima.sheikh@example.com",
    avatar: "",
    gender: "Female",
    subjects: ["Sociology", "Political Science"],
    rating: 4.5,
    reviewCount: 110,
    hourlyRate: 850,
    location: "Lucknow",
    online: true,
    inPerson: false,
    bio: "Humanities coach with passion for debate and critical thinking.",
    experience: "6 years college lecturer",
    education: ["MA Sociology", "UGC-NET"],
    availability: {
      days: ["Thursday", "Sunday"],
      timeSlots: ["13:00-15:00", "17:00-19:00"],
    },
  },
  {
    name: "Manoj Dubey",
    email: "manoj.dubey@example.com",
    avatar: "",
    gender: "Male",
    subjects: ["Physics", "Math"],
    rating: 4.1,
    reviewCount: 35,
    hourlyRate: 650,
    location: "Varanasi",
    online: false,
    inPerson: true,
    bio: "Integrating logic and experiments to explain physics.",
    experience: "3 years coaching for board exams",
    education: ["B.Sc Physics", "M.Ed"],
    availability: {
      days: ["Monday", "Tuesday"],
      timeSlots: ["09:00-11:00", "14:00-16:00"],
    },
  }
];

export const students = [
  {
    name: "Aanya Singh",
    email: "aanya.singh@example.com",
    gender: "Female",
    countryCode: 91,
    phoneNumber: 9876543210,
    avatar: "",
    institution: {
      name: "Delhi Public School",
      class: "10",
    },
    subject: ["Math", "English", "Science"],
  },
  {
    name: "Kabir Mehta",
    email: "kabir.mehta@example.com",
    gender: "Male",
    countryCode: 91,
    phoneNumber: 9988776655,
    avatar: "https://images.pexels.com/photos/5384445/pexels-photo-5384445.jpeg?auto=compress&cs=tinysrgb&w=600",
    institution: {
      name: "Khalsa English High School",
      class: "12",
    },
    subject: ["Physics", "Chemistry", "Math"],
  },
  {
    name: "Zoya Khan",
    email: "zoya.khan@example.com",
    gender: "Female",
    countryCode: 91,
    phoneNumber: 9123456780,
    avatar: "https://images.pexels.com/photos/5393594/pexels-photo-5393594.jpeg?auto=compress&cs=tinysrgb&w=600",
    institution: {
      name: "St. Xavier's High School",
      class: "8",
    },
    subject: ["English", "History", "Art"],
  }
];


export const reviews = [
  {
    studentId: '68570482546052c9ae126321',
    rating: 5,
    date: new Date('2025-06-10'),
    comment: "Fantastic teacher! Explains concepts clearly and patiently.",
  },
  {
    studentId: '68570482546052c9ae126322',
    rating: 4,
    date: new Date('2025-05-22'),
    comment: "Very good teaching style, just a little fast at times.",
  },
  {
    studentId: '68570482546052c9ae126323',
    rating: 5,
    date: new Date('2025-06-15'),
    comment: "Best online class experience I've had so far.",
  },
  {
    studentId: '68570482546052c9ae126323',
    rating: 3,
    date: new Date('2025-04-30'),
    comment: "Good but needs to engage more with students during sessions.",
  },
  {
    studentId: '68570482546052c9ae126322',
    rating: 4,
    date: new Date('2025-06-18'),
    comment: "Helpful and always on time, enjoyed the learning process.",
  }
];


// Mock student data (for the currently logged-in user)
export const currentStudent = {

  name: 'Sam Taylor',
  email: 'sam.taylor@example.com',
  avatar: 'https://images.pexels.com/photos/5384445/pexels-photo-5384445.jpeg?auto=compress&cs=tinysrgb&w=600',
};

// Mock bookings for the current student
export const bookings = [
  {
    teacherId: '6857113b40e5204a1ebb9653', //Anjali Mehra
    studentId: '68570482546052c9ae126323',
    subject: ["Math"],
    date: new Date("2025-06-20"),
    startDate: "2025-06-20",
    startTime: "10:00",
    endDate: "2025-06-20",
    endTime: "11:00",
    status: "ongoing",
    online: true
  },
  {
    teacherId: '6857113b40e5204a1ebb9655', //Sneha Kapoor
    studentId: '68570482546052c9ae126321',
    subject: ["English", "History"],
    date: new Date("2025-06-15"),
    startDate: "2025-06-15",
    endDate: "2025-06-15",
    startTime: "15:00",
    endTime: "16:30",
    status: "completed",
    online: true
  },
  {
    teacherId: '6857113b40e5204a1ebb9653', //Anjali Mehra
    studentId: '68570482546052c9ae126322',
    subject: ["Physics"],
    date: new Date("2025-06-10"),
    startDate: "2025-06-10",
    startTime: "09:00",
    endDate: "2025-06-10",
    endTime: "10:30",
    status: "completed",
    online: false
  },
  {
    teacherId: '6857113b40e5204a1ebb9654', //Ravi Sharma
    studentId: '68570482546052c9ae126322',
    subject: ["Chemistry"],
    date: new Date("2025-06-25"),
    startDate: "2025-06-25",
    startTime: "17:00",
    // No endDate or endTime yet
    status: "ongoing",
    online: true
  },
  {
    teacherId: '6857113b40e5204a1ebb9657', //Neha Verma
    studentId: '68570482546052c9ae126323',
    subject: ["Biology"],
    date: new Date("2025-06-05"),
    startDate: "2025-06-05",
    endDate: "2025-06-05",
    startTime: "12:00",
    endTime: "13:00",
    status: "completed",
    online: false
  }
];