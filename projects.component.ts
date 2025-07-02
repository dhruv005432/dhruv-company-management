import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
  projects: any[] = [];
  departments: string[] = [];
  employees: string[] = [];
  statuses = ['Ongoing', 'Completed', 'Delayed'];
  editId: number | null = null;

  newProject = {
    title: '',
    department: '',
    assignedEmployees: [] as string[],
    status: 'Ongoing'
  };

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadProjects();
    this.loadDepartments();
    this.loadEmployees();
  }

  loadProjects(): void {
    debugger;
    this.http.get<any[]>('http://localhost:3000/projects').subscribe(data => {
      this.projects = data;
      localStorage.setItem('projects', JSON.stringify(data));
      console.log("Projects:", data);
    });
  }

  loadDepartments(): void {
    this.http.get<any[]>('http://localhost:3000/departments').subscribe(data => {
      this.departments = data.map(dep => dep.name);
    });
  }

  loadEmployees(): void {
    this.http.get<any[]>('http://localhost:3000/employees').subscribe(data => {
      this.employees = data.map(emp => emp.name);
    });
  }

  addProject(): void {
    if (!this.newProject.title || !this.newProject.department) {
      alert("Project Title & Department are required.");
      return;
    }

    this.http.post('http://localhost:3000/projects', this.newProject).subscribe(() => {
      alert("Project added!");
      this.resetForm();
      this.loadProjects();
    });
  }

  editProject(project: any): void {
    this.editId = project.id;
    this.newProject = { ...project };
  }

  updateProject(): void {
    if (this.editId !== null) {
      this.http.put(`http://localhost:3000/projects/${this.editId}`, this.newProject).subscribe(() => {
        alert("Project updated!");
        this.editId = null;
        this.resetForm();
        this.loadProjects();
      });
    }
  }

  deleteProject(id: number): void {
    if (confirm('Delete this project?')) {
      this.http.delete(`http://localhost:3000/projects/${id}`).subscribe(() => {
        alert("Project deleted.");
        this.loadProjects();
      });
    }
  }

  resetForm(): void {
    this.newProject = { title: '', department: '', assignedEmployees: [], status: 'Ongoing' };
  }

  toggleEmployee(name: string): void {
    const idx = this.newProject.assignedEmployees.indexOf(name);
    if (idx > -1) {
      this.newProject.assignedEmployees.splice(idx, 1);
    } else {
      this.newProject.assignedEmployees.push(name);
    }
  }
}
