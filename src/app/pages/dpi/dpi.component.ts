import { Component, OnInit } from '@angular/core';

interface UserDpi {
  name : string;
  reason: string;
  resume: string;
}

@Component({
  selector: 'app-dpi',
  templateUrl: './dpi.component.html',
  styleUrls: ['./dpi.component.css']
})
export class DpiComponent implements OnInit {
  userData : UserDpi | null = null;

  constructor() { 
    this.userData = {
      name: "Harti Dhayaa",
      reason : "Severe abdominal pain prompted the patient's admission on 2024-11-25, with symptoms worsening over 24–48 hours, requiring urgent evaluation.",
      resume: "",
    }
  }

  ngOnInit(): void {
  }



}
