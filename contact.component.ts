import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  contactForm = {
    name: '',
    email: '',
    message: '',
    type: 'Support'
  };

  constructor(private http: HttpClient) {}

  submitContactForm() {
    debugger;

    const contactPayload = JSON.stringify(this.contactForm);
    console.log("Contact Form Data:", contactPayload);

    localStorage.setItem("lastContact", contactPayload);

    this.http.post('http://localhost:3000/contacts', this.contactForm).subscribe(() => {
      alert("✅ Message sent successfully!");
      this.contactForm = { name: '', email: '', message: '', type: 'Support' };
    });
  }
}
