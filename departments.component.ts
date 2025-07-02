import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-departments',
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.css']
})
export class DepartmentsComponent implements OnInit {
  departments: any[] = [];
  newDepartment = { name: '', head: '', totalMembers: 0 };
  editId: number | null = null;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadDepartments();
  }

  loadDepartments(): void {
    debugger;
    this.http.get<any[]>('http://localhost:3000/departments').subscribe(data => {
      this.departments = data;
      localStorage.setItem('departments', JSON.stringify(data));
      console.log("Departments loaded:", data);
    });
  }

  addDepartment(): void {
    if (!this.newDepartment.name || !this.newDepartment.head) {
      alert("Please enter name and head of department.");
      return;
    }

    this.http.post('http://localhost:3000/departments', this.newDepartment).subscribe(() => {
      alert("Department added successfully!");
      this.newDepartment = { name: '', head: '', totalMembers: 0 };
      this.loadDepartments();
    });
  }

  editDepartment(dep: any): void {
    this.editId = dep.id;
    this.newDepartment = { ...dep };
  }

  updateDepartment(): void {
    if (this.editId !== null) {
      this.http.put(`http://localhost:3000/departments/${this.editId}`, this.newDepartment).subscribe(() => {
        alert("Department updated successfully!");
        this.newDepartment = { name: '', head: '', totalMembers: 0 };
        this.editId = null;
        this.loadDepartments();
      });
    }
  }

  deleteDepartment(id: number): void {
    if (confirm('Are you sure you want to delete this department?')) {
      this.http.delete(`http://localhost:3000/departments/${id}`).subscribe(() => {
        alert("Department deleted successfully!");
        this.loadDepartments();
      });
    }
  }
}
