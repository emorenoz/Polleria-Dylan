import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; // Crucial para los routerLink del HTML
import {
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardContent,
  IonButton,
  IonIcon
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  cashOutline,
  cubeOutline,
  trendingUpOutline,
  alertCircleOutline,
  addOutline
} from 'ionicons/icons';

// Inyección reactiva de los datos del negocio
import { PedidoService } from '../../services/pedido.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule, // Vincula las rutas directas de navegación
    IonContent,
    IonGrid,
    IonRow,
    IonCol,
    IonCard,
    IonCardContent,
    IonButton,
    IonIcon
  ]
})
export class InicioPage implements OnInit, OnDestroy {

  // Propiedades requeridas por la interfaz dinámica
  fechaActual: string = '';
  ventasHoy: number = 0;
  cantidadPedidosHoy: number = 0;
  pedidosActivos: number = 0;
  totalHistorico: number = 0;
  pedidosPendientes: number = 0;
  ultimosPedidos: any[] = [];

  private pedidoSub!: Subscription;

  constructor(private pedidoService: PedidoService) {
    // Registro explícito de iconos para arquitectura Standalone
    addIcons({
      'cash-outline': cashOutline,
      'cube-outline': cubeOutline,
      'trending-up-outline': trendingUpOutline,
      'alert-circle-outline': alertCircleOutline,
      'add-outline': addOutline
    });
  }

  ngOnInit() {
    this.inicializarFechaPE();

    // Nos suscribimos de manera reactiva al almacén central de datos de la pollería
    this.pedidoSub = this.pedidoService.getPedidos().subscribe(pedidos => {
      this.totalHistorico = pedidos.length;
      this.procesarMetricasDashboard(pedidos);
    });
  }

  ngOnDestroy() {
    // Desuscripción imperativa para evitar fugas de memoria en la app web
    if (this.pedidoSub) {
      this.pedidoSub.unsubscribe();
    }
  }

  /**
   * Carga la fecha actual en formato local extendido
   */
  private inicializarFechaPE() {
    const opciones: Intl.DateTimeFormatOptions = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    this.fechaActual = new Date().toLocaleDateString('es-PE', opciones);
  }

  /**
   * Procesa la cola de pedidos en tiempo real para estructurar las métricas
   */
  private procesarMetricasDashboard(pedidos: any[]) {
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

    // Muestra únicamente los 3 últimos pedidos creados ordenados por tiempo
    this.ultimosPedidos = [...pedidos]
      .sort((a, b) => new Date(b.fecha || b.fechaRegistro).getTime() - new Date(a.fecha || a.fechaRegistro).getTime())
      .slice(0, 3);
  }

  /**
   * Helper para formatear adecuadamente el texto de productos comprados
   */
  obtenerTextoProductos(items: any[]): string {
    if (!items) return '0 productos';
    const total = items.reduce((acc, item) => acc + item.cantidad, 0);
    return `${total} ${total === 1 ? 'producto' : 'productos'}`;
  }
}