import { Component } from '@angular/core';
import {RouterModule} from '@angular/router';
import {Course} from '../../../../models/course';
import {CourseService} from '../../../../services/course.service';
import {NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-get-courses',
  imports: [RouterModule, NgForOf, NgIf],
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


  deleteCourse(id: number) {
    if (confirm('Are you sure you want to delete this course?')) {
      this.courseService.deleteCourse(id).subscribe({
        next: () => {
          // Filter out the deleted course from the list
          this.courses = this.courses.filter(course => course.idCourse !== id);
        },
        error: () => {
          console.error('Failed to delete course');
        }
      });
    }
  }

}
