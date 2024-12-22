import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-delete-worker',
  templateUrl: './delete-worker.component.html',
  styleUrls: ['./delete-worker.component.css']
})
export class DeleteWorkerComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  onClick(e: any) {
    e.stopPropagation();
  } 

}
