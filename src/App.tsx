import { useState } from "react";
import SchoolCatalog from "./SchoolCatalog";
import ClassSchedule from "./ClassSchedule";
import Header from "./Header";
import { EnrollmentContext } from "./EnrollmentContext";
import type { Course } from "./Course";

export default function App() {
  const [enrolledCourses, setEnrolledCourses] = useState<Course[]>([]);

  function enrollCourse(course: Course) {
    setEnrolledCourses((prev) => {
      if (prev.some((c) => c.courseNumber === course.courseNumber)) {
        return prev;
      }
      return [...prev, course];
    });
  }

  function dropCourse(courseNumber: string) {
    setEnrolledCourses((prev) =>
      prev.filter((c) => c.courseNumber !== courseNumber)
    );
  }

  return (
  <EnrollmentContext.Provider
    value={{ enrolledCourses, enrollCourse, dropCourse }}
  >
    <div className="app-layout">
      <Header />
      <div className="main-content">
        <SchoolCatalog />
        <ClassSchedule />
      </div>
    </div>
  </EnrollmentContext.Provider>
);
}
