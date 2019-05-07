import { Component} from '@angular/core';

declare var $: any;

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {

  constructor() { }

  // method that give funtionality to the mobile side bar
  toggleSideBar(): void {
    $('.ui.labeled.icon.sidebar').sidebar('toggle');
  }
}
