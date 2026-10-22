import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn:'root'
})
export class GymLeaders {
    private http = inject(HttpClient);
    private apiUrl = 'http://localhost:3000/api/pokemon';

    leadersList = signal<any[]>([]);

    fetchLeaders(){
        this.http.get<any[]>(this.apiUrl).subscribe(data => this.leadersList.set(data));
    }

    saveLeaders(data: any){
        return this.http.post(this.apiUrl, data);
    }

    deleteLeaders(id: string){
        return this.http.delete(`${this.apiUrl}/${id}`).subscribe(() => this.leadersList.update(list => list.filter(p => p._id !== id)));
    }

    updateLeaders(id: string, data: any){
        return this.http.put(`${this.apiUrl}/${id}`, data);
    }
}
