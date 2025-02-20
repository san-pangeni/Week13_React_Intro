// src/api.ts

export type Student = {
    id?: number; 
    name: string;
    gpa: number;
  };
  
  const API_URL = "http://localhost:3000/students";
  
  export async function fetchStudents(): Promise<Student[]> {
    const response = await fetch(API_URL);
    return await response.json();
  }
  
  export async function createStudent(student: Student): Promise<Student> {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(student),
    });
    if (!response.ok) {
      throw new Error("Failed to create student");
    }
    return await response.json();
  }
  
  export async function removeStudent(id: number): Promise<void> {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error(`Failed to delete student with id ${id}`);
    }
  }
  