import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material.module';

import { HttpClientModule } from '@angular/common/http';

import { LoginComponent } from 'src/app/components/login/login.component'
import { PostsComponent } from 'src/app/components/posts/posts.component';
import { AddPostFormComponent } from 'src/app/components/add-post-form/add-post-form.component';

@NgModule({
  declarations: [AppComponent, LoginComponent, PostsComponent, AddPostFormComponent],
  entryComponents: [],
  imports: [ 
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule, 
    BrowserAnimationsModule, 
    MaterialModule, 
    FormsModule, 
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
