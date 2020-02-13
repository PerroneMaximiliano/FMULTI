import { Component, OnInit } from '@angular/core';
import { AudiosService } from '../../../services/audios.service';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  fileUploadProgress: string = '0%';
  fileData: File = null;
  audio: any;
  message: string;

  constructor(private formBuilder: FormBuilder, private audioService: AudiosService) { }

  ngOnInit() {
  }

  uploadForm = this.formBuilder.group({
    number: ['', {
      validators: [Validators.required]
    }],
    name: ['', {
      validators: [Validators.required]
    }],
    duration: ['', {
      validators: [Validators.required]
    }],
    file: [null, { 
      validators: [Validators.required]
    }]
  });

  get number() {
    return this.uploadForm.get('number');
  }

  get name() {
    return this.uploadForm.get('name');
  }

  get duration() {
    return this.uploadForm.get('duration');
  }

  upload() {
    if (!this.uploadForm.valid) {
      alert('Formulario no valido');
      return;
    }
    
    this.uploadForm.value.file = this.fileData;
    this.fileUploadProgress = '0%';

    this.audioService.upload(this.uploadForm.value).subscribe(
      response => {
        if (response.type === HttpEventType.UploadProgress) {
          this.fileUploadProgress = Math.round(response.loaded / response.total * 100) + '%';
        } else if (response.type === HttpEventType.Response) {
          this.fileUploadProgress = '';
          this.audio = response.body['audio'];
          alert('Audio uploaded!')
        }
      },
      error => {
        this.message = error.error.err ? error.error.err.message : 'Sorry there was an error, try again later.';
      }
    )
  }

  reset() {
    this.uploadForm.reset();
  }

  fileProgress(fileInput: any) {
    this.fileData = <File>fileInput.target.files[0];
  }

}
