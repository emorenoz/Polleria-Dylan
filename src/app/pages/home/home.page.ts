import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import {
  IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardHeader,
  IonCardTitle, IonCardSubtitle, IonGrid, IonRow, IonCol, IonIcon,
  IonButton, IonBadge
} from '@ionic/angular/standalone';

import { addIcons } from 'ionicons';
import {
  cashOutline, cubeOutline, trendingUpOutline,
  alertCircleOutline, restaurantOutline
} from 'ionicons/icons';

// Inyección de la lógica y flujos del PedidoService
import { PedidoService } from '../../services/pedido.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonHeader, IonToolbar, IonTitle, IonContent, IonCard,
    IonCardHeader, IonCardTitle, IonCardSubtitle, IonGrid, IonRow,
    IonCol, IonIcon, IonButton, IonBadge
  ]
})
export class HomePage implements OnInit, OnDestroy {

  // Atributos dinámicos vinculados directamente al HTML
  fechaActual: string = '';
  ventasHoy: number = 0;
  cantidadPedidosHoy: number = 0;
  pedidosActivos: number = 0;
  totalHistorico: number = 0;
  pedidosPendientes: number = 0;
  ultimosPedidos: any[] = [];

  private pedidoSub!: Subscription;

  constructor(
    private router: Router,
    private pedidoService: PedidoService
  ) {
    // Corregido: Mapeo explícito usando strings con guiones para que coincida con el HTML
    addIcons({
      'restaurant-outline': restaurantOutline,
      'cash-outline': cashOutline,
      'cube-outline': cubeOutline,
      'trending-up-outline': trendingUpOutline,
      'alert-circle-outline': alertCircleOutline
    });
  }

  ngOnInit() {
    this.cargarFechaFormateada();

    // Escucha el flujo reactivo de pedidos reales
    this.pedidoSub = this.pedidoService.getPedidos().subscribe(pedidos => {
      this.totalHistorico = pedidos.length;
      this.calcularMétricasNegocio(pedidos);
    });
  }

  ngOnDestroy() {
    // Rompe la suscripción de forma segura al destruir el componente
    if (this.pedidoSub) {
      this.pedidoSub.unsubscribe();
    }
  }

  /**
   * Genera de forma automatizada la fecha del sistema con formato extendido
   */
  private cargarFechaFormateada() {
    const opciones: Intl.DateTimeFormatOptions = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    this.fechaActual = new Date().toLocaleDateString('es-PE', opciones);
  }

  /**
   * Filtra las órdenes de pollería en tiempo real para armar las tarjetas KPI
   */
  private calcularMétricasNegocio(pedidos: any[]) {
    this.ventasHoy = 0;
    this.cantidadPedidosHoy = 0;
    this.pedidosActivos = 0;
    this.pedidosPendientes = 0;

    pedidos.forEach(p => {
      if (p.estado === 'pendiente' || p.estado === 'Activo') {
        this.pedidosPendientes++;
        this.pedidosActivos++;
      } else if (p.estado === 'en_proceso') {
        this.pedidosActivos++;
      } else if (p.estado === 'completado' || p.estado === 'Entregado') {
        this.ventasHoy += p.total;
        this.cantidadPedidosHoy++;
      }
    });

    // Muestra únicamente los últimos 3 registros ordenados de más nuevo a más viejo
    this.ultimosPedidos = [...pedidos]
      .sort((a, b) => new Date(b.fecha || b.fechaRegistro).getTime() - new Date(a.fecha || a.fechaRegistro).getTime())
      .slice(0, 3);
  }

  /**
   * Helper para formatear de manera gramatical el string de ítems de la orden
   */
  obtenerTextoItems(items: any[]): string {
    if (!items) return '0 productos';
    const total = items.reduce((acc, item) => acc + item.cantidad, 0);
    return `${total} ${total === 1 ? 'producto' : 'productos'}`;
  }

  // --- CONTROL DE NAVEGACIÓN (EVENTOS CLICK) ---

  irANuevoPedido() {
    // Redirige al módulo de toma de pedidos integrado en los tabs
    this.router.navigateByUrl('/tabs/pedido');
  }

  verPedidosActivos() {
    // Redirige al control de cocina / despacho de pedidos
    this.router.navigateByUrl('/tabs/activos');
  }
}