import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { 
  IonContent, 
  IonIcon, 
  IonGrid, 
  IonRow, 
  IonCol 
} from '@ionic/angular/standalone';

import { addIcons } from 'ionicons';
import { 
  restaurantOutline, 
  arrowBackOutline, 
  checkmarkCircleOutline, 
  caretBackOutline, 
  caretForwardOutline 
} from 'ionicons/icons';

// Inyectamos el servicio de pedidos para lograr la interacción real
import { PedidoService } from '../../services/pedido.service';

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.page.html',
  styleUrls: ['./pedido.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonContent,
    IonIcon,
    IonGrid,
    IonRow,
    IonCol
  ]
})
export class PedidoPage implements OnInit {

  categoriaSeleccionada: string = 'Pollos';

  // Estructura limpia que manipula el HTML mediante ngModel
  pedido: any = {
    cliente: {
      nombre: '',
      telefono: '',
      direccion: ''
    },
    tipoEntrega: 'Recojo',
    items: [], // Carrito en formato de lista para el HTML
    total: 0
  };

  productosBase = [
    // --- POLLOS ---
    { id: 1, categoria: 'Pollos', nombre: 'Pollo a la Brasa 1/4', precio: 18.00 },
    { id: 2, categoria: 'Pollos', nombre: 'Pollo a la Brasa 1/2', precio: 32.00 },

    // --- BEBIDAS ---
    { id: 10, categoria: 'Bebidas', nombre: 'Gaseosa 3 Lts.', precio: 14.00 },
    { id: 11, categoria: 'Bebidas', nombre: 'Gaseosa 1 ½ Lt.', precio: 10.00 },
    { id: 12, categoria: 'Bebidas', nombre: 'Gaseosa 1 Lt.', precio: 7.00 },
    { id: 13, categoria: 'Bebidas', nombre: 'Gaseosa Gordita', precio: 5.00 },
    { id: 14, categoria: 'Bebidas', nombre: 'Gaseosa Personal', precio: 2.50 },
    { id: 15, categoria: 'Bebidas', nombre: 'Pepsi desc. 3 Lts.', precio: 10.00 },
    { id: 16, categoria: 'Bebidas', nombre: 'Pepsi desc. 2 Lts.', precio: 8.00 },
    { id: 17, categoria: 'Bebidas', nombre: 'Pepsi desc. 1.5 Lts.', precio: 5.50 },
    { id: 18, categoria: 'Bebidas', nombre: 'Pepsi desc. 1 Lt.', precio: 4.00 },
    { id: 19, categoria: 'Bebidas', nombre: 'Pepsi personal', precio: 1.50 },
    { id: 20, categoria: 'Bebidas', nombre: 'Concordia Personal', precio: 1.50 },
    { id: 21, categoria: 'Bebidas', nombre: 'Chicha Morada Jarra 1Lt', precio: 10.00 },
    { id: 22, categoria: 'Bebidas', nombre: 'Chicha Morada ½ Lt', precio: 5.00 },
    { id: 23, categoria: 'Bebidas', nombre: 'Chicha Morada Vaso', precio: 2.00 },
    { id: 24, categoria: 'Bebidas', nombre: 'Maracuyá Jarra 1 Lt.', precio: 10.00 },
    { id: 25, categoria: 'Bebidas', nombre: 'Maracuyá Jarra ½ Lt.', precio: 5.00 },
    { id: 26, categoria: 'Bebidas', nombre: 'Maracuyá Vaso', precio: 2.00 },
    { id: 27, categoria: 'Bebidas', nombre: 'Limonada Frozen 1 Lt.', precio: 10.00 },
    { id: 28, categoria: 'Bebidas', nombre: 'Limonada Frozen ½ Lt.', precio: 5.00 },
    { id: 29, categoria: 'Bebidas', nombre: 'Limonada Frozen Vaso', precio: 2.00 },
    { id: 30, categoria: 'Bebidas', nombre: 'Agua Mineral', precio: 3.00 },
    { id: 31, categoria: 'Bebidas', nombre: 'Té caliente', precio: 2.00 },
    { id: 32, categoria: 'Bebidas', nombre: 'Anís caliente', precio: 2.00 },
    { id: 33, categoria: 'Bebidas', nombre: 'Manzanilla caliente', precio: 2.00 },
    { id: 34, categoria: 'Bebidas', nombre: 'Café caliente', precio: 3.00 },

    // --- CRIOLLOS ---
    { id: 40, categoria: 'Criollos', nombre: 'Tallarín Saltado c/ carne', precio: 16.00 },
    { id: 41, categoria: 'Criollos', nombre: 'Tallarín Saltado c/ chancho', precio: 15.00 },
    { id: 42, categoria: 'Criollos', nombre: 'Chicharrón Clásico', precio: 14.00 },
    { id: 43, categoria: 'Criollos', nombre: 'Chicharrón a lo Monstruo', precio: 16.00 },
    { id: 44, categoria: 'Criollos', nombre: 'Lomo Saltado c/ arroz', precio: 14.00 },
    { id: 45, categoria: 'Criollos', nombre: 'Lomo Saltado c/ chaufa', precio: 15.00 },
    { id: 46, categoria: 'Criollos', nombre: 'Lomo Montado', precio: 16.00 },
    { id: 47, categoria: 'Criollos', nombre: 'Lomo a lo Pobre', precio: 17.00 },
    { id: 48, categoria: 'Criollos', nombre: 'Pollo Saltado c/ arroz', precio: 13.00 },
    { id: 49, categoria: 'Criollos', nombre: 'Pollo Saltado c/ chaufa', precio: 14.00 },
    { id: 50, categoria: 'Criollos', nombre: 'Pollo Saltado a lo Pobre', precio: 16.00 },
    { id: 51, categoria: 'Criollos', nombre: 'Pollo a la Plancha a lo Pobre', precio: 19.00 },
    { id: 52, categoria: 'Criollos', nombre: 'Bistec a lo Pobre', precio: 15.00 },
    { id: 53, categoria: 'Criollos', nombre: 'Tallarín Verde + ¼ Pollo', precio: 16.00 },
    { id: 54, categoria: 'Criollos', nombre: 'Tallarín Verde c/ Bistec', precio: 15.00 },
    { id: 55, categoria: 'Criollos', nombre: 'Tallarín Verde c/ Pechuga', precio: 19.00 },
    { id: 56, categoria: 'Criollos', nombre: 'Tallarín Saltado c/ pollo', precio: 15.00 },
    { id: 57, categoria: 'Criollos', nombre: 'Caldo Gallina Presa Grande', precio: 12.00 },

    // --- CHIFA A LA CARTA ---
    { id: 60, categoria: 'Chifa', nombre: 'Frijolito con langostinos', precio: 15.00 },
    { id: 61, categoria: 'Chifa', nombre: 'Frijolito Especial', precio: 15.00 },
    { id: 62, categoria: 'Chifa', nombre: 'Limonkay', precio: 15.00 },
    { id: 63, categoria: 'Chifa', nombre: 'Pollo Chijaukay', precio: 15.00 },
    { id: 64, categoria: 'Chifa', nombre: 'Tipakay', precio: 15.00 },
    { id: 65, categoria: 'Chifa', nombre: 'Combinado de pollo', precio: 14.00 },
    { id: 66, categoria: 'Chifa', nombre: 'Combinado de carne', precio: 15.00 },
    { id: 67, categoria: 'Chifa', nombre: 'Combinado de chancho', precio: 17.00 },
    { id: 68, categoria: 'Chifa', nombre: 'Combinado de langostinos', precio: 15.00 },
    { id: 69, categoria: 'Chifa', nombre: 'Combinado Especial', precio: 20.00 },
    { id: 70, categoria: 'Chifa', nombre: 'Combinado c/ pollo en trozos', precio: 16.00 },
    { id: 71, categoria: 'Chifa', nombre: 'Pollo con verduras', precio: 16.00 },
    { id: 72, categoria: 'Chifa', nombre: 'Carne con verduras', precio: 14.00 },
    { id: 73, categoria: 'Chifa', nombre: 'Chancho con verduras', precio: 14.00 },
    { id: 74, categoria: 'Chifa', nombre: 'Langostinos con verduras', precio: 16.00 },
    { id: 75, categoria: 'Chifa', nombre: 'Verduras c/ pollo en trozos', precio: 16.00 },
    { id: 76, categoria: 'Chifa', nombre: 'Frijolito con pollo', precio: 11.00 },
    { id: 77, categoria: 'Chifa', nombre: 'Frijolito con carne', precio: 12.00 },
    { id: 78, categoria: 'Chifa', nombre: 'Frijolito con chancho', precio: 12.00 },
    { id: 80, categoria: 'Chifa', nombre: 'Aeropuerto c/ pollo trozos', precio: 14.00 },
    { id: 81, categoria: 'Chifa', nombre: 'Aeropuerto Salvaje pollo', precio: 14.00 },
    { id: 82, categoria: 'Chifa', nombre: 'Aeropuerto Salvaje carne', precio: 14.00 },
    { id: 83, categoria: 'Chifa', nombre: 'Aeropuerto Salvaje chancho', precio: 12.00 },
    { id: 84, categoria: 'Chifa', nombre: 'Tallarín de pollo', precio: 13.00 },
    { id: 85, categoria: 'Chifa', nombre: 'Tallarín de carne', precio: 14.00 },
    { id: 86, categoria: 'Chifa', nombre: 'Tallarín de chancho', precio: 16.00 },
    { id: 87, categoria: 'Chifa', nombre: 'Tallarín de langostinos', precio: 15.00 },
    { id: 88, categoria: 'Chifa', nombre: 'Tallarín Especial', precio: 20.00 },
    { id: 89, categoria: 'Chifa', nombre: 'Tallarín con pollo en trozos', precio: 14.00 },
    { id: 90, categoria: 'Chifa', nombre: 'Tortilla c/ pollo', precio: 14.00 },
    { id: 91, categoria: 'Chifa', nombre: 'Tortilla c/ carne', precio: 15.00 },
    { id: 92, categoria: 'Chifa', nombre: 'Tortilla c/ chancho', precio: 14.00 },
    { id: 93, categoria: 'Chifa', nombre: 'Tortilla c/ langostinos', precio: 16.00 },
    { id: 94, categoria: 'Chifa', nombre: 'Sopa Wantan c/ pollo', precio: 9.00 },
    { id: 95, categoria: 'Chifa', nombre: 'Sopa Wantan c/ chancho', precio: 11.00 },
    { id: 96, categoria: 'Chifa', nombre: 'Sopa Wantan c/ carne', precio: 11.00 },
    { id: 97, categoria: 'Chifa', nombre: 'Sopa Wantan c/ langostino', precio: 13.00 },
    { id: 98, categoria: 'Chifa', nombre: 'Sopa Wantan Especial', precio: 14.00 },
    { id: 99, categoria: 'Chifa', nombre: 'Sopa Fuchifu', precio: 12.00 },
    { id: 100, categoria: 'Chifa', nombre: 'Sopa de kion', precio: 10.00 },
    { id: 101, categoria: 'Chifa', nombre: 'Wantan Frito (Docena)', precio: 9.00 },
    { id: 102, categoria: 'Chifa', nombre: 'Wantan Frito (1/2 doc.)', precio: 6.00 },

    // --- PARRILLAS Y COMBOS ---
    { id: 110, categoria: 'Parrillas', nombre: 'OFERTA 1 (Chuleta+1/8Pollo)', precio: 30.00 },
    { id: 111, categoria: 'Parrillas', nombre: 'OFERTA 2 (Chuleta+Chorizo)', precio: 34.00 },
    { id: 112, categoria: 'Parrillas', nombre: 'OFERTA 3 (Churrasco+1/4Pollo)', precio: 31.00 },
    { id: 113, categoria: 'Parrillas', nombre: 'OFERTA 4 (Pechuga+Chuleta)', precio: 36.00 },
    { id: 114, categoria: 'Parrillas', nombre: 'OFERTA 5 (1/4Pollo+Mollejas)', precio: 33.00 },
    { id: 115, categoria: 'Parrillas', nombre: 'OFERTA 6 (Mollejas solas)', precio: 14.00 },
    { id: 116, categoria: 'Parrillas', nombre: 'Parrilla Dylan (Familiar)', precio: 45.00 },
    { id: 117, categoria: 'Parrillas', nombre: 'Parrilla Familiar Especial', precio: 68.00 },
    { id: 118, categoria: 'Parrillas', nombre: 'Pechuga Clásica Parrilla', precio: 17.00 },
    { id: 119, categoria: 'Parrillas', nombre: 'Pechuga Light (c/ ensalada)', precio: 14.00 },
    { id: 120, categoria: 'Parrillas', nombre: 'Pechuga al Orégano', precio: 17.00 },
    { id: 121, categoria: 'Parrillas', nombre: 'Pierna Deshuesada Parrilla', precio: 16.00 },
    { id: 122, categoria: 'Parrillas', nombre: 'Pechuga al Limón', precio: 17.00 },
    { id: 123, categoria: 'Parrillas', nombre: '1/4 Pollo + 2p Anticuchos', precio: 20.00 },
    { id: 124, categoria: 'Parrillas', nombre: '2 Brochetas de Pollo', precio: 20.00 },
    { id: 125, categoria: 'Parrillas', nombre: '3p Anticuchos de Corazón', precio: 20.00 },
    { id: 126, categoria: 'Parrillas', nombre: 'Churrasco a la Parrilla', precio: 17.00 },
    { id: 127, categoria: 'Parrillas', nombre: 'Churrasco a lo Pobre', precio: 19.00 },
    { id: 128, categoria: 'Parrillas', nombre: 'Chuleta a la Parrilla', precio: 16.00 },
    { id: 129, categoria: 'Parrillas', nombre: 'Chuleta a lo Pobre', precio: 18.00 },
    { id: 130, categoria: 'Parrillas', nombre: 'Bistec a la Parrilla', precio: 17.00 },
    { id: 131, categoria: 'Parrillas', nombre: 'Bistec a lo Pobre', precio: 20.00 },
    { id: 132, categoria: 'Parrillas', nombre: 'Chorizo Clásico', precio: 9.00 },
    { id: 133, categoria: 'Parrillas', nombre: 'Chorizo al Orégano', precio: 10.00 },
    { id: 134, categoria: 'Parrillas', nombre: 'Combo 1/4 Pollo + Chaufa', precio: 18.00 },
    { id: 135, categoria: 'Parrillas', nombre: 'Combito 1/8 Pollo + Chaufa', precio: 14.00 },
    { id: 136, categoria: 'Parrillas', nombre: 'Combo Chorizero 1/4 Pollo', precio: 19.00 },
    { id: 137, categoria: 'Parrillas', nombre: 'Mostro a lo Pobre 1/4', precio: 18.00 },
    { id: 138, categoria: 'Parrillas', nombre: 'Mostrito a lo Pobre 1/8', precio: 14.00 },
    { id: 139, categoria: 'Parrillas', nombre: 'Salchi Mostro', precio: 11.00 },
    { id: 140, categoria: 'Parrillas', nombre: 'Salchipapa Clásica', precio: 8.00 },
    { id: 141, categoria: 'Parrillas', nombre: 'Salchipapa Montada', precio: 9.00 },
    { id: 142, categoria: 'Parrillas', nombre: 'Salchipapa a lo Pobre', precio: 10.00 },

    // --- GUARNICIONES ---
    { id: 150, categoria: 'Guarniciones', nombre: '1 Porción de Papas Fritas', precio: 14.00 },
    { id: 151, categoria: 'Guarniciones', nombre: '1/2 Porción Papas Fritas', precio: 7.00 },
    { id: 152, categoria: 'Guarniciones', nombre: '1 Porción Ensalada Mixta', precio: 6.00 },
    { id: 153, categoria: 'Guarniciones', nombre: '1/2 Porción Ensalada Mixta', precio: 3.00 },
    { id: 154, categoria: 'Guarniciones', nombre: '1 Porción Arroz Chaufa', precio: 5.00 },
    { id: 155, categoria: 'Guarniciones', nombre: '1 Porción Arroz Blanco', precio: 5.00 },
    { id: 156, categoria: 'Guarniciones', nombre: 'Porción de Plátano Frito', precio: 2.00 },
    { id: 157, categoria: 'Guarniciones', nombre: 'Porción de Huevo Frito', precio: 2.00 },
    { id: 158, categoria: 'Guarniciones', nombre: 'Porción de Hot Dog', precio: 2.00 }
  ];

