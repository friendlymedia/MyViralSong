import { Component } from '@angular/core';


declare var $: any;

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent {
  title = 'MyViralSong';

  // shows the modal as a pop up once the create button is click
  CreateEventbtn(): void {
    $('#Create')
    .modal('show');
  }

  // shows the modal as a pop up once the join button is click
  JoinEventbtn(): void {
    $('#Join')
    .modal('show');

  }

}
