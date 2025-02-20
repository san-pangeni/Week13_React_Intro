// src/ui.ts

import { Student, removeStudent } from "./api";

export function renderStudents(students: Student[]): void {
  const cardContainer = document.querySelector("#cardsContainer") as HTMLDivElement;
  cardContainer.innerHTML = ""; 

  students.forEach((student) => {
    const card = document.createElement("div");
    card.classList.add("col-md-4", "mb-4");
    card.innerHTML = `
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">${student.name}</h5>
          <p class="card-text">GPA: ${student.gpa}</p>
          <button type="button" class="btn btn-danger" data-id="${student.id}">Delete</button>
        </div>
      </div>
    `;

    const deleteButton = card.querySelector(".btn-danger") as HTMLButtonElement;
    deleteButton.addEventListener("click", async () => {
      if (student.id !== undefined) {
        await removeStudent(student.id);
        card.remove(); 
      }
    });

    cardContainer.appendChild(card);
  });
}
