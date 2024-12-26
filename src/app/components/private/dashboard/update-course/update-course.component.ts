import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {CourseService} from '../../../../services/course.service';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-update-course',
  imports: [ReactiveFormsModule,CommonModule], // Add ReactiveFormsModule here
  templateUrl: './update-course.component.html',
  styleUrl: './update-course.component.css',
  standalone: true,
})
export class UpdateCourseComponent implements OnInit {
  editCourseForm!: FormGroup;
  course: any;  // To store course details

  constructor(
    private courseService: CourseService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit() {
    // Initialize the form early to avoid template errors
    this.editCourseForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      price: ['', [Validators.required]]
    });

    const courseId = this.route.snapshot.paramMap.get('idCourse');
    const id = courseId ? +courseId : 0;

    // Fetch course details by ID
    this.courseService.getCourseById(id).subscribe((data: any) => {
      this.course = data;

      // Patch form values after data is loaded
      this.editCourseForm.patchValue({
        title: data.title,
        price: data.price
      });
    });
  }



  // Getter for form controls
  get getTitle() {
    return this.editCourseForm.get('title');
  }

  get getPrice() {
    return this.editCourseForm.get('price');
  }

  // Submit Update (without image)
  updateCourse() {
    const updatedCourse = {
      idCourse: this.course.idCourse,
      title: this.editCourseForm.value.title,
      price: this.editCourseForm.value.price,
      image: this.course.image
    };

    this.courseService.updateCourse(updatedCourse).subscribe(() => {
      this.router.navigate(['/dashboard/courses']);
      });
  }
}
