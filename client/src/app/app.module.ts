import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IndexComponent } from './components/index/index.component';
import { CreateFormComponent } from './components/create-form/create-form.component';
import { JoinFormComponent } from './components/join-form/join-form.component';

import { SongsService } from './services/songs.service';
import { SongsComponent } from './components/songs/songs.component';
import { EventComponent } from './components/event/event.component';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { MobileSideBarComponent } from './components/mobile-side-bar/mobile-side-bar.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule, MatIconModule } from '@angular/material';


@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    CreateFormComponent,
    JoinFormComponent,
    SongsComponent,
    EventComponent,
    SideBarComponent,
    AboutUsComponent,
    MobileSideBarComponent,
    NavBarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatIconModule
  ],
  providers: [
    SongsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
