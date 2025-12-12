import { useContext } from "react";
import { EnrollmentContext } from "./EnrollmentContext";

export default function Header() {
  const enrollment = useContext(EnrollmentContext);

  if (!enrollment) {
    return null;
  }

  return (
    <>
      {/* Centered title */}
      <h1 className="app-title">Atlas School</h1>

      {/* Floating counter */}
      <div className="enroll-counter">
        Enrolled Courses: {enrollment.enrolledCourses.length}
      </div>
    </>
  );
}
