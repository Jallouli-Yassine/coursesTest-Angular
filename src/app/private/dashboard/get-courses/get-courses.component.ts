import { Component } from '@angular/core';
import {RouterModule} from '@angular/router';
import {Course} from '../../../models/course';
import {CourseService} from '../../../services/course.service';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-get-courses',
  imports: [RouterModule, NgForOf],
  templateUrl: './get-courses.component.html',
  styleUrl: './get-courses.component.css',
  standalone: true
})
export class GetCoursesComponent {
  courses: Course[] = [];
  constructor(private courseService: CourseService) {}
  ngOnInit(): void {
    this.getCourses();
  }

  // Fetch all courses from the backend
  getCourses(): void {
    this.courseService.getAllCourses().subscribe((data) => {
      this.courses = data;
    });
  }

}
