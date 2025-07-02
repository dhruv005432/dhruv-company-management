import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-faqs',
  templateUrl: './faqs.component.html',
  styleUrls: ['./faqs.component.css']
})
export class FaqsComponent implements OnInit {
  faqs: any[] = [];
  activeIndex: number | null = null;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    debugger;
    this.http.get<any[]>('http://localhost:3000/faqs').subscribe(data => {
      this.faqs = data;
      console.log("FAQs:", JSON.stringify(this.faqs));
      localStorage.setItem("faqData", JSON.stringify(this.faqs));
      alert("✅ FAQs loaded successfully");
    });
  }

  toggle(index: number) {
    this.activeIndex = this.activeIndex === index ? null : index;
  }
}
