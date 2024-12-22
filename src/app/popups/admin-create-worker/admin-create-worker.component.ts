import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-create-worker',
  templateUrl: './admin-create-worker.component.html',
  styleUrls: ['./admin-create-worker.component.css']
})
export class AdminCreateWorkerComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }


  onClick(e: any) {
    e.stopPropagation();
  } 
}
