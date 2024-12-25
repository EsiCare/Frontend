import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-minput-field',
  templateUrl: './minput-field.component.html',
  styleUrls: ['./minput-field.component.scss']
})
export class MInputFieldComponent implements OnInit {
  @ViewChild("input") inputRef : ElementRef<HTMLInputElement> | null = null;
  @Input() title  = "placeholder";
  @Input() class  = "";
  @Input() in_class  = "";
  @Input() required_title  = "";
  @Input() none_required_title  = "";

  constructor() { 

  }

  ngOnInit(): void {
  
  }

  onChange() {
    this.inputRef?.nativeElement.classList.remove("refuse-input");
    this.inputRef?.nativeElement.classList.remove("refuse-input-same");
  }


  validateInput(callback? : (text : string) => boolean ) {
    callback = callback || function() { return true;};
    console.log(callback(this.inputRef!.nativeElement.value));
    if(!callback(this.inputRef!.nativeElement.value)) {
      if(this.inputRef?.nativeElement.classList.contains("refuse-input")) {
        this.inputRef?.nativeElement.classList.remove("refuse-input");
        this.inputRef?.nativeElement.classList.add("refuse-input-same");
      } else {
        this.inputRef?.nativeElement.classList.add("refuse-input");
        this.inputRef?.nativeElement.classList.remove("refuse-input-same");
      }
      return false;
    }
    return true;
  } 


}
