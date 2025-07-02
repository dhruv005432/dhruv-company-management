import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.css']
})
export class AttendanceComponent implements OnInit {
  attendanceList: any[] = [];
  leaveList: any[] = [];
  employees: string[] = [];
  today: string = new Date().toISOString().split('T')[0];

  newLeave = {
    employee: '',
    from: '',
    to: '',
    reason: '',
    status: 'Pending'
  };

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadAttendance();
    this.loadLeaves();
    this.loadEmployees();
  }

  loadAttendance(): void {
    this.http.get<any[]>('http://localhost:3000/attendance').subscribe(data => {
      debugger;
      this.attendanceList = data;
      console.log("Attendance Loaded", data);
      localStorage.setItem('attendance', JSON.stringify(data));
    });
  }

  loadLeaves(): void {
    this.http.get<any[]>('http://localhost:3000/leaves').subscribe(data => {
      this.leaveList = data;
      localStorage.setItem('leaves', JSON.stringify(data));
    });
  }

  loadEmployees(): void {
    this.http.get<any[]>('http://localhost:3000/employees').subscribe(data => {
      this.employees = data.map(emp => emp.name);
    });
  }

  markAttendance(employee: string, status: string): void {
    const record = {
      employee,
      date: this.today,
      status
    };
    this.http.post('http://localhost:3000/attendance', record).subscribe(() => {
      alert(`Marked ${employee} as ${status}`);
      this.loadAttendance();
    });
  }

  applyLeave(): void {
    this.http.post('http://localhost:3000/leaves', this.newLeave).subscribe(() => {
      alert('Leave Applied!');
      this.newLeave = {
        employee: '',
        from: '',
        to: '',
        reason: '',
        status: 'Pending'
      };
      this.loadLeaves();
    });
  }

  updateLeaveStatus(id: number, status: string): void {
    const leave = this.leaveList.find(l => l.id === id);
    if (leave) {
      const updated = { ...leave, status };
      this.http.put(`http://localhost:3000/leaves/${id}`, updated).subscribe(() => {
        alert(`Leave ${status}`);
        this.loadLeaves();
      });
    }
  }
}
