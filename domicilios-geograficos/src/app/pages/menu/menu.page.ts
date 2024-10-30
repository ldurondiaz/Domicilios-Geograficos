import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonHeader, IonCard, IonToolbar, IonTitle, IonContent, IonButton, IonGrid, IonRow, IonCol, IonCardContent, IonAvatar, IonIcon, IonImg, IonCardHeader, IonCardTitle, IonCardSubtitle } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
  standalone: true,
  imports: [IonCardSubtitle, IonCardTitle, IonCardHeader, IonImg, IonIcon, CommonModule, FormsModule, IonAvatar, IonCardContent, IonCol, IonRow, IonGrid, IonButton, IonContent,
    IonTitle, IonToolbar, IonCard, IonHeader]
})
export class MenuPage implements OnInit {

  constructor(private router: Router) {
  }

  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngOnInit() {
    console.log('menu');
  }

  onClickCapturar() {
    console.log('capturar');
    this.router.navigateByUrl(environment.paginaCapturar);
  }

  onClickEditar() {
    console.log('Editar');
    this.router.navigateByUrl(environment.paginaEditar);
  }

  onClickExportar() {
    console.log('Exportar');
    this.router.navigateByUrl(environment.paginaExportar);
  }

}
