import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';
import { EditorComponent } from './shared/editor/editor.component';

@Component({
  selector: 'app-root',
  standalone: true,

  //imports: [CommonModule, NavbarComponent, FooterComponent,EditorComponent],
  imports: [CommonModule, NavbarComponent, FooterComponent, RouterOutlet],

  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'angular';
}