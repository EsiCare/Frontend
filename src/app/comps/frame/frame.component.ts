import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-frame',
  templateUrl: './frame.component.html',
  styleUrls: ['./frame.component.css']
})
export class FrameComponent implements OnInit {
  @Input() title : string = "";
  @Input() in_class : string = "";

  @Input() actionButton : string =  "";
  @Output() onClickActionButton : EventEmitter<any> = new EventEmitter();
  
  constructor() { }

  ngOnInit(): void {
  }
  


  getClass() {
    
  }

onClickActionBtn() {
  this.onClickActionButton.emit();
}

}
