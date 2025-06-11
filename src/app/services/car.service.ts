import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Car } from '../models/cars.model';
import { BehaviorSubject, catchError, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  private apiUrl = 'http://localhost:3001/cars'; // json-server --watch cars.json --port 3001
  
  private carsSubject = new BehaviorSubject<Car[]>([]); 
  public cars$ = this.carsSubject.asObservable(); 

  constructor(private http: HttpClient) 
  {
    this.loadCars(); 
  }


  loadCars(): void {
    this.http.get<Car[]>(this.apiUrl).pipe(
      catchError(error => {
        console.error('Erreur lors de la récupération des véhicules', error);
        throw error;
      })
    ).subscribe(cars => {
      this.carsSubject.next(cars);
    });
  }

  getCars(): Observable<Car[]> {
    return this.http.get<Car[]>(this.apiUrl);
  }

  addCar(car: Car): Observable<Car> {
    return this.http.post<Car>(this.apiUrl, car).pipe(
      tap(() => this.loadCars()), 
      catchError(error => {
        console.error('Erreur lors de l\'ajout du véhicule', error);
        throw error;
      })
    );
  }

  updateCar(car: Car): Observable<Car> {
    return this.http.put<Car>(`${this.apiUrl}/${car.id}`, car).pipe(
      tap(() => this.loadCars()), 
      catchError(error => {
        console.error('Erreur lors de la modification du véhicule', error);
        throw error;
      })
    );
  }

  deleteCar(carId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${carId}`).pipe(
      tap(() => this.loadCars()), 
      catchError(error => {
        console.error('Erreur lors de la suppression du véhicule', error);
        throw error;
      })
    );
  }

  getCarById(id: string): Observable<Car> {
    return this.http.get<Car>(`${this.apiUrl}/${id}`);
  }
}
