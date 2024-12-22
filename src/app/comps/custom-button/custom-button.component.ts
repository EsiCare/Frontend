import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-custom-button',
  templateUrl: './custom-button.component.html',
  styleUrls: ['./custom-button.component.css']
})
export class CustomButtonComponent implements OnInit {
  @Input() title! : string;
  @Input() bg_color : string = "#61CAE8";
  constructor() { }

  ngOnInit(): void {
  }

  btnStyle() {
    return `background-color: ${this.bg_color};`
  }

}