  constructor(
    private router: Router, 
    private toastCtrl: ToastController,
    private pedidoService: PedidoService
  ) {
    // Activamos los íconos dinámicos en el ciclo Standalone
    addIcons({
      'restaurant-outline': restaurantOutline,
      'arrow-back-outline': arrowBackOutline,
      'checkmark-circle-outline': checkmarkCircleOutline,
      'caret-back-outline': caretBackOutline,
      'caret-forward-outline': caretForwardOutline
    });
  }

  ngOnInit() { }

  // Filtro que alimenta directamente al *ngFor del HTML
  get productosFiltrados() {
    return this.productosBase.filter(p => p.categoria === this.categoriaSeleccionada);
  }

  setCategoria(cat: string) {
    this.categoriaSeleccionada = cat;
  }

  setTipoEntrega(tipo: string) {
    this.pedido.tipoEntrega = tipo;
    if (tipo === 'Recojo') {
      this.pedido.cliente.direccion = '';
    }
  }

  // Busca cuántas unidades de un plato van en la lista
  obtenerCantidad(producto: any): number {
    const item = this.pedido.items.find((i: any) => i.id === producto.id);
    return item ? item.cantidad : 0;
  }

  // Agrega una unidad al carrito interno
  aumentarCantidad(producto: any) {
    const item = this.pedido.items.find((i: any) => i.id === producto.id);
    if (item) {
      item.cantidad++;
    } else {
      this.pedido.items.push({
        id: producto.id,
        nombre: producto.nombre,
        precio: producto.precio,
        cantidad: 1
      });
    }
    this.calcularTotal();
  }

