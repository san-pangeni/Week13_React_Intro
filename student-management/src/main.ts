// src/main.ts

// Optional: If you prefer to import Bootstrap via JS, install it via npm and uncomment the following:
// import "bootstrap/dist/css/bootstrap.min.css";

import { fetchStudents, createStudent, Student } from "./api";
import { renderStudents } from "./ui";

async function loadStudents(): Promise<void> {
  try {
    const students = await fetchStudents();
    renderStudents(students);
  } catch (error) {
    console.error("Error loading students:", error);
  }
}

const studentForm = document.querySelector("#studentForm") as HTMLFormElement;
studentForm.addEventListener("submit", async (event: Event) => {
  event.preventDefault();
  const nameInput = document.querySelector("#name") as HTMLInputElement;
  const gpaInput = document.querySelector("#gpa") as HTMLInputElement;

  const name = nameInput.value;
  const gpa = parseFloat(gpaInput.value);

  if (!name || isNaN(gpa)) {
    console.error("Invalid input");
    return;
  }

  try {
    const newStudent: Student = { name, gpa };
    await createStudent(newStudent);
    await loadStudents();
    studentForm.reset();
  } catch (error) {
    console.error("Error adding student:", error);
  }
});

// Load students on page load
loadStudents();
