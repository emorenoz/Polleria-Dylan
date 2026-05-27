import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import {
  IonContent,
  IonItem,
  IonInput,
  IonButton
} from '@ionic/angular/standalone';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonContent,
    IonItem,
    IonInput,
    IonButton
  ]
})
export class LoginPage implements OnInit {

  // Variables vinculadas mediante [(ngModel)] en el HTML
  usuario = '';
  password = '';
  
  // Corregido: Inicializado en null para garantizar que el @if del HTML funcione a la perfección
  errorMensaje: string | null = null;

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {}

  ingresar(): void {
    // Validación previa: Si los campos están vacíos ni siquiera consultamos al servicio
    if (!this.usuario.trim() || !this.password.trim()) {
      this.errorMensaje = 'Por favor, complete todos los campos.';
      return;
    }

    // Ejecutamos la autenticación mediante el servicio central
    const ok = this.authService.login(this.usuario, this.password);

    if (ok) {
      this.errorMensaje = null;
      // Redirección limpia hacia el menú de inicio de las pestañas
      this.router.navigateByUrl('/tabs/inicio');
    } else {
      // Se gatilla el bloque @if del HTML mostrando el mensaje en pantalla
      this.errorMensaje = 'Usuario o contraseña incorrectos';
    }
  }
}