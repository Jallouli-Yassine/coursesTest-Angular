import {Component, OnInit} from '@angular/core';
import {RouterLink} from '@angular/router';
import {Course} from '../../models/course';
import {CourseService} from '../../services/course.service';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-our-courses',
  imports: [NgForOf], // Add NgForOf to imports array
  templateUrl: './our-courses.component.html',
  styleUrl: './our-courses.component.css',
  standalone: true
})
export class OurCoursesComponent implements OnInit {
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
