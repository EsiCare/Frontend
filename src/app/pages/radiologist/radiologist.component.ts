import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { RightBarService } from 'src/app/services/right-bar.service';



interface RadioImgData {
  name: string;
  date: string;
  data: Uint8Array | undefined;
  
}
interface RadioRequestedTestInfo {
  name : string;
  imgs : RadioImgData[];
  notes: string[];

}

@Component({
  selector: 'app-radiologist',
  templateUrl: './radiologist.component.html',
  styleUrls: ['./radiologist.component.css']
})
export class RadiologistComponent implements OnInit {
  requested! :  RadioRequestedTestInfo;
  @ViewChild("fileInput") fileInput : ElementRef<HTMLInputElement> | null = null;


  constructor(public rightBarService: RightBarService,public authService :AuthService) {
    this.requested = {
      name: "Head Radio",
      notes: [
        "Skull X-rays: Lateral (side) view and AP (anteroposterior) view to evaluate fractures, lesions, or bone deformities.",
        "If necessary, include Towne's view (to assess occipital bone and posterior cranial fossa).",
      ],
      imgs: [

      ],
    }
  }

  ngOnInit(): void {
  }


  onInitFile() {
    this.fileInput?.nativeElement.click();
  }
  async onUploadFile(e : any) {
    let files = e.target.files as FileList;
    let data =  (await files[0].stream().getReader().read()).value;
    let name = files[0].name;
    let date = new Date().toLocaleString(); 
    this.requested.imgs.push({name, data,date});
  }

}
