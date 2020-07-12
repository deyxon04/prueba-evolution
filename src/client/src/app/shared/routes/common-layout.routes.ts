import { Routes } from '@angular/router';

export const CommonLayout_ROUTES: Routes = [
    {
        path: 'task',
        loadChildren: () => import('../../task/task.module').then(m => m.TaskModule),
    } 
];