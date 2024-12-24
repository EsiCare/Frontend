import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-minput',
  templateUrl: './minput.component.html',
  styleUrls: ['./minput.component.scss']
})
export class MInputComponent implements OnInit {
  @ViewChild("input") inputRef : ElementRef<HTMLInputElement> | null = null;
  @Input() title  = "placeholder";
  @Input() required_title  = "";
  @Input() in_class  = "";
  @Input() defaultValue  = "";
  
  @Output() onInputChange :EventEmitter<any>  = new EventEmitter();
  
  

  constructor() { 

  }

  ngOnInit(): void {
  
  }

  onChange() {
    this.inputRef?.nativeElement.classList.remove("refuse-input");
    this.inputRef?.nativeElement.classList.remove("refuse-input-same");
    this.onInputChange.emit();
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
