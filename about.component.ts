import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  aboutInfo: any;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    debugger;
    this.http.get<any>('http://localhost:3000/about').subscribe(data => {
      this.aboutInfo = data;
      console.log("About Info:", JSON.stringify(this.aboutInfo));
      localStorage.setItem("aboutData", JSON.stringify(this.aboutInfo));
      alert("✅ About data loaded successfully");
    });
  }
}
