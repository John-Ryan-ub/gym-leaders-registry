import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn:'root'
})
export class GymLeaders {
    private http = inject(HttpClient);
    private apiURL = 'http://localhost:5000/api/pokemon';

    leaderList = signal<any[]>([]);

    fetchLeader(){
        this.http.get<any[]>(this.apiURL).subscribe(data => this.leaderList.set(data));
    }
    
    saveLeader(data: any){
        return this.http.post(this.apiURL, data);
    }
}
