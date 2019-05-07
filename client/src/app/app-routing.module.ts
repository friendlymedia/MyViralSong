
import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IndexComponent } from './components/index/index.component';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { AboutUsComponent } from './components/about-us/about-us.component';

// this are the routes of the application and therefore makes it as a single web application
// each of this are navegating into different routes which it will seems like different pages
const routes: Routes = [
  {
    path: '',
    redirectTo: '/index',
    pathMatch: 'full'
  },
  {
    path: 'index',
    component: IndexComponent
  },
  { path: 'index/songsListed',
    component: SideBarComponent,
},
{
  path: 'index/about-us',
  component: AboutUsComponent,
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
