import { Component, OnInit } from '@angular/core';
import { AudiosService } from '../../../services/audios.service';
import { AudioFile } from 'src/app/models/audio';
import { StreamState } from '../../../models/stream-state';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  message: string = '';
  audios: Array<AudioFile> = [];
  state: StreamState;
  currentFileIndex: number = 0;

  constructor(private audioService: AudiosService) { }

  ngOnInit() {
    this.getAudios();
  }

  getAudios() {
    this.audioService.get().subscribe(resp => {
      if (!resp.audios) {
        this.message = 'You have not audios yet.';
      }
      this.audios = resp.audios;
    }, error => {
      this.message = error.error.err ? error.error.err.message : 'Sorry there was an error, try again later.';
    });
  }

  fileIndexHandler($event) {
    this.currentFileIndex = $event;
  }

  statusHandler($event) {
    this.state = $event;
  }

}
