import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonContent,
  IonIcon,
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardContent
} from '@ionic/angular/standalone';

import { addIcons } from 'ionicons';
// Importación limpia de los iconos necesarios en la vista
import { restaurantOutline, cashOutline, cartOutline, trendingUpOutline, peopleOutline } from 'ionicons/icons';

// Inyección del servicio de analítica del sistema web
import { DashboardService } from '../../services/dashboard.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.page.html',
  styleUrls: ['./ventas.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonContent,
    IonIcon,
    IonGrid,
    IonRow,
    IonCol,
    IonCard,
    IonCardContent
  ]
})
export class VentasPage implements OnInit {

  // Definición de las variables reactivas que controlarán los paneles numéricos
  totalVentas$: Observable<number>;
  totalPedidos$: Observable<number>;

  constructor(private dashboardService: DashboardService) {
    // Inicialización del diccionario de iconos de Ionic Standalone
    addIcons({
      'restaurant-outline': restaurantOutline,
      'cash-outline': cashOutline,
      'cart-outline': cartOutline,
      'trending-up-outline': trendingUpOutline,
      'people-outline': peopleOutline
    });

    // Enlazamos las variables con los observables procesados en el servicio
    this.totalVentas$ = this.dashboardService.totalVentas();
    this.totalPedidos$ = this.dashboardService.totalPedidos();
  }

  ngOnInit() {
  }

}