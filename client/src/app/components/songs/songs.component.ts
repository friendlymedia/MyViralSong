import { Component } from '@angular/core';
import { Songs } from '../../models/Songs';

declare var $: any;

@Component({
  selector: 'app-songs',
  templateUrl: './songs.component.html',
  styleUrls: ['./songs.component.css'],
// tslint:disable-next-line: use-input-property-decorator
  inputs: ['songs']
})
export class SongsComponent {
  songs: Songs;

    // call method that is in the interface songs which has the voteup ++
    voteUp() {
        this.songs.voteUp();
    }
}
