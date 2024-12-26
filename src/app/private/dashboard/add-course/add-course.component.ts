import { Component } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-add-course',
  imports: [ReactiveFormsModule,CommonModule], // Add ReactiveFormsModule here
  templateUrl: './add-course.component.html',
  styleUrl: './add-course.component.css',
  standalone: true
})
export class AddCourseComponent {
  addCourseForm!:FormGroup;
  constructor(private fb: FormBuilder ,private router: Router) {

    let formControls = {
      title: new FormControl('', [
        Validators.required,
        Validators.pattern("[a-zA-Z]*"),
        Validators.minLength(3)
      ]),
      price: new FormControl('', Validators.required),
      image: new FormControl('', Validators.required),
    }
    this.addCourseForm = this.fb.group(formControls);
  }
  get getTitle() { return this.addCourseForm.get('title'); }
  get getPrice() { return this.addCourseForm.get('price'); }
  get getImage() { return this.addCourseForm.get('image'); }

  onImageChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.addCourseForm.patchValue({
        image: file
      });
    }
  }

  addCourse() {
    /*
    this.restoService.ajouterRestoEtAffecterAplusiersFoyer(this.addRestoForm.value,this.selectedIdFoyers)
      .subscribe({
        next: (res) => {
          this.router.navigate(['/back/restaurant/table']);
        },
        error: (err) => {
          alert("Erreur lors de l'ajout du foyer");
        }
      });

     */

  }

  loadCourses() {
    //this.foyerService.getAllFoyer().subscribe(data =>this.allFoyers=data );
  }
}
