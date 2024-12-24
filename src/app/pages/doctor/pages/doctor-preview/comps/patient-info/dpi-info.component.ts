import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dpi-info',
  templateUrl: './dpi-info.component.html',
  styleUrls: ['./dpi-info.component.css']
})
export class DpiInfoComponent implements OnInit {
  name: string = "Harti Dhayaa"; 
  reason : string = "Severe abdominal pain prompted the patient's admission on 2024-11-25, with symptoms worsening over 24–48 hours, requiring urgent evaluation.";
  resume : string = "The patient was admitted on 2024-11-25 with symptoms of severe abdominal pain. After conducting a thorough examination and imaging tests, a diagnosis of acute appendicitis was established. Treatment involved laparoscopic appendectomy and a course of antibiotics. The patient’s condition improved steadily during their stay, with no complications observed. Upon discharge on 2024-12-01, the patient was provided with instructions for wound care, a prescription for pain management, and a follow-up appointment in two weeks. The prognosis is excellent.";
  
  constructor() { }

  ngOnInit(): void {
  }

}
