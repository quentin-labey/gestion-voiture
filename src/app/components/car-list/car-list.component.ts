import { Component } from '@angular/core';
import { Car } from '../../models/cars.model';
import { CarService } from '../../services/car.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrl: './car-list.component.css'
})
export class CarListComponent {
  cars: Car[] = [];
  public role : string =  '';

  constructor(private carService: CarService,public authService : AuthService, private router : Router) {}

  ngOnInit() {
    this.role = this.authService.currentUser.role
    this.loadCars();
  }

/*   ngAfterViewInit() : void 
  {
    setTimeout(() => {
      const table = new DataTable("#productTable", {
        searchable : true,
        perPage : 10,
        perPageSelect : [5,10,20,40],
        labels : {
          placeholder : "Rechercher ...",
          perPage : "produits par page",
          noRows : "Aucun produit trouvé",
          info : "Affichage de {start à {end} sur {rows} produits"
        }
      });
    },100)
  } */


  loadCars() {
    this.carService.getCars().subscribe(
      data => this.cars = data,
      error => console.error('Erreur lors de la récupération des livres', error)
    );
  }

  editCars(car: Car) {
      this.router.navigate(['/admin/car/edit', car.id]);
  }

  deleteCar(id: string) {
    this.carService.deleteCar(id).subscribe(() => {
      alert('Voiture supprimé !');
      this.loadCars();
    });
  }
}
