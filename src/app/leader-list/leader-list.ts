
import { Component, OnInit, inject, output, signal, computed } from '@angular/core';
import { GymLeaders } from '../gym-leaders';
import { Router } from '@angular/router';

@Component({
  selector: 'app-leader-list',
  imports: [],
  templateUrl: './leader-list.html',
  styleUrl: './leader-list.css'
})
export class LeaderList implements OnInit {
  leadersService = inject(GymLeaders);

  router = inject(Router);

  editLeader(leader: any): void {
  console.log('Editing leader:', leader._id);
  this.router.navigate(['/leaders',leader._id,'edit']);
  }

  editRequested = output<any>();

  selectedRegion = signal<'All' | 'Kanto' | 'Johto' | 'Hoenn'>('All');

  filteredLeaders = computed(() => {
    const leaders = this.leadersService.leaderList();
    const region = this.selectedRegion();

    return region === 'All'
      ? leaders
      : leaders.filter(leader => leader.region === region);
  });

  setRegion(region: 'All' | 'Kanto' | 'Johto' | 'Hoenn'): void {
    this.selectedRegion.set(region);
  }

  ngOnInit(): void {
    this.leadersService.fetchLeader();
  }

  deleteLeaders(id: string): void {
    if (confirm('Are you sure you want to delete this Gym Leader?')) {
      this.leadersService.deleteLeader(id);
    }
  }
}