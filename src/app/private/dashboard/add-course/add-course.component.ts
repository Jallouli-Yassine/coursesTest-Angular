import { Component } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {CommonModule} from '@angular/common';
import {Course} from '../../../models/course';
import {HttpClient} from '@angular/common/http';
import {CourseService} from '../../../services/course.service';

@Component({
  selector: 'app-add-course',
  imports: [ReactiveFormsModule,CommonModule], // Add ReactiveFormsModule here
  templateUrl: './add-course.component.html',
  styleUrl: './add-course.component.css',
  standalone: true
})
export class AddCourseComponent {
  addCourseForm!:FormGroup;
  selectedImage: File | null = null; // Store the selected image

  constructor(private fb: FormBuilder ,private router: Router,private http: HttpClient,private courseService:CourseService) {

    let formControls = {
      title: new FormControl('', [
        Validators.required,
        Validators.pattern('^[^0-9]*$'),
        Validators.minLength(3)
      ]),
      price: new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9]*$')
      ]),
      image: new FormControl('', Validators.required),
    }
    this.addCourseForm = this.fb.group(formControls);
  }
  get getTitle() { return this.addCourseForm.get('title'); }
  get getPrice() { return this.addCourseForm.get('price'); }
  get getImage() { return this.addCourseForm.get('image'); }
  // Handle image selection
  onImageChange(event: any) {
    const file = event.target.files[0];  // Get the selected file
    if (file) {
      this.selectedImage = file;  // Store the selected file
    }
  }

  // Add course method
  addCourse() {
    const formData = new FormData();
    formData.append('title', this.addCourseForm.get('title')?.value);
    formData.append('price', this.addCourseForm.get('price')?.value);

    if (this.selectedImage) {
      formData.append('image', this.selectedImage, this.selectedImage.name);  // Append the file
    }

    // Now send the formData to the backend
    this.courseService.addCourse(formData).subscribe({
      next: (response) => {
        this.router.navigate(['/dashboard/courses']);
      },
      error: (err) => {
        console.error('Error adding course:', err);
      }
    });
  }


}
