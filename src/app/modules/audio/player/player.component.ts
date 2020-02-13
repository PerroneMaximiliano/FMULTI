import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { StreamState } from '../../../models/stream-state';
import { AudioFile } from '../../../models/audio';
import { AudiosService } from '../../../services/audios.service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {
  apiURL: string;
  currentFileIndex: number = 0;
  state: StreamState;
  @Input() audios: Array<AudioFile> = [];
  @Output() fileIndex = new EventEmitter<number>();
  @Output() statusEvent = new EventEmitter<StreamState>();

  constructor(private audioService: AudiosService) { 
    this.apiURL = environment.apiURL;
  }

  ngOnInit() {
    this.audioService.getState().subscribe(state => {
      this.state = state;
      this.statusEvent.emit(state);
    });
  }

  onSliderChangeEnd(change) {
    this.audioService.seekTo(change.value);
  }

  openFile(file, index) {
    this.currentFileIndex = index;
    this.fileIndex.emit(this.currentFileIndex);
    this.audioService.playStream(this.urlFile(file)).subscribe();
  }

  isFirstPlaying() {
    return this.currentFileIndex === 0;
  }

  isLastPlaying() {
    return this.currentFileIndex === this.audios.length - 1;
  }

  previous() {
    const index = this.currentFileIndex - 1;
    this.openFile(this.audios[index].file, index);
  }

  next() {
    const index = this.currentFileIndex + 1;
    this.openFile(this.audios[index].file, index);
  }

  pause() {
    this.audioService.pause();
  }

  play() {
    this.audioService.play();
  }

  stop() {
    this.audioService.stop();
  }

  urlFile(name) {
    return `${this.apiURL}audio/${name}`;
  }

}
