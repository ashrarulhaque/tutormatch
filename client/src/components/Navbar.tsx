import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X, BookOpen, User } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isLoggedIn, logout } = useAuth();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="sticky top-0 z-40 border-b border-gray-200 bg-white/95 backdrop-blur-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <BookOpen className="h-8 w-8 text-primary-600" />
            <span className="text-xl font-bold text-gray-900">TutorMatch</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex md:items-center md:space-x-8">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "text-primary-600 font-medium"
                  : "text-gray-600 hover:text-primary-600"
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/search"
              className={({ isActive }) =>
                isActive
                  ? "text-primary-600 font-medium"
                  : "text-gray-600 hover:text-primary-600"
              }
            >
              Find Tutors
            </NavLink>

            {isLoggedIn && (
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  isActive
                    ? "text-primary-600 font-medium"
                    : "text-gray-600 hover:text-primary-600"
                }
              >
                Dashboard
              </NavLink>
            )}
          </nav>

          {/* Authentication Buttons */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            {isLoggedIn ? (
              <div className="md:flex md:gap-4 md:items-center">
                <Link
                  to="/dashboard"
                  className="text-sm font-medium text-gray-700 hover:text-primary-600 flex gap-1"
                >
                  <User className="h-5 w-5" />
                  My Account
                </Link>
                <button onClick={logout} className="btn-primary">
                  Log Out
                </button>
              </div>
            ) : (
              <div className="md:flex md:gap-4 md:items-center">
                <Link
                  to="/login"
                  className="text-sm font-medium text-gray-700 hover:text-primary-600"
                >
                  Log in
                </Link>
                <Link to="/register" className="btn-primary">
                  Sign up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md p-2 text-gray-700 hover:bg-gray-100"
              onClick={toggleMenu}
            >
              <span className="sr-only">Open menu</span>
              {isMenuOpen ? (
                <X className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="space-y-1 px-4 pb-3 pt-2 sm:px-3">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `block rounded-md px-3 py-2 text-base font-medium ${
                  isActive
                    ? "bg-primary-50 text-primary-600"
                    : "text-gray-700 hover:bg-gray-50 hover:text-primary-600"
                }`
              }
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </NavLink>
            <NavLink
              to="/search"
              className={({ isActive }) =>
                `block rounded-md px-3 py-2 text-base font-medium ${
                  isActive
                    ? "bg-primary-50 text-primary-600"
                    : "text-gray-700 hover:bg-gray-50 hover:text-primary-600"
                }`
              }
              onClick={() => setIsMenuOpen(false)}
            >
              Find Tutors
            </NavLink>

            {isLoggedIn ? (
              <div className="mt-4 space-y-2">
                <NavLink
                  to="/dashboard"
                  className={({ isActive }) =>
                    `block rounded-md px-3 py-2 text-base font-medium ${
                      isActive
                        ? "bg-primary-50 text-primary-600"
                        : "text-gray-700 hover:bg-gray-50 hover:text-primary-600"
                    }`
                  }
                  onClick={() => setIsMenuOpen(false)}
                >
                  Dashboard
                </NavLink>
                <Link
                  to="/dashboard"
                  className="block w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-center text-base font-medium text-gray-700 hover:bg-gray-100"
                  onClick={() => setIsMenuOpen(false)}
                >
                  My Account
                </Link>
                <button
                  className="block w-full rounded-lg bg-primary-600 px-3 py-2 text-center text-base font-medium text-white hover:bg-primary-700"
                  onClick={() => {
                    logout();
                    setIsMenuOpen(false);
                  }}
                >
                  Log Out
                </button>
              </div>
            ) : (
              <div className="mt-4 space-y-2">
                <Link
                  to="/login"
                  className="block w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-center text-base font-medium text-gray-700 hover:bg-gray-50"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Log in
                </Link>
                <Link
                  to="/register"
                  className="block w-full rounded-lg bg-primary-600 px-3 py-2 text-center text-base font-medium text-white hover:bg-primary-700"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
