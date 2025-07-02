import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-payroll',
  templateUrl: './payroll.component.html',
  styleUrls: ['./payroll.component.css']
})
export class PayrollComponent implements OnInit {
  payrolls: any[] = [];
  employees: string[] = [];
  editId: number | null = null;

  newPayroll = {
    employee: '',
    month: '',
    year: new Date().getFullYear(),
    basic: 0,
    hra: 0,
    bonus: 0,
    deductions: 0,
    netPay: 0
  };

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadPayrolls();
    this.loadEmployees();
  }

  loadPayrolls(): void {
    debugger;
    this.http.get<any[]>('http://localhost:3000/payroll').subscribe(data => {
      this.payrolls = data;
      console.log("Payrolls:", data);
      localStorage.setItem('payrolls', JSON.stringify(data));
    });
  }

  loadEmployees(): void {
    this.http.get<any[]>('http://localhost:3000/employees').subscribe(data => {
      this.employees = data.map(emp => emp.name);
    });
  }

  calculateNetPay(): void {
    this.newPayroll.netPay =
      this.newPayroll.basic + this.newPayroll.hra + this.newPayroll.bonus - this.newPayroll.deductions;
  }

  addPayroll(): void {
    this.calculateNetPay();
    this.http.post('http://localhost:3000/payroll', this.newPayroll).subscribe(() => {
      alert('Payroll added!');
      this.resetForm();
      this.loadPayrolls();
    });
  }

  editPayroll(p: any): void {
    this.editId = p.id;
    this.newPayroll = { ...p };
  }

  updatePayroll(): void {
    this.calculateNetPay();
    if (this.editId !== null) {
      this.http.put(`http://localhost:3000/payroll/${this.editId}`, this.newPayroll).subscribe(() => {
        alert('Payroll updated!');
        this.editId = null;
        this.resetForm();
        this.loadPayrolls();
      });
    }
  }

  deletePayroll(id: number): void {
    if (confirm('Delete payroll record?')) {
      this.http.delete(`http://localhost:3000/payroll/${id}`).subscribe(() => {
        alert('Deleted');
        this.loadPayrolls();
      });
    }
  }

  downloadPayslip(payroll: any): void {
    const content = `
      Payslip for ${payroll.employee}
      Month: ${payroll.month} ${payroll.year}
      Basic: ₹${payroll.basic}
      HRA: ₹${payroll.hra}
      Bonus: ₹${payroll.bonus}
      Deductions: ₹${payroll.deductions}
      ---------------------------
      Net Pay: ₹${payroll.netPay}
    `;
    const blob = new Blob([content], { type: 'text/plain' });
    const link = document.createElement('a');
    link.download = `${payroll.employee}_Payslip.txt`;
    link.href = URL.createObjectURL(blob);
    link.click();
  }

  resetForm(): void {
    this.newPayroll = {
      employee: '',
      month: '',
      year: new Date().getFullYear(),
      basic: 0,
      hra: 0,
      bonus: 0,
      deductions: 0,
      netPay: 0
    };
  }
}
