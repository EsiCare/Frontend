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
  @Input() inputType = "text";

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



  public validateInput(callback? : (text : string) => boolean ) {
    let inputElem = this.inputRef!.nativeElement.querySelectorAll("input")[0]; 
    callback = callback || function() { return true;};
    if(!callback(inputElem.value)) {
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



  public getInput() {
    return this.inputRef!.nativeElement.querySelectorAll("input")[0].value; 
  }

  public setInput(value : string) {
    this.inputRef!.nativeElement.querySelectorAll("input")[0].value  = value; 
  }
}
