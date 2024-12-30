import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-custom-button',
  templateUrl: './custom-button.component.html',
  styleUrls: ['./custom-button.component.css']
})
export class CustomButtonComponent implements OnInit {
  @Input() title! : string;
  @Input() bg_color : string = "#61CAE8";
  @Input() in_class : string = "";
  @Output() onClick :EventEmitter<any>  = new EventEmitter();


  
  constructor() { }

  ngOnInit(): void {
  }

  btnStyle() {
    return `background-color: ${this.bg_color};`
  }

  _onClick() {
    this.onClick.emit();
  }

}
