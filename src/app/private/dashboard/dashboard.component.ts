import { Component } from '@angular/core';
import {OurCoursesComponent} from '../our-courses/our-courses.component';

@Component({
  selector: 'app-dashboard',
  imports: [OurCoursesComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
  standalone: true
})
export class DashboardComponent {

}
