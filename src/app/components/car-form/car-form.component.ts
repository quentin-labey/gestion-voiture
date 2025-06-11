import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CarService } from '../../services/car.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Car } from '../../models/cars.model';

@Component({
  selector: 'app-car-form',
  templateUrl: './car-form.component.html',
  styleUrl: './car-form.component.css'
})
export class CarFormComponent {
  carForm!: FormGroup;
  isEditMode = false;
  carId: string  = "";


  constructor(private fb: FormBuilder, private carService: CarService, private router: Router,  private route: ActivatedRoute
  ) {}

  ngOnInit() {

    this.carForm = this.fb.group({
      brand: ['', Validators.required],
      model: ['', Validators.required],
      color: ['', Validators.required],
    });

    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEditMode = true;
        this.carId = params['id'];
        this.loadCar(this.carId.toString());
      }
    });
  }

  loadCar(id: string): void {
    console.log(id)
    this.carService.getCarById(id).subscribe(car => {
      this.carForm.patchValue(car);
    });
  }

  onSubmit(): void {
    if (this.carForm.valid) {
      const car: Car = this.carForm.value;

      if (this.isEditMode && this.carId !== null) {
        car.id = this.carId.toString();
        this.carService.updateCar(car).subscribe(() => {
          alert('Voiture modifié avec succès !');
          this.router.navigate(['/admin/cars']);
        });
      } else {
        this.carService.addCar(car).subscribe(() => {
          alert('Voiture ajouté avec succès !');
          this.router.navigate(['/admin/cars']);
        });
      }
    }
  }
}
