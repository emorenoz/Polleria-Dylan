import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {
  IonTabs,
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonLabel
} from '@ionic/angular/standalone';

import { addIcons } from 'ionicons';
import {
  homeOutline,
  cartOutline,
  timeOutline,
  barChartOutline,
  settingsOutline
} from 'ionicons/icons';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonTabs,
    IonTabBar,
    IonTabButton,
    IonIcon,
    IonLabel
  ]
})
export class TabsPage implements OnInit {

  constructor() {
    // CORREGIDO: Mapeamos los nombres exactos con guiones que busca tu HTML
    addIcons({
      'home-outline': homeOutline,
      'cart-outline': cartOutline,
      'time-outline': timeOutline,
      'bar-chart-outline': barChartOutline,
      'settings-outline': settingsOutline
    });
  }

  ngOnInit() {}

}