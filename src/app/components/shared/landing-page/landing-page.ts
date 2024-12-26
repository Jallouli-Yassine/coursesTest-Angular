import { Component } from '@angular/core';
import {OurCoursesComponent} from '../our-courses/our-courses.component';

@Component({
  selector: 'app-landing-page',
  imports: [OurCoursesComponent],
  templateUrl: './landing-page.html',
  styleUrl: './landing-page.css',
  standalone: true
})
export class LandingPage {

}
