import { useQuery } from '@tanstack/react-query';
import { fetchTeacherData } from '../utils/actions';
import { Teacher } from '../utils/types';
import { useState, useEffect } from "react"; 
import { getCurrentUser } from '../utils/actions';

export function useTeachers() {
  return useQuery<Teacher[]>({
    queryKey: ['teachers'],
    queryFn: fetchTeacherData,
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchOnWindowFocus: true,
    retry: 1,
  });
};


export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);
  
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
};

export const useCurrentUser = () => {
  return useQuery({
    queryKey: ['currentUser'],
    queryFn: getCurrentUser,
    retry: false,
  });
};


