import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {
  employees: any[] = [];
  departments: string[] = [];
  filteredEmployees: any[] = [];

  searchText = '';
  selectedDepartment = '';
  newEmployee = {
    name: '',
    email: '',
    department: '',
    position: '',
    profilePic: ''
  };

  editId: number | null = null;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadEmployees();
    this.loadDepartments();
  }

  loadEmployees(): void {
    this.http.get<any[]>('http://localhost:3000/employees').subscribe(data => {
      this.employees = data;
      this.filteredEmployees = data;
      localStorage.setItem('employees', JSON.stringify(data));
      console.log('Employees:', data);
    });
  }

  loadDepartments(): void {
    this.http.get<any[]>('http://localhost:3000/departments').subscribe(data => {
      this.departments = data.map(dep => dep.name);
      console.log('Departments:', this.departments);
    });
  }

  filterEmployees(): void {
    this.filteredEmployees = this.employees.filter(emp =>
      (this.searchText ? emp.name.toLowerCase().includes(this.searchText.toLowerCase()) : true) &&
      (this.selectedDepartment ? emp.department === this.selectedDepartment : true)
    );
  }

  addEmployee(): void {
    debugger;
    if (!this.newEmployee.name || !this.newEmployee.email) {
      alert("Name and Email are required.");
      return;
    }
    this.http.post('http://localhost:3000/employees', this.newEmployee).subscribe(() => {
      alert('Employee added!');
      this.newEmployee = { name: '', email: '', department: '', position: '', profilePic: '' };
      this.loadEmployees();
    });
  }

  editEmployee(emp: any): void {
    this.editId = emp.id;
    this.newEmployee = { ...emp };
  }

  updateEmployee(): void {
    if (this.editId !== null) {
      this.http.put(`http://localhost:3000/employees/${this.editId}`, this.newEmployee).subscribe(() => {
        alert('Employee updated!');
        this.editId = null;
        this.newEmployee = { name: '', email: '', department: '', position: '', profilePic: '' };
        this.loadEmployees();
      });
    }
  }

  deleteEmployee(id: number): void {
    if (confirm('Are you sure you want to delete this employee?')) {
      this.http.delete(`http://localhost:3000/employees/${id}`).subscribe(() => {
        alert('Employee deleted!');
        this.loadEmployees();
      });
    }
  }

  onImageUpload(event: any): void {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.newEmployee.profilePic = reader.result as string;
    };
    reader.readAsDataURL(file);
  }
}
