import { AuthService } from './../../services/auth.service';
import { Event } from './../../models/event';
import { Component } from '@angular/core';



declare var $: any;

@Component({
  selector: 'app-create-form',
  templateUrl: './create-form.component.html',
  styleUrls: ['./create-form.component.css']
})
export class CreateFormComponent {

  // this variable is the one that the user will input in the form which come form the event.ts module
  event: Event = {
    eventname : ''
  };

  // we instantiate the service into the constructor so that we are able to use it to create methods
// tslint:disable-next-line: no-shadowed-variable
  constructor(public AuthService: AuthService) {}

  // this method is created so that  it calls its method which is CreateEvent from Authservice file then we
  // pass as a parametor the data that we want to be stored, this actions trows me an observable therefore
  // that is the subscribe for then will manage the response an error to handle the request and error
OnCreateEvent() {
this.AuthService.CreateEvent(this.event)
.subscribe(
  res => {
    console.log(res);
},
  err => console.log(err)
);

}
}
