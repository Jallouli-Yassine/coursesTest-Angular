import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'landing-page', pathMatch: 'full' },
  { path: 'landing-page', loadComponent: () => import('./components/shared/landing-page/landing-page').then(c => c.LandingPage) },
  {
    path: 'dashboard',
    loadComponent: () => import('./components/private/dashboard/dashboard.component').then(c => c.DashboardComponent),
    children: [
      { path: 'courses', loadComponent: () => import('./components/private/dashboard/get-courses/get-courses.component').then(c => c.GetCoursesComponent) },
      {path :'add-course', loadComponent: () => import('./components/private/dashboard/add-course/add-course.component').then(c => c.AddCourseComponent)},
      {path :'update-course/:idCourse', loadComponent: () => import('./components/private/dashboard/update-course/update-course.component').then(c => c.UpdateCourseComponent)},
      { path: '**', redirectTo: 'courses' }
    ]

  },
  { path: '**', redirectTo: 'landing-page' }
];
