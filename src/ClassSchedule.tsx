import { useContext } from "react";
import { EnrollmentContext } from "./EnrollmentContext";

export default function ClassSchedule() {
  const enrollment = useContext(EnrollmentContext);

  if (!enrollment) {
    throw new Error(
      "ClassSchedule must be used within EnrollmentContext.Provider"
    );
  }

  const { enrolledCourses, dropCourse } = enrollment;

  return (
    <div className="class-schedule">
      <h2>Class Schedule</h2>

      {enrolledCourses.length === 0 ? (
        <p>No courses enrolled.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Course Number</th>
              <th>Course Name</th>
              <th>Credits</th>
              <th>Drop</th>
            </tr>
          </thead>
          <tbody>
            {enrolledCourses.map((course) => (
              <tr key={course.courseNumber}>
                <td>{course.courseNumber}</td>
                <td>{course.courseName}</td>
                <td>{course.semesterCredits}</td>
                <td>
                  <button
                    onClick={() => dropCourse(course.courseNumber)}
                  >
                    Drop
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
