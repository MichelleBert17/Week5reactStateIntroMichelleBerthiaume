import { useEffect, useState, useContext } from "react";
import { EnrollmentContext } from "./EnrollmentContext";
import type { Course } from "./Course";

export default function SchoolCatalog() {
  
  const enrollment = useContext(EnrollmentContext);

  if (!enrollment) {
    throw new Error(
      "SchoolCatalog must be used within EnrollmentContext.Provider"
    );
  }

  const { enrollCourse, enrolledCourses } = enrollment;

  
  const [courses, setCourses] = useState<Course[]>([]);
  const [searchText, setSearchText] = useState("");
  const [sortColumn, setSortColumn] = useState<keyof Course | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [currentPage, setCurrentPage] = useState(0);

  const PAGE_SIZE = 5;

 
  useEffect(() => {
    fetch("/api/courses.json")
      .then((response) => response.json())
      .then((data: Course[]) => {
        setCourses(data);
      });
  }, []);

  
  const filteredCourses = courses.filter((course) => {
    const search = searchText.toLowerCase();
    return (
      course.courseNumber.toLowerCase().includes(search) ||
      course.courseName.toLowerCase().includes(search)
    );
  });

 
  const sortedCourses = [...filteredCourses].sort((a, b) => {
    if (!sortColumn) return 0;

    const aValue = a[sortColumn];
    const bValue = b[sortColumn];

    if (typeof aValue === "number" && typeof bValue === "number") {
      return sortDirection === "asc"
        ? aValue - bValue
        : bValue - aValue;
    }

    return sortDirection === "asc"
      ? String(aValue).localeCompare(String(bValue))
      : String(bValue).localeCompare(String(aValue));
  });

  
  const totalPages = Math.ceil(sortedCourses.length / PAGE_SIZE);

  const pagedCourses = sortedCourses.slice(
    currentPage * PAGE_SIZE,
    currentPage * PAGE_SIZE + PAGE_SIZE
  );

 
  function handleSort(column: keyof Course) {
    setCurrentPage(0);

    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  }

 
  return (
    <div className="school-catalog">
      <h1>School Catalog</h1>

      {/* Search input */}
      <input
        type="text"
        placeholder="Search"
        value={searchText}
        onChange={(e) => {
          setSearchText(e.target.value);
          setCurrentPage(0);
        }}
      />

      <table>
        <thead>
          <tr>
            <th onClick={() => handleSort("trimester")}>Trimester</th>
            <th onClick={() => handleSort("courseNumber")}>Course Number</th>
            <th onClick={() => handleSort("courseName")}>Course Name</th>
            <th onClick={() => handleSort("semesterCredits")}>
              Semester Credits
            </th>
            <th onClick={() => handleSort("prerequisites")}>Prerequisites</th>
            <th>Enroll</th>
          </tr>
        </thead>

        <tbody>
          {pagedCourses.map((course) => {
            const isEnrolled = enrolledCourses.some(
              (c) => c.courseNumber === course.courseNumber
            );

            return (
              <tr key={course.courseNumber}>
                <td>{course.trimester}</td>
                <td>{course.courseNumber}</td>
                <td>{course.courseName}</td>
                <td>{course.semesterCredits}</td>
                <td>{course.prerequisites}</td>
                <td>
                  <button
                    onClick={() => enrollCourse(course)}
                    disabled={isEnrolled}
                  >
                    {isEnrolled ? "Enrolled" : "Enroll"}
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="pagination">
        <button
          onClick={() => setCurrentPage((p) => p - 1)}
          disabled={currentPage === 0}
        >
          Previous
        </button>

        <span>
          Page {currentPage + 1} of {totalPages || 1}
        </span>

        <button
          onClick={() => setCurrentPage((p) => p + 1)}
          disabled={currentPage >= totalPages - 1}
        >
          Next
        </button>
      </div>
    </div>
  );
}
