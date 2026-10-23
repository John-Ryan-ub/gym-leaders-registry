
import { Injectable, inject, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GymLeaders {
    private http = inject(HttpClient);

    // Express backend API URL
    private apiUrl = 'http://localhost:3000/api/leader';

    // Store all leaders
    leaderList = signal<any[]>([]);

    kantoCount = computed(() =>
        this.leaderList().filter(leader => leader.region === 'Kanto').length
    );

    johtoCount = computed(() =>
        this.leaderList().filter(leader => leader.region === 'Johto').length
    );

    hoennCount = computed(() =>
        this.leaderList().filter(leader => leader.region === 'Hoenn').length
    );

    // GET: Fetch all leaders
    fetchLeader() {
        this.http.get<any[]>(this.apiUrl).subscribe({
        next: (data) => this.leaderList.set(data),
        error: (err) => console.error('Failed to fetch leaders:', err)
        });
    }

    getLeader(id: string): Observable<GymLeaders> {
        return this.http.get<GymLeaders>(`${this.apiUrl}/${id}`);
    }

    // POST: Add a new leader
    saveLeader(data: any) {
        return this.http.post<any>(this.apiUrl, data);
    } 
    
    // DELETE: Remove a leader
    deleteLeader(id: string){
        return this.http.delete(`${this.apiUrl}/${id}`).subscribe(() => this.leaderList.update(list => list.filter(p => p._id !== id)));
    }

    // PUT: Update a leader
    updateLeaders(id: string, data: any) {
        return this.http.put<any>(`${this.apiUrl}/${id}`, data);
    } 
}