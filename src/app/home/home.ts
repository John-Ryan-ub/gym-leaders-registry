import { Component } from '@angular/core';
import { LeaderCard } from '../leader-card/leader-card';
import { LeaderList } from '../leader-list/leader-list';
import { LeaderForm } from '../leader-form/leader-form';

@Component({
  imports: [LeaderCard, LeaderList, LeaderForm],
  selector: 'app-home',
  styleUrl: './home.css',
  templateUrl: './home.html',
})
export class Home {}