  // Resta una unidad y si llega a 0, limpia el producto
  disminuirCantidad(producto: any) {
    const item = this.pedido.items.find((i: any) => i.id === producto.id);
    if (item) {
      item.cantidad--;
      if (item.cantidad === 0) {
        this.pedido.items = this.pedido.items.filter((i: any) => i.id !== producto.id);
      }
    }
    this.calcularTotal();
  }

  calcularTotal() {
    this.pedido.total = this.pedido.items.reduce((sum: number, i: any) => sum + (i.precio * i.cantidad), 0);
  }

  volver() {
    this.router.navigate(['/tabs/inicio']); // Ajustado al path común de las pestañas
  }

  // Retorna un emoji divertido según la categoría de comida
  obtenerEmoji(categoria: string): string {
    switch (categoria) {
      case 'Pollos': return '🍗';
      case 'Bebidas': return '🥤';
      case 'Chifa': return '🥢';
      case 'Criollos': return '🍛';
      case 'Parrillas': return '🥩';
      default: return '🍟';
    }
  }

  async registrarPedido() {
    // Validaciones indispensables de seguridad
    if (!this.pedido.cliente.nombre || this.pedido.cliente.nombre.trim() === '') {
      this.mostrarToast('Por favor, ingresa el nombre del cliente.');
      return;
    }

    if (this.pedido.tipoEntrega === 'Delivery' && (!this.pedido.cliente.direccion || this.pedido.cliente.direccion.trim() === '')) {
      this.mostrarToast('Por favor, ingresa la dirección para el Delivery.');
      return;
    }

    if (this.pedido.items.length === 0) {
      this.mostrarToast('Debe agregar al menos un plato al pedido.');
      return;
    }

    // Despachamos la orden estructurada al BehaviorSubject de PedidoService
    this.pedidoService.crearPedido({
      cliente: { ...this.pedido.cliente },
      tipoEntrega: this.pedido.tipoEntrega,
      estado: 'pendiente', // Sincronizado con los estados de tu DashboardService
      items: [...this.pedido.items],
      total: this.pedido.total,
      fecha: new Date().toISOString()
    });

    await this.mostrarToast('¡Pedido enviado a cocina con éxito!');
    
    // Reseteamos el formulario limpio
    this.pedido = {
      cliente: { nombre: '', telefono: '', direccion: '' },
      tipoEntrega: 'Recojo',
      items: [],
      total: 0
    };

    // Redirección automática a la sección de órdenes en proceso
    this.router.navigate(['/tabs/activos']);
  }

  async mostrarToast(mensaje: string) {
    const toast = await this.toastCtrl.create({
      message: mensaje,
      duration: 2000,
      position: 'bottom'
    });
    await toast.present();
  }
}