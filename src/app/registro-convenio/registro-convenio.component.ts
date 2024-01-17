import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { MatDialog } from '@angular/material/dialog';
import { LoadingBackdropComponent } from '../loading-backdrop/loading-backdrop.component';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';


@Component({
  selector: 'app-registro-convenio',
  templateUrl: './registro-convenio.component.html',
  styleUrls: ['./registro-convenio.component.scss'],
})
export class RegistroConvenioComponent implements OnInit {
  minDate: Date;
  convenioForm: FormGroup;

  tiposDeuda: any[] = [];
  tiposContacto: any[] = [];
  formularioEnviado = false;

  constructor(
    private formBuilder: FormBuilder,
    private miServicioApi: ApiService,
    public dialog: MatDialog
  ) {
    this.convenioForm = this.formBuilder.group({});
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();
    const currentDay = new Date().getDate();
    this.minDate = new Date(currentYear, currentMonth, currentDay);
  }

  ngOnInit(): void {
    this.minDate = new Date();
    this.convenioForm = this.formBuilder.group({
      cliente: this.formBuilder.group({
        Nombres: ['', Validators.required],
        Apellidos: ['', Validators.required],
        Cedula: ['', Validators.required],
        DireccionCasa: ['', Validators.required],
        DireccionTrabajo: ['', Validators.required],
        EmailPersonal: ['', Validators.required],
        EmailTrabajo: ['', Validators.required],
        TelefonoCelular: ['', Validators.required],
        TelefonoCasa: ['', Validators.required],
        TelefonoOficina: ['', Validators.required],
      }),
      intencionPago: this.formBuilder.group({
        CodTipoDeuda: ['', Validators.required],
        MontoIntencionPago: ['', Validators.required],
        HorarioDesde: ['', Validators.required],
        HorarioHasta: ['', Validators.required],
        TelefonoContactabilidad: ['', Validators.required],
        FechaIntencion: ['', Validators.required],
      }),
    });

    this.cargarTiposDeuda();
    this.cargarTiposContacto();
  }

  getFormControls(formGroup: FormGroup): string[] {
    return Object.keys(formGroup.controls);
  }

  cargarTiposDeuda(): void {
    this.miServicioApi.get('tipoDeuda').subscribe({
      next: (datos) => {
        this.tiposDeuda = datos;
      },
      error: (error) => {
        console.error('Error al cargar tipos de deuda:', error);
      },
    });
  }

  cargarTiposContacto(): void {
    this.miServicioApi.get('tiposContacto').subscribe({
      next: (datos) => {
        this.tiposContacto = datos;
      },
      error: (error) => {
        console.error('Error al cargar tipos de contacto:', error);
      },
    });
  }


  onSubmit() {
    this.formularioEnviado = true;
    if (this.convenioForm.valid) {
      const formData = this.convenioForm.value;
      formData.intencionPago.CedulaCliente = formData.cliente.Cedula;
      const registroConvenioPago = {
        Cliente: formData.cliente,
        IntencionPago: formData.intencionPago,
      };

      // Abrir el modal de carga
      const loadingDialogRef = this.dialog.open(LoadingBackdropComponent, {
        width: '100%',
        height: '100%',
        panelClass: 'full-screen-modal',
        disableClose: true,
      });

      this.miServicioApi
        .post('registrarConvenio', registroConvenioPago)
        .subscribe({
          next: (respuesta) => {
            loadingDialogRef.close();

            // Suponiendo que la respuesta es exitosa y contiene un mensaje para mostrar
            this.openConfirmationDialog(
              'Solicitud de convenio de pago generado correctamente.'
            );
          },
          error: (error) => {
            loadingDialogRef.close();

            const errorMessage =
              error.error.errorMessage ||
              'Error al enviar formulario. Intente de nuevo más tarde.';

            this.openConfirmationDialog(errorMessage);
          },
        });
    } else {
      console.log('Formulario no es válido');
    }
  }

  openConfirmationDialog(message: string) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '400px',
      data: {
        title: 'Resultado de la operación',
        message: message,
        acceptButtonText: 'Aceptar',
      },
    });

    dialogRef.afterClosed().subscribe(() => {
      this.convenioForm.reset();
    });
  }
}
