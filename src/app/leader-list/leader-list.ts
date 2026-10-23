
import { Component, OnInit, inject, output, signal, computed } from '@angular/core';
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

  editLeader(leader: any): void {
    this.editRequested.emit(leader);
  }

  deleteLeaders(id: string): void {
    if (confirm('Are you sure you want to delete this Gym Leader?')) {
      this.leadersService.deleteLeader(id);
    }
  }
  
}