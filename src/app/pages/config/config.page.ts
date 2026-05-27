import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import {
  IonContent,
  IonCard,
  IonCardContent,
  IonIcon,
  IonButton
} from '@ionic/angular/standalone';

import { addIcons } from 'ionicons';
import { 
  pizza, 
  storefront, 
  locationOutline, 
  callOutline, 
  timeOutline, 
  logOutOutline 
} from 'ionicons/icons';

@Component({
  selector: 'app-config',
  templateUrl: './config.page.html',
  styleUrls: ['./config.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonContent,
    IonCard,
    IonCardContent,
    IonIcon,
    IonButton
  ]
})
export class ConfigPage implements OnInit {

  constructor(private router: Router) {
    addIcons({
      'drumstick': pizza,
      'storefront': storefront,
      'location-outline': locationOutline,
      'call-outline': callOutline,
      'time-outline': timeOutline,
      'log-out-outline': logOutOutline
    });
  }

  ngOnInit() {}

  cerrarSesion() {
    console.log('Cerrando sesión del sistema de la pollería...');
    this.router.navigateByUrl('/login');
  }
}