import { Component } from '@angular/core';

declare var $: any;
@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent  {

  constructor() { }
// this method will add the functionality of the sidebar menu which will
//  show once we are in the movile view mode
  HideMenu(): void {
    $('.ui.sidebar').first().sidebar('attach events', '.item', 'show');
    $('.item').removeClass('enable');
  }


}
