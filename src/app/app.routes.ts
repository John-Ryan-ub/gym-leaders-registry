import { Routes } from '@angular/router';
import { Home } from './home/home';
import { LeaderForm } from './leader-form/leader-form';
import { LeaderList } from './leader-list/leader-list';
import { NotFound } from './not-found/not-found';

export const routes: Routes = [
{ path: 'home', component: Home },
{ path: 'leader/new', component: LeaderForm },
{ path: 'leaderform', component: LeaderForm },
{ path: 'leaderlist', component: LeaderList },
{ path: '', component: NotFound }
];
