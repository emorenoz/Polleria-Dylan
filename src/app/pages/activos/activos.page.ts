import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {
  IonContent,
  IonSegment,
  IonSegmentButton,
  IonLabel,
  IonList,
  IonItem,
  IonItemSliding,
  IonItemOptions,
  IonItemOption,
  IonIcon
} from '@ionic/angular/standalone';

// Registro de los íconos nativos para la arquitectura Standalone
import { addIcons } from 'ionicons';
import { 
  callOutline, 
  bicycleOutline, 
  storefrontOutline, 
  checkmarkCircle, 
  refreshCircle, 
  trash, 
  receiptOutline 
} from 'ionicons/icons';

import { PedidoService } from '../../services/pedido.service';

@Component({
  selector: 'app-activos',
  templateUrl: './activos.page.html',
  styleUrls: ['./activos.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonContent,
    IonSegment,
    IonSegmentButton,
    IonLabel,
    IonList,
    IonItem,
    IonItemSliding,
    IonItemOptions,
    IonItemOption,
    IonIcon
  ]
})
export class ActivosPage implements OnInit {

  pedidos: any[] = [];
  filtroActual: string = 'Activo';

  constructor(private pedidoService: PedidoService) {
    // Vinculación exacta de las cadenas de texto del HTML a los recursos físicos de Ionicons
    addIcons({
      'call-outline': callOutline,
      'bicycle-outline': bicycleOutline,
      'storefront-outline': storefrontOutline,
      'checkmark-circle': checkmarkCircle,
      'refresh-circle': refreshCircle,
      'trash': trash,
      'receipt-outline': receiptOutline
    });
  }

  ngOnInit(): void {
    this.pedidoService.getPedidos().subscribe((data: any[]) => {
      this.pedidos = data || [];
    });
  }

  // ✔ filtrado seguro
  get pedidosFiltrados(): any[] {
    if (!this.pedidos) return [];

    if (this.filtroActual === 'Todos') return this.pedidos;

    return this.pedidos.filter(p => p.estado === this.filtroActual);
  }

  // ✔ marcar completado
  completarPedidoDirecto(pedido: any): void {
    pedido.estado = 'Completado';
  }

  // ✔ reabrir pedido
  reabrirPedidoDirecto(pedido: any): void {
    pedido.estado = 'Activo';
  }

  // ✔ eliminar seguro
  confirmarEliminar(pedido: any): void {
    this.pedidos = this.pedidos.filter(p => p.id !== pedido.id);
  }
}