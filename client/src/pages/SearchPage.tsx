import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { MapPin, Search, Filter, Check, X, Video, Users } from "lucide-react";
import TeacherCard from "../components/TeacherCard";
import { Teacher } from "../utils/types";
import TeacherCardSkeleton from "../components/CardSkeleton";
import { useTeachers, useDebounce } from "../hooks/customhooks";

const SearchPage: React.FC = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  // Filter states
  const [isOnline, setIsOnline] = useState(false);
  const [isInPerson, setIsInPerson] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [minRating, setMinRating] = useState(0);
  const [sortBy, setSortby] = useState<string>("Relevance");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const [subject, setSubject] = useState(queryParams.get("subject") || "");
  const [locationQuery, setLocationQuery] = useState(
    queryParams.get("location") || ""
  );

  const debouncedSubject = useDebounce(subject, 200);
  const debouncedLocation = useDebounce(locationQuery, 200);

  const { data: teachers = [], isLoading, isError } = useTeachers();  //fetching all teachers data

  const [filteredTeachers, setFilteredTeachers] = useState<Teacher[]>([]);
  const [noSortFilteredTeachers, setnoSortFilteredTeachers] = useState<Teacher[]>([]);
  const [isFiltering, setIsFiltering] = useState(true);

  useEffect(() => {
    if (teachers.length === 0) return;
    filterTeachers();
  }, [
    teachers,
    subject,
    locationQuery,
    isOnline,
    isInPerson,
    priceRange,
    minRating,
  ]);

  useEffect(() => {
    if (filteredTeachers.length === 0) return;

    if (sortBy === "Relevance") {
      setFilteredTeachers(noSortFilteredTeachers); // restore original order
      return;
    }

    let sortedTeachers = [...filteredTeachers];

    if (sortBy === "Rating: High to Low") {
      sortedTeachers.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === "Price: High to Low") {
      sortedTeachers.sort((a, b) => b.hourlyRate - a.hourlyRate);
    } else if (sortBy === "Price: Low to High") {
      sortedTeachers.sort((a, b) => a.hourlyRate - b.hourlyRate);
    }

    setFilteredTeachers(sortedTeachers);
  }, [sortBy]);

  const filterTeachers = () => {
    setIsFiltering(true);
    let results = [...teachers];

    // Filter by subject
    if (debouncedSubject) {
      results = results.filter((teacher) =>
        teacher.subjects.some((s) =>
          s.toLowerCase().includes(subject.toLowerCase())
        )
      );
    }

    // // Filter by location
    if (debouncedLocation) {
      results = results.filter((teacher) =>
        (teacher?.location ?? 'India').toLowerCase().includes(locationQuery.toLowerCase())
      );
    }

    // // Filter by lesson type
    if (isOnline && !isInPerson) {
      results = results.filter((teacher) => teacher.online);
    } else if (!isOnline && isInPerson) {
      results = results.filter((teacher) => teacher.inPerson);
    } else if (isOnline && isInPerson) {
      results = results.filter((teacher) => teacher.online && teacher.inPerson);
    }

    // // Filter by price range
    results = results.filter(
      (teacher) =>
        teacher.hourlyRate >= priceRange[0] &&
        teacher.hourlyRate <= priceRange[1]
    );

    // // Filter by rating
    if (minRating > 0) {
      results = results.filter((teacher) => teacher.rating >= minRating);
    }

    setFilteredTeachers(results);
    setnoSortFilteredTeachers(results);
    setIsFiltering(false);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    filterTeachers();
  };

  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
      {/* Search bar */}
      <div className="mb-8 rounded-xl bg-white p-4 shadow-sm">
        <form
          onSubmit={handleSearch}
          className="flex flex-col space-y-4 md:flex-row md:space-x-4 md:space-y-0"
        >
          <div className="flex flex-1 items-center rounded-lg border border-gray-300 px-3 py-2">
            <Search className="mr-2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="What do you want to learn?"
              className="w-full border-0 focus:outline-none focus:ring-0"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
          </div>

          <div className="flex flex-1 items-center rounded-lg border border-gray-300 px-3 py-2">
            <MapPin className="mr-2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Your location"
              className="w-full border-0 focus:outline-none focus:ring-0"
              value={locationQuery}
              onChange={(e) => setLocationQuery(e.target.value)}
            />
          </div>

          <button type="submit" className="btn-primary">
            Search
          </button>

          <button
            type="button"
            className="btn-outline flex items-center"
            onClick={toggleFilter}
          >
            <Filter className="mr-2 h-4 w-4" />
            Filters
          </button>
        </form>

        {/* Filters section */}
        {isFilterOpen && (
          <div className="mt-4 animate-slide-up border-t border-gray-200 pt-4">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
              {/* Lesson Type Filter */}
              <div>
                <h3 className="mb-2 font-medium text-gray-700">Lesson Type</h3>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                      checked={isOnline}
                      onChange={() => setIsOnline(!isOnline)}
                    />
                    <span className="ml-2 flex items-center text-sm text-gray-600">
                      <Video className="mr-1 h-4 w-4" /> Online
                    </span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                      checked={isInPerson}
                      onChange={() => setIsInPerson(!isInPerson)}
                    />
                    <span className="ml-2 flex items-center text-sm text-gray-600">
                      <Users className="mr-1 h-4 w-4" /> In-person
                    </span>
                  </label>
                </div>
              </div>

              {/* Price Range Filter */}
              <div>
                <h3 className="mb-2 font-medium text-gray-700">
                  Price Range (per hour)
                </h3>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">
                    ₹{priceRange[0]}
                  </span>
                  <input
                    type="range"
                    min="0"
                    max="1000"
                    value={priceRange[0]}
                    onChange={(e) =>
                      setPriceRange([parseInt(e.target.value), priceRange[1]])
                    }
                    className="h-2 w-full appearance-none rounded-full bg-gray-200 accent-primary-600"
                  />
                  <input
                    type="range"
                    min="0"
                    max="1000"
                    value={priceRange[1]}
                    onChange={(e) =>
                      setPriceRange([priceRange[0], parseInt(e.target.value)])
                    }
                    className="h-2 w-full appearance-none rounded-full bg-gray-200 accent-primary-600"
                  />
                  <span className="text-sm text-gray-600">
                    ₹{priceRange[1]}
                  </span>
                </div>
              </div>

              {/* Rating Filter */}
              <div>
                <h3 className="mb-2 font-medium text-gray-700">
                  Minimum Rating
                </h3>
                <select
                  value={minRating}
                  onChange={(e) => setMinRating(Number(e.target.value))}
                  className="input"
                >
                  <option value="0">Any Rating</option>
                  <option value="3">3+ Stars</option>
                  <option value="4">4+ Stars</option>
                  <option value="4.5">4.5+ Stars</option>
                </select>
              </div>

              {/* Clear Filters */}
              <div className="flex items-end">
                <button
                  type="button"
                  className="btn-outline text-sm"
                  onClick={() => {
                    setIsOnline(false);
                    setIsInPerson(false);
                    setPriceRange([0, 100]);
                    setMinRating(0);
                  }}
                >
                  <X className="mr-1 h-4 w-4" /> Clear Filters
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Search results */}
      <div>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">
            {filteredTeachers.length}{" "}
            {filteredTeachers.length === 1 ? "Tutor" : "Tutors"} Found
          </h2>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortby(String(e.target.value))}
              className="rounded-lg border border-gray-300 px-2 py-1 text-sm"
            >
              <option>Relevance</option>
              <option>Rating: High to Low</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
            </select>
          </div>
        </div>
        {isLoading ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <TeacherCardSkeleton key={i} />
            ))}
          </div>
        ) : isError ? (
          <div className="flex h-60 flex-col items-center justify-center rounded-lg bg-white p-8 text-center shadow-sm">
            <X className="mb-4 h-12 w-12 text-gray-400" />
            <h3 className="mb-2 text-xl font-semibold text-gray-900">
              No tutors found
            </h3>
            <p className="text-gray-600">Server Error.</p>
          </div>
        ) : isFiltering ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <TeacherCardSkeleton key={i} />
            ))}
          </div>
        ) : filteredTeachers.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredTeachers.map((teacher) => (
              <TeacherCard key={teacher._id} teacher={teacher} />
            ))}
          </div>
        ) : (
          <div className="flex h-60 flex-col items-center justify-center rounded-lg bg-white p-8 text-center shadow-sm">
            <X className="mb-4 h-12 w-12 text-gray-400" />
            <h3 className="mb-2 text-xl font-semibold text-gray-900">
              No tutors found
            </h3>
            <p className="text-gray-600">
              Try adjusting your search filters or try a different subject.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
