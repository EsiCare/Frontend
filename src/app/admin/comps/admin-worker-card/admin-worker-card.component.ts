import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

type ActorRole = "Administrator" | "Radiologist" | "Biologist" | "Doctor" | "Nurse";

@Component({
  selector: 'app-admin-worker-card',
  templateUrl: './admin-worker-card.component.html',
  styleUrls: ['./admin-worker-card.component.css']
})
export class AdminWorkerCardComponent implements OnInit {
  @Input() name = "";
  @Input() role : ActorRole = "Administrator";
  @Input() showMenu! : boolean;

  @Output() showOptionsMenu = new EventEmitter<number>();
  @Output() hideOptionsMenu = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
  }

  _showOptionsMenu() {
    this.showOptionsMenu.emit();
  }
  _hideOptionsMenu() {
    this.hideOptionsMenu.emit();
  }

}
