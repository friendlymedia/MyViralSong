import { User } from './../../models/user';
import { Component } from '@angular/core';
import { AuthService } from './../../services/auth.service';

declare var $: any;

@Component({
  selector: 'app-join-form',
  templateUrl: './join-form.component.html',
  styleUrls: ['./join-form.component.css']
})
export class JoinFormComponent  {

  // this is the the class user from the modal and the value which the user will be input in the form
  user: User = {
    userName : ''
  };

  // we instantiate the service into the constructor so that we are able to use it to create methods
// tslint:disable-next-line: no-shadowed-variable
  constructor(public AuthService: AuthService) {}

    // this method is created so that  it calls its method which is CreateEvent from Authservice file then we
  // pass as a parametor the data that we want to be stored, this actions trows me an observable therefore
  // that is the subscribe for then will manage the response an error to handle the request and error
OnJoinEvent() {
this.AuthService.createUser(this.user)
.subscribe(
  res => {
    console.log(res);
},
  err => console.log(err)
);

}

}
