import { Component, Input } from '@angular/core';
import { RadioTest } from 'src/app/modules/radio-test';

@Component({
  selector: 'app-radio-test-history-item',
  templateUrl: 'radio-test-history-item.component.html',
  styleUrls: ['radio-test-history-item.component.css']
})
export class RadioTestHistoryItemComponent  {
  @Input() testItem : RadioTest  | null = null;

  constructor() {

  }

  ngAfterViewInit(): void {

  }


  
}

