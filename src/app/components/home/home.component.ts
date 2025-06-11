import { Component } from '@angular/core';
import { Car } from '../../models/cars.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CarService } from '../../services/car.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  cars: Car[] = []; 
  carForm: FormGroup;
  isOverlayOpen = false;
  isEditMode = false;
  currentCar: Car | null = null;

  constructor(
    public authService : AuthService,
    private carService: CarService,   
    private fb: FormBuilder
  ) {
    this.carForm = this.fb.group({
      brand: ['', Validators.required],
      model: ['', Validators.required],
      color: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.carService.cars$.subscribe(cars => {
      this.cars = cars;
    });
    }

  openCreateOverlay() {
    this.isOverlayOpen = true;
    this.isEditMode = false;
    this.carForm.reset();
  }

  openEditOverlay(car: Car) {
    this.isOverlayOpen = true;
    this.isEditMode = true;
    this.currentCar = car;
    this.carForm.setValue({
      brand: car.brand,
      model: car.model,
      color: car.color
    });
  }

  closeOverlay() {
    this.isOverlayOpen = false;
    this.currentCar = null;
  }

  onSubmit() {
    if (this.carForm.invalid) return;

    const carData = this.carForm.value;

    if (this.isEditMode && this.currentCar) {
      const updatedCar = { ...this.currentCar, ...carData };
      this.carService.updateCar(updatedCar).subscribe(
        () => {
          this.closeOverlay();
        },
        error => {
          console.error('Erreur lors de la modification', error);
        }
      );
    } else {
      this.carService.addCar(carData).subscribe(
        () => {
          this.closeOverlay();
        },
        error => {
          console.error('Erreur lors de l\'ajout', error);
        }
      );
    }
  }

  deleteCar(carId: string) {
    this.carService.deleteCar(carId).subscribe(
      () => {
      },
      error => {
        console.error('Erreur lors de la suppression', error);
      }
    );
  }
}
