import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css']
})
export class DropdownComponent implements OnInit {
  @Input() in_class = "";
  @Input() items : any = [];
  @Input() selectedItem : string = "";
  @Output() onSelectItemCallback :EventEmitter<any>  = new EventEmitter();



  @ViewChild("container") button : ElementRef<HTMLDivElement> | null = null ;
  constructor() { }

  ngOnInit(): void {
  }

  onSelectItem(e : any) {
    this.onSelectItemCallback.emit((e.target as HTMLParagraphElement).textContent);
  }

}
