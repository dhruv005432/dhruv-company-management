import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-performance',
  templateUrl: './performance.component.html',
  styleUrls: ['./performance.component.css']
})
export class PerformanceComponent implements OnInit {
  performanceList: any[] = [];
  employees: string[] = [];
  editId: number | null = null;

  newReview = {
    employee: '',
    period: '',
    rating: 0,
    feedback: '',
    goals: ''
  };

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadPerformance();
    this.loadEmployees();
  }

  loadPerformance(): void {
    debugger;
    this.http.get<any[]>('http://localhost:3000/performance').subscribe(data => {
      this.performanceList = data;
      console.log('Performance Data:', data);
      localStorage.setItem('performance', JSON.stringify(data));
    });
  }

  loadEmployees(): void {
    this.http.get<any[]>('http://localhost:3000/employees').subscribe(data => {
      this.employees = data.map(emp => emp.name);
    });
  }

  addReview(): void {
    const review = {
      ...this.newReview,
      goals: this.newReview.goals.split(',').map(g => g.trim())
    };
    this.http.post('http://localhost:3000/performance', review).subscribe(() => {
      alert('Review added!');
      this.resetForm();
      this.loadPerformance();
    });
  }

  editReview(r: any): void {
    this.editId = r.id;
    this.newReview = {
      employee: r.employee,
      period: r.period,
      rating: r.rating,
      feedback: r.feedback,
      goals: r.goals.join(', ')
    };
  }

  updateReview(): void {
    if (this.editId !== null) {
      const updated = {
        ...this.newReview,
        goals: this.newReview.goals.split(',').map(g => g.trim())
      };
      this.http.put(`http://localhost:3000/performance/${this.editId}`, updated).subscribe(() => {
        alert('Review updated!');
        this.editId = null;
        this.resetForm();
        this.loadPerformance();
      });
    }
  }

  deleteReview(id: number): void {
    if (confirm('Delete review?')) {
      this.http.delete(`http://localhost:3000/performance/${id}`).subscribe(() => {
        alert('Deleted!');
        this.loadPerformance();
      });
    }
  }

  resetForm(): void {
    this.newReview = {
      employee: '',
      period: '',
      rating: 0,
      feedback: '',
      goals: ''
    };
  }
}
