import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  CheckCircle2,
  UserCog,
  BookOpen,
} from "lucide-react";
import { useAuth } from "../contexts/AuthContext";


const RegisterPage: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");
  const [subjects, setSubjects] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [accountType, setAccountType] = useState<"Student" | "Teacher">(
    "Student"
  );

  const {signup} = useAuth();
  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await signup({name, email, password, gender, subjects:[subjects], role: accountType});
    setName("");
    setPassword("");
    setEmail("");
    setGender("");
    setSubjects("");
  };

  return (
    <div className="mx-auto max-w-md px-4 py-12 sm:px-6 sm:py-8 lg:px-8">
      <BookOpen className="h-20 w-20 text-primary-600 mx-auto" />
      <div className="rounded-xl bg-white p-8 shadow-sm">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">
            Create your account
          </h1>
          <p className="mt-2 text-gray-600">
            Join TutorMatch to connect with tutors and students
          </p>
        </div>

        <div className="mt-6">
          <div className="flex rounded-lg bg-gray-100 p-1">
            <button
              type="button"
              className={`flex-1 rounded-md py-2 text-sm font-medium ${
                accountType === "Student"
                  ? "bg-white shadow-sm text-gray-900"
                  : "text-gray-500 hover:text-gray-900"
              }`}
              onClick={() => setAccountType("Student")}
            >
              I'm a Student
            </button>
            <button
              type="button"
              className={`flex-1 rounded-md py-2 text-sm font-medium ${
                accountType === "Teacher"
                  ? "bg-white shadow-sm text-gray-900"
                  : "text-gray-500 hover:text-gray-900"
              }`}
              onClick={() => setAccountType("Teacher")}
            >
              I'm a Teacher
            </button>
          </div>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleRegister}>
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Full name
            </label>
            <div className="relative mt-1">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <User className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                required
                className="input pl-10"
                placeholder="Ashrarul Haque"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email address
            </label>
            <div className="relative mt-1">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="input pl-10"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="gender"
              className="block text-sm font-medium text-gray-700"
            >
              Gender
            </label>
            <div className="relative mt-1">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <UserCog className="h-5 w-5 text-gray-400" />
              </div>
              <select
                name="gender"
                id="gender"
                className={`input pl-10 ${gender === '' ? 'text-gray-400' : 'text-black'}`}
                required
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <option value="" disabled hidden>
                  Select Gender
                </option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Prefer not to say">Prefer not to say</option>
              </select>
            </div>
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <div className="relative mt-1">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
                required
                className="input pl-10 pr-10"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                <button
                  type="button"
                  className="text-gray-400 hover:text-gray-500 focus:outline-none"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>
          </div>
          <div>
            {accountType === "Student" && (
              <label
                htmlFor="subjects"
                className="block text-sm font-medium text-gray-700"
              >
                Which subjects are you looking to learn?
              </label>
            )}
            {accountType === "Teacher" && (
              <label
                htmlFor="subjects"
                className="block text-sm font-medium text-gray-700"
              >
                What subjects do you teach?
              </label>
            )}
            <div className="mt-1">
              <input
                id="subjects"
                name="subjects"
                type="text"
                className="input"
                placeholder="e.g. Mathematics, Physics, English"
                value={subjects}
                onChange={(e) => setSubjects(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-start">
              <div className="flex h-5 items-center">
                <input
                  id="terms"
                  name="terms"
                  type="checkbox"
                  required
                  className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="terms" className="text-gray-600">
                  I agree to the{" "}
                  <a
                    href="#"
                    className="font-medium text-primary-600 hover:text-primary-500"
                  >
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a
                    href="#"
                    className="font-medium text-primary-600 hover:text-primary-500"
                  >
                    Privacy Policy
                  </a>
                </label>
              </div>
            </div>

            {accountType === "Teacher" && (
              <div className="flex items-start">
                <div className="flex h-5 items-center">
                  <input
                    id="background-check"
                    name="background-check"
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="background-check" className="text-gray-600">
                    I agree to undergo a background check (recommended for
                    teachers)
                  </label>
                </div>
              </div>
            )}
          </div>

          <div>
            <button type="submit" className="btn-primary w-full">
              Create account
            </button>
          </div>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-2 text-gray-500">
                Or continue with
              </span>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3">
            <button
              type="button"
              className="btn-outline flex items-center justify-center"
            >
              <svg
                className="h-5 w-5"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M12.0003 4.75C13.7703 4.75 15.3553 5.36002 16.6053 6.54998L20.0303 3.125C17.9502 1.19 15.2353 0 12.0003 0C7.31028 0 3.25527 2.69 1.28027 6.60998L5.27028 9.70498C6.21525 6.86002 8.87028 4.75 12.0003 4.75Z"
                  fill="#EA4335"
                />
                <path
                  d="M23.49 12.275C23.49 11.49 23.415 10.73 23.3 10H12V14.51H18.47C18.18 15.99 17.34 17.25 16.08 18.1L19.945 21.1C22.2 19.01 23.49 15.92 23.49 12.275Z"
                  fill="#4285F4"
                />
                <path
                  d="M5.26498 14.2949C5.02498 13.5699 4.88501 12.7999 4.88501 11.9999C4.88501 11.1999 5.01998 10.4299 5.26498 9.7049L1.275 6.60986C0.46 8.22986 0 10.0599 0 11.9999C0 13.9399 0.46 15.7699 1.28 17.3899L5.26498 14.2949Z"
                  fill="#FBBC05"
                />
                <path
                  d="M12.0004 24.0001C15.2404 24.0001 17.9654 22.935 19.9454 21.095L16.0804 18.095C15.0054 18.82 13.6204 19.245 12.0004 19.245C8.8704 19.245 6.21537 17.135 5.2654 14.29L1.27539 17.385C3.25539 21.31 7.3104 24.0001 12.0004 24.0001Z"
                  fill="#34A853"
                />
              </svg>
              <span className="ml-2">Google</span>
            </button>

            <button
              type="button"
              className="btn-outline flex items-center justify-center"
            >
              <svg
                className="h-5 w-5"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"
                  fill="#1877F2"
                />
              </svg>
              <span className="ml-2">Facebook</span>
            </button>
          </div>
        </div>

        <p className="mt-8 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-medium text-primary-600 hover:text-primary-500"
          >
            Sign in
          </Link>
        </p>

        {accountType === "Student" && (
          <div className="mt-6 rounded-lg bg-green-50 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <CheckCircle2 className="h-5 w-5 text-green-600" />
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-green-800">
                  Benefits for Students
                </h3>
                <div className="mt-2 text-sm text-green-700">
                  <ul className="list-disc space-y-1 pl-5">
                    <li>Search Tutors Near You or Online</li>
                    <li>Watch Demo Classes Before Committing</li>
                    <li>Filter Tutors Based on Your Needs</li>
                    <li>View Detailed Teacher Profiles</li>
                    <li>Secure Booking & Feedback System</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {accountType === "Teacher" && (
          <div className="mt-6 rounded-lg bg-green-50 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <CheckCircle2 className="h-5 w-5 text-green-600" />
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-green-800">
                  Benefits of being a teacher
                </h3>
                <div className="mt-2 text-sm text-green-700">
                  <ul className="list-disc space-y-1 pl-5">
                    <li>Set your own hourly rate and availability</li>
                    <li>
                      Connect with students interested in your subject expertise
                    </li>
                    <li>Build your teaching portfolio and receive reviews</li>
                    <li>Teach Online or In-Person, Your Choice</li>
                    <li>Get paid securely through our platform</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RegisterPage;
