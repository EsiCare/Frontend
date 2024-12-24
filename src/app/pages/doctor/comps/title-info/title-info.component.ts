import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-title-info',
  templateUrl: './title-info.component.html',
  styleUrls: ['./title-info.component.css']
})
export class TitleInfoComponent implements OnInit {
  @Input() title = "placeholder";
  @Input() info = "placeholder";
  constructor() { }

  ngOnInit(): void {
  }

}
