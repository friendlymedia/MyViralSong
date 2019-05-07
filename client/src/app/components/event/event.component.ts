import { SongsService } from './../../services/songs.service';
import { Component, OnInit } from '@angular/core';
import { Songs } from '../../models/Songs';

declare var $: any;

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {
  title = 'app-votes';
  // it is an array of songs
  songs: Songs [];

// this songs are the first ones to be shown in the app as a default songs
// tslint:disable-next-line: no-shadowed-variable
  constructor(private SongsService: SongsService) {
    this.songs = [
      new Songs( 'No te vas', 'Nacho', 'Regguetton', 'https://www.youtube.com/watch?v=iXJyI2tJYgk'),
      new Songs( 'Caraluna', 'Bacilos', 'Romantic', 'https://www.youtube.com/watch?v=-zgDXIi1uYw')
  ];
   }

// this method has 4 parameters which return a boolean (false) so that when we add them they page won't reload
  public addSong(
    title: HTMLInputElement,
    artist: HTMLInputElement,
    genre: HTMLInputElement,
    url: HTMLInputElement
): boolean {


//  newsong variale will give me the value of the input and will pass an observable to the method addsong
// which then will call the  value and add it to the database
// it  will also push -> add  the new song at the bottom of the list
  const newSong = new Songs(title.value, artist.value, genre.value, url.value);
  const observable = this.SongsService.addSong(newSong);
  observable.subscribe((value) => {
    this.songs.push(newSong);
  });

  // to have an empty form each time we want to add a song
  title.value = '';
  artist.value = '';
  genre.value = '';
  url.value = '';
  return false;
}

ngOnInit() {


}
// this is the method incharge of sorting the songs by saing the song with more votes will be on top
// of the song that has less votes
 sortedSongs(): Songs[] {
   return this.songs.sort((a: Songs, b: Songs) => b.votes - a.votes);
 }

 // this function is a simple pop up button that shows a small message once we hover onto the votes section
  PopUpBtn(): void {
    $('#miniModal')
  .modal('show');
    }
 // this modal pop up shows the shared code
  PopUpShareCodeBtn(): void {
  $('#miniModalShare')
  .modal('show');
    }
}
