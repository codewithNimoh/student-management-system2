let students = [
  { id: 1, name: "Mary Wanjiku", age: 21, gender: "Female", course: "Software Development", marks: 85 },
  { id: 2, name: "John Kamau", age: 23, gender: "Male", course: "Software Development", marks: 65 }
];

function updateDashboard() {
  const totalBox = document.getElementById("totalStudents");
  totalBox.textContent = students.length;
}

updateDashboard();
const studentForm = document.getElementById("studentForm");
const formMessage = document.getElementById("formMessage");

studentForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const name = document.getElementById("fullName").value.trim();
  const age = document.getElementById("age").value.trim();
  const gender = document.getElementById("gender").value;
  const course = document.getElementById("course").value;
  const marks = document.getElementById("marks").value.trim();

  if (name === "" || age === "" || gender === "" || course === "" || marks === "") {
    formMessage.textContent = "Error: Please fill in all the fields.";
    formMessage.className = "error";
    return;
  }

  const ageNumber = Number(age);
if (isNaN(ageNumber) || ageNumber < 1 || ageNumber > 100) {
  formMessage.textContent = "Error: Age must be a valid number (1 - 100).";
  formMessage.className = "error";
  return;
}

const marksNumber = Number(marks);
if (isNaN(marksNumber) || marksNumber < 0 || marksNumber > 100) {
  formMessage.textContent = "Error: Marks must be a number between 0 and 100.";
  formMessage.className = "error";
  return;
}

const newStudent = {
  id: Date.now(),
  name: name,
  age: ageNumber,
  gender: gender,
  course: course,
  marks: marksNumber
};

students.push(newStudent);
updateDashboard();
function getPerformance(marks) {
  if (marks >= 80) {
    return "Excellent";
  } else if (marks >= 70) {
    return "Very Good";
  } else if (marks >= 60) {
    return "Good";
  } else if (marks >= 50) {
    return "Average";
  } else {
    return "Failed";
  }
}

function displayStudents(students) {
  const tableBody = document.getElementById("recordsBody");
  const note = document.getElementById("recordsNote");

  tableBody.innerHTML = "";

  if (students.length === 0) {
    note.textContent = "No students registered yet.";
    return;
  }

  note.textContent = "";

  for (let i = 0; i < students.length; i++) {
    const student = students[i];
    const performance = getPerformance(student.marks);
    const colourClass = performance.toLowerCase().replace(" ", "-");

    tableBody.innerHTML +=
      "<tr>" +
        "<td>" + (i + 1) + "</td>" +
        "<td>" + student.name + "</td>" +
        "<td>" + student.age + "</td>" +
        "<td>" + student.gender + "</td>" +
        "<td>" + student.course + "</td>" +
        "<td>" + student.marks + "</td>" +
        '<td class="' + colourClass + '">' + performance + "</td>" +
      "</tr>";
  }
}

formMessage.textContent = "Success: " + name + " has been registered.";
formMessage.className = "success";
studentForm.reset();
});
function updateDashboard() {
  let passed = 0;
  let failed = 0;
  let totalMarks = 0;

  for (let i = 0; i < students.length; i++) {
    totalMarks = totalMarks + students[i].marks;

    if (students[i].marks >= 50) {
      passed = passed + 1;
    } else {
      failed = failed + 1;
    }
  }

  let average = 0;
  if (students.length > 0) {
    average = totalMarks / students.length;
  }

  document.getElementById("totalStudents").textContent = students.length;
  document.getElementById("passedStudents").textContent = passed;
  document.getElementById("failedStudents").textContent = failed;
  document.getElementById("averageMarks").textContent = average.toFixed(1);
}
function searchStudents() {
  const searchText = document.getElementById("searchBox").value.trim().toLowerCase();
  const matches = [];

  for (let i = 0; i < students.length; i++) {
    if (students[i].name.toLowerCase().includes(searchText)) {
      matches.push(students[i]);
    }
  }

  displayStudents(matches);
}

document.getElementById("searchBtn").addEventListener("click", searchStudents);

document.getElementById("showAllBtn").addEventListener("click", function () {
  document.getElementById("searchBox").value = "";
  displayStudents(students);
});