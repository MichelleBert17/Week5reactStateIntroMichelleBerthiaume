import { createContext } from "react";
import type { Course } from "./Course";

interface EnrollmentContextType {
  enrolledCourses: Course[];
  enrollCourse: (course: Course) => void;
  dropCourse: (courseNumber: string) => void;
}

export const EnrollmentContext =
  createContext<EnrollmentContextType | null>(null);
