
import { Component, OnInit, inject, output } from '@angular/core';
import { GymLeaders } from '../gym-leaders';

@Component({
  selector: 'app-leader-list',
  imports: [],
  templateUrl: './leader-list.html',
  styleUrl: './leader-list.css'
})
export class LeaderList implements OnInit {
  leadersService = inject(GymLeaders);

  editRequested = output<any>();

  ngOnInit(): void {
    this.leadersService.fetchLeaders();
  }

  editLeader(leader: any): void {
    this.editRequested.emit(leader);
  }

  deleteLeaders(id: string): void {
    if (confirm('Are you sure you want to delete this Gym Leader?')) {
      this.leadersService.deleteLeaders(id);
    }
  }
}
