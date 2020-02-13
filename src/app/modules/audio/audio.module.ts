import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AudioRoutingModule } from './audio-routing.module';
import { CreateComponent } from './create/create.component';
import { ListComponent } from './list/list.component';
import { MaterialModule } from '../material/material.module';
import { PlayerComponent } from './player/player.component';


@NgModule({
  declarations: [CreateComponent, ListComponent, PlayerComponent],
  imports: [
    CommonModule,
    AudioRoutingModule,
    MaterialModule
  ]
})
export class AudioModule { }
