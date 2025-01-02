import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import Actor from 'src/app/modules/actor';
import Patient from 'src/app/modules/petient';

@Component({
  selector: 'app-receptionist-history-item',
  templateUrl: './receptionist-history-item.component.html',
  styleUrls: ['./receptionist-history-item.component.css']
})
export class ReceptionistHistoryItemComponent implements OnInit {
  @Input() patient?  : Actor;
  @Input() selected : boolean = false;

  @Output() onClickEdit :EventEmitter<any> = new EventEmitter(); 
  constructor() { }

  ngOnInit(): void {
  }


  _onClickEdit() {
    this.onClickEdit.emit();
  }
}
