import { Routes } from '@angular/router';
import { Home } from './home/home';
import { LeaderForm } from './leader-form/leader-form';
import { LeaderList } from './leader-list/leader-list';

export const routes: Routes = [
{ path: 'home', component: Home },
{ path: 'leaderform', component: LeaderForm },
{ path: 'leaderlist', component: LeaderList },
{ path: '', redirectTo: 'home', pathMatch: 'full' }
];
