import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LeaderForm } from './leader-form/leader-form';

@Component({
  imports: [LeaderForm],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('gym-leaders-registry');
}
