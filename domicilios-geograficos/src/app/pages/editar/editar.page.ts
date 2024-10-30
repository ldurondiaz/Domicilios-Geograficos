import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AlertController, IonContent, IonHeader, IonTitle, IonToolbar, IonGrid, IonRow, IonCol, IonAccordionGroup, IonAccordion, IonItem, IonChip, IonAvatar, IonLabel, IonCard, IonCardContent, IonButton, IonIcon } from '@ionic/angular/standalone';
import { DomicilioGeografico } from 'src/app/model/domiciliogeografico';
import { CapturarService } from '../../services/capturar.service';
import { SharedModule } from '../../shared/shared.module';
import { addIcons } from 'ionicons';
import { pencil, trashOutline } from 'ionicons/icons';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.page.html',
  styleUrls: ['./editar.page.scss'],
  standalone: true,
  imports: [IonIcon, IonButton, IonCardContent, IonCard, IonLabel, IonAvatar, IonChip, IonItem, IonAccordion, IonAccordionGroup,
    IonCol, IonRow, IonGrid, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, SharedModule]
})
export class EditarPage implements OnInit {

  public domiciliosGeograficos!: DomicilioGeografico[];
  public totalDomiciliosGeograficos: number = 0;

  constructor(private capturarSvc: CapturarService, private alertController: AlertController, private cdr: ChangeDetectorRef) {
    addIcons({ pencil, trashOutline });
  }

  ngOnInit() {
    this.leerDomicilioGeografico();
  }

  leerDomicilioGeografico() {
    this.capturarSvc.getDomicilioGeografico().subscribe({
      next: (res: any) => {
        this.domiciliosGeograficos = res;
        console.log('this.domiciliosGeograficos:', this.domiciliosGeograficos);
        this.totalDomiciliosGeograficos = this.domiciliosGeograficos.length;
        this.cdr.detectChanges();
      },
      error: (error: any) => {
        console.log('Error al leer datos del pedido:');
        console.log(error);
      }
    });
  }

  async eliminarDomicilioGeografico(dg: DomicilioGeografico) {
    console.log('eliminar el id', dg.id);
    const alert = await this.alertController.create({
      header: 'Confirmación',
      message:
/*      '¿Estás seguro de que deseas borrar el domicilio geográfico?\n'
      + dg.nom_tipo_vialidad + ' '
      + dg.nom_nombre_vialidad + ' '
      + dg.numero_exterior + ' '
      + dg.numero_interior + ' '
      + dg.nom_tipo_asentamiento + ' '
      + dg.nom_nombre_asentamiento + ' '
      + dg.codigo_postal + ' '
      + dg.nom_ent + ' '
      + dg.nom_mun + ' '
      + dg.nom_loc,*/
      `<div style="text-align: center; color: #007bff;">
                  <p><strong>Atención:</strong> Por favor, asegúrate de leer todo el mensaje.</p>
                  <p style="color: red;">Este es un mensaje importante en rojo.</p>
                  <p style="color: green;">Este es un mensaje en verde para detalles adicionales.</p>
                  <p style="font-size: 0.9em; color: #666;">* Esta acción no puede deshacerse</p>
                </div>`,
      buttons: [
        {
          text: 'Aceptar',
          handler: () => {
            this.capturarSvc.deleteDomicilioGeografico(dg.id).subscribe({
              next:(res:any)=>{
                console.log('El domicilio geográfico se elimino de forma exitosa')
                this.leerDomicilioGeografico();
              },
              error:(error:any)=>{
                console.log('Error al eliminar el domicilio geográfico')
              }
            })
          }
        },
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
          }
        }
      ]
    });
    await alert.present();
  }

  editarDomicilioGeografico(editar_param: string) {
    console.log('editar el id', editar_param);
  }

}
