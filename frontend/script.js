const API_URL = "http://localhost:8080/api/employees";

async function saveEmployee() {
    const name = document.getElementById("name").value;
    const status = document.getElementById("status").value;

    if (!name) {
        alert("Please enter employee name");
        return;
    }

    const employee = {
        name: name,
        status: status
    };

    await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(employee)
    });

    document.getElementById("name").value = "";
    loadEmployees();
}

async function loadEmployees() {
    const response = await fetch(API_URL);
    const employees = await response.json();

    const tableBody = document.getElementById("tableBody");
    tableBody.innerHTML = "";

    employees.forEach(emp => {
        tableBody.innerHTML += `
            <tr>
                <td>${emp.id}</td>
                <td>${emp.name}</td>
                <td>${emp.status}</td>
            </tr>
        `;
    });
}

loadEmployees();
