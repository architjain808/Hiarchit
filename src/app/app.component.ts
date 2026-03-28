import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CustomCursorComponent } from './components/custom-cursor/custom-cursor.component';
import { HeaderComponent } from './components/header/header.component';
import { ContactOverlayComponent } from './components/contact-overlay/contact-overlay.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CustomCursorComponent, HeaderComponent, ContactOverlayComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {}
