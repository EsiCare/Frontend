import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-loading-indicator',
  templateUrl: './loading-indicator.component.html',
  styleUrls: ['./loading-indicator.component.css']
})
export class LoadingIndicatorComponent implements OnInit {
  @Input() style = "";
  constructor() { }

  ngOnInit(): void {
  }


  _stlye() {
    return this.style;
  }
}
