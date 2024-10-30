import { Component, OnInit } from '@angular/core';
import { IonicModule, AlertController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { CapturarService } from '../../services/capturar.service';
import { ComponentesFormulario } from 'src/app/utils/ComponentesFormulario';
import { Entidad } from 'src/app/model/entidad';
import { Municipio } from 'src/app/model/municipio';
import { Localidad } from 'src/app/model/localidad';
import { Vialidad } from 'src/app/model/vialidad';
import { Asentamiento } from 'src/app/model/asentamiento';
import { DomicilioGeografico } from 'src/app/model/domiciliogeografico';
import { Utils } from 'src/app/utils/utils';
import { addIcons } from 'ionicons';
import { informationCircleOutline } from 'ionicons/icons'

@Component({
  selector: 'app-capturar',
  templateUrl: './capturar.page.html',
  styleUrls: ['./capturar.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, FormsModule, ReactiveFormsModule, SharedModule]
})
export class CapturarPage implements OnInit {

  formularioCapturar!: FormGroup | any;
  public entidades!: Entidad[];
  public municipios!: Municipio[];
  public localidades!: Localidad[];
  public tiposVialidades!: Vialidad[];
  public nombresVialidades!: Vialidad[];
  public tiposAsentamientos!: Asentamiento[];
  public nombresAsentamientos!: Asentamiento[];
  public tiposVialidadesReferencia1!: Vialidad[];
  public nombresVialidadesReferencia1!: Vialidad[];
  public tiposVialidadesReferencia2!: Vialidad[];
  public nombresVialidadesReferencia2!: Vialidad[];
  public tiposVialidadesPosterior!: Vialidad[];
  public nombresVialidadesPosterior!: Vialidad[];

  private cve_ent: string = '';
  private nom_ent: string = '';
  private cve_mun: string = '';
  private nom_mun: string = '';
  private cve_loc: string = '';
  private nom_loc: string = '';
  private ambito: string = '';

  private buscar_nombre_vialidad: string = '';
  private cve_tipo_vialidad: string = '';
  private nom_tipo_vialidad: string = '';
  private cve_nombre_vialidad: string = '';
  private nom_nombre_vialidad: string = '';

  private buscar_nombre_asentamiento: string = '';
  private cve_tipo_asentamiento: string = '';
  private nom_tipo_asentamiento: string = '';
  private cve_nombre_asentamiento: string = '';
  private nom_nombre_asentamiento: string = '';

  private buscar_nombre_vialidad_referencia1: string = '';
  private cve_tipo_vialidad_referencia1: string = '';
  private nom_tipo_vialidad_referencia1: string = '';
  private cve_nombre_vialidad_referencia1: string = '';
  private nom_nombre_vialidad_referencia1: string = '';

  private buscar_nombre_vialidad_referencia2: string = '';
  private cve_tipo_vialidad_referencia2: string = '';
  private nom_tipo_vialidad_referencia2: string = '';
  private cve_nombre_vialidad_referencia2: string = '';
  private nom_nombre_vialidad_referencia2: string = '';

  private buscar_nombre_vialidad_posterior: string = '';
  private cve_tipo_vialidad_posterior: string = '';
  private nom_tipo_vialidad_posterior: string = '';
  private cve_nombre_vialidad_posterior: string = '';
  private nom_nombre_vialidad_posterior: string = '';

  isTooltipVisibleEntidad = false;
  isTooltipVisibleMunicipio = false;
  isTooltipVisibleLocalidad = false;
  isTooltipVisibleTipoVialidad = false;
  isTooltipVisibleNombreVialidad = false;
  isTooltipVisibleNumeroExterior = false;
  isTooltipVisibleNumeroInterior = false;
  isTooltipVisibleTipoAsentamiento = false;
  isTooltipVisibleNombreAsentamiento = false;
  isTooltipVisibleCodigoPostal = false;
  isTooltipVisibleTipoVialidadReferencia1 = false;
  isTooltipVisibleNombreVialidadReferencia1 = false;
  isTooltipVisibleTipoVialidadReferencia2 = false;
  isTooltipVisibleNombreVialidadReferencia2 = false;
  isTooltipVisibleTipoVialidadPosterior = false;
  isTooltipVisibleNombreVialidadPosterior = false;
  isTooltipVisibleDescripcionUbicacion = false;

  constructor(private fb: FormBuilder, private capturarSvc: CapturarService, private alertController: AlertController) {
    addIcons({ informationCircleOutline });
    this.formularioCapturar = this.fb.group({
      'cve_ent': new FormControl("", Validators.required),
      'cve_mun': new FormControl({ value: "", disabled: true }, Validators.required),
      'cve_loc' : new FormControl({ value: "", disabled: true }, Validators.required),

      'buscar_nombre_vialidad': new FormControl({ value: "", disabled: true }, Validators.maxLength(255)),
      'cve_tipo_vialidad'     : new FormControl({ value: "", disabled: true }, Validators.required),
      'cve_nombre_vialidad'   : new FormControl({ value: "", disabled: true }, Validators.required),

      'numero_exterior': new FormControl({ value: "", disabled: true }, Validators.maxLength(50)),
      'numero_interior': new FormControl({ value: "", disabled: true }, Validators.maxLength(50)),

      'buscar_nombre_asentamiento': new FormControl({ value: "", disabled: true }, Validators.maxLength(255)),
      'cve_tipo_asentamiento'     : new FormControl({ value: "", disabled: true }, Validators.required),
      'cve_nombre_asentamiento'   : new FormControl({ value: "", disabled: true }, Validators.required),

      'codigo_postal': new FormControl({ value: "", disabled: true }, [Validators.required, Validators.pattern(/^\d{5}$/)]),

      'buscar_nombre_vialidad_referencia1': new FormControl({ value: "", disabled: true }, Validators.maxLength(255)),
      'cve_tipo_vialidad_referencia1'     : new FormControl({ value: "", disabled: true }, Validators.required),
      'cve_nombre_vialidad_referencia1'   : new FormControl({ value: "", disabled: true }, Validators.required),

      'buscar_nombre_vialidad_referencia2': new FormControl({ value: "", disabled: true }, Validators.maxLength(255)),
      'cve_tipo_vialidad_referencia2'     : new FormControl({ value: "", disabled: true }, Validators.required),
      'cve_nombre_vialidad_referencia2'   : new FormControl({ value: "", disabled: true }, Validators.required),

      'buscar_nombre_vialidad_posterior': new FormControl({ value: "", disabled: true }, Validators.maxLength(255)),
      'cve_tipo_vialidad_posterior'     : new FormControl({ value: "", disabled: true }, Validators.required),
      'cve_nombre_vialidad_posterior'   : new FormControl({ value: "", disabled: true }, Validators.required),

      'descripcion_ubicacion': new FormControl({ value: "", disabled: true }/*, Validators.required*/)
      });
  }

  actionTooltip(param: string, sw: boolean) {
    switch (param) {
      case 'E': this.isTooltipVisibleEntidad = sw; break;
      case 'M': this.isTooltipVisibleMunicipio = sw; break;
      case 'L': this.isTooltipVisibleLocalidad = sw; break;
      case 'TV': this.isTooltipVisibleTipoVialidad = sw; break;
      case 'NV': this.isTooltipVisibleNombreVialidad = sw; break;
      case 'NE': this.isTooltipVisibleNumeroExterior = sw; break;
      case 'NI': this.isTooltipVisibleNumeroInterior = sw; break;
      case 'TA': this.isTooltipVisibleTipoAsentamiento = sw; break;
      case 'NA': this.isTooltipVisibleNombreAsentamiento = sw; break;
      case 'CP': this.isTooltipVisibleCodigoPostal = sw; break;
      case 'TVR1': this.isTooltipVisibleTipoVialidadReferencia1 = sw; break;
      case 'NVR1': this.isTooltipVisibleNombreVialidadReferencia1 = sw; break;
      case 'TVR2': this.isTooltipVisibleTipoVialidadReferencia2 = sw; break;
      case 'NVR2': this.isTooltipVisibleNombreVialidadReferencia2 = sw; break;
      case 'TVP': this.isTooltipVisibleTipoVialidadPosterior = sw; break;
      case 'NVP': this.isTooltipVisibleNombreVialidadPosterior = sw; break;
      case 'DU': this.isTooltipVisibleDescripcionUbicacion = sw; break;
    }
  }

  showTooltip(param: string) {
    this.actionTooltip(param, true);
  }

  hideTooltip(param: string) {
    this.actionTooltip(param, false);
  }

  ngOnInit() {
    this.detectarCambios();
    this.getEntidades();
  }

  detectarCambios() {
    // Detectar cambios en Entidad
    this.formularioCapturar.get('cve_ent')?.valueChanges.subscribe((cve_ent_valor: string) => {
      this.cve_ent = cve_ent_valor;
      if (this.entidades && this.entidades.length > 0) {
        const entidadSeleccionada = this.entidades.find(entidad => entidad.cve_ent === this.cve_ent);
        this.nom_ent = entidadSeleccionada ? entidadSeleccionada.nomgeo : '';
      }
    });

    // Detectar cambios en Municipio
    this.formularioCapturar.get('cve_mun')?.valueChanges.subscribe((cve_mun_valor: string) => {
      this.cve_mun = cve_mun_valor;
      if (this.municipios && this.municipios.length > 0) {
        const municipioSeleccionado = this.municipios.find(municipio => municipio.cve_mun === this.cve_mun);
        this.nom_mun = municipioSeleccionado ? municipioSeleccionado.nomgeo : '';
      }
    });

    // Detectar cambios en Localidad
    this.formularioCapturar.get('cve_loc')?.valueChanges.subscribe((cve_loc_valor: string) => {
      this.cve_loc = cve_loc_valor;
      if (this.localidades && this.localidades.length > 0) {
        const localidadSeleccionada = this.localidades.find(localidad => localidad.cve_loc === this.cve_loc);
        this.nom_loc = localidadSeleccionada ? localidadSeleccionada.nomgeo : '';
        this.ambito = (localidadSeleccionada) ? localidadSeleccionada.ambito : '';
      }
    });

    // Detectar cambios en Tipos de Vialidades
    this.formularioCapturar.get('cve_tipo_vialidad')?.valueChanges.subscribe((cve_tipo_vialidad_valor: string) => {
      this.cve_tipo_vialidad = cve_tipo_vialidad_valor;
      if (this.tiposVialidades && this.tiposVialidades.length > 0) {
        const tipoVialidadSeleccionada = this.tiposVialidades.find(tipoVialidad => tipoVialidad.cve_tipovial === this.cve_tipo_vialidad);
        this.nom_tipo_vialidad = (tipoVialidadSeleccionada) ? tipoVialidadSeleccionada.descripcion : '';
      }
    });

    // Detectar cambios en Nombres de Vialidades
    this.formularioCapturar.get('cve_nombre_vialidad')?.valueChanges.subscribe((cve_nombre_vialidad_valor: string) => {
      this.cve_nombre_vialidad = cve_nombre_vialidad_valor;
      if (this.nombresVialidades && this.nombresVialidades.length > 0) {
        const nombreVialidadSeleccionada = this.nombresVialidades.find(nombreVialidad => nombreVialidad.cvevial === this.cve_nombre_vialidad);
        this.nom_nombre_vialidad = (nombreVialidadSeleccionada) ? nombreVialidadSeleccionada.nomvial : '';
      }
    });

    // Detectar cambios en Tipos de Asentamientos
    this.formularioCapturar.get('cve_tipo_asentamiento')?.valueChanges.subscribe((cve_tipo_asentamiento_valor: string) => {
      this.cve_tipo_asentamiento = cve_tipo_asentamiento_valor;
      if (this.tiposAsentamientos && this.tiposAsentamientos.length > 0) {
        const tipoAsentamientoSeleccionado = this.tiposAsentamientos.find(tipoAsentamiento => tipoAsentamiento.cve_tipoasen === this.cve_tipo_asentamiento);
        this.nom_tipo_asentamiento = (tipoAsentamientoSeleccionado) ? tipoAsentamientoSeleccionado.descripcion : '';
      }
    });

    // Detectar cambios en Nombres de Asentamientos
    this.formularioCapturar.get('cve_nombre_asentamiento')?.valueChanges.subscribe((cve_nombre_asentamiento_valor: string) => {
      this.cve_nombre_asentamiento = cve_nombre_asentamiento_valor;
      if (this.nombresAsentamientos && this.nombresAsentamientos.length > 0) {
        const nombreAsentamientoSeleccionado = this.nombresAsentamientos.find(nombreAsentamiento => nombreAsentamiento.cve_asen === this.cve_nombre_asentamiento);
        this.nom_nombre_asentamiento = (nombreAsentamientoSeleccionado) ? nombreAsentamientoSeleccionado.nom_asen : '';
      }
    });

    // Detectar cambios en Tipos de Vialidades Referencia1
    this.formularioCapturar.get('cve_tipo_vialidad_referencia1')?.valueChanges.subscribe((cve_tipo_vialidad_referencia1_valor: string) => {
      this.cve_tipo_vialidad_referencia1 = cve_tipo_vialidad_referencia1_valor;
      if (this.tiposVialidadesReferencia1 && this.tiposVialidadesReferencia1.length > 0) {
        const tipoVialidadReferencia1Seleccionada = this.tiposVialidadesReferencia1.find(tipoVialidadReferencia1 => tipoVialidadReferencia1.cve_tipovial === this.cve_tipo_vialidad_referencia1);
        this.nom_tipo_vialidad_referencia1 = (tipoVialidadReferencia1Seleccionada) ? tipoVialidadReferencia1Seleccionada.descripcion : '';
      }
    });

    // Detectar cambios en Nombres de Vialidades Referencia1
    this.formularioCapturar.get('cve_nombre_vialidad_referencia1')?.valueChanges.subscribe((cve_nombre_vialidad_referencia1_valor: string) => {
      this.cve_nombre_vialidad_referencia1 = cve_nombre_vialidad_referencia1_valor;
      if (this.nombresVialidadesReferencia1 && this.nombresVialidadesReferencia1.length > 0) {
        const nombreVialidadReferencia1Seleccionada = this.nombresVialidadesReferencia1.find(nombreVialidadReferencia1 => nombreVialidadReferencia1.cvevial === this.cve_nombre_vialidad_referencia1);
        this.nom_nombre_vialidad_referencia1 = (nombreVialidadReferencia1Seleccionada) ? nombreVialidadReferencia1Seleccionada.nomvial : '';      }
    });

    // Detectar cambios en Tipos de Vialidades Referencia2
    this.formularioCapturar.get('cve_tipo_vialidad_referencia2')?.valueChanges.subscribe((cve_tipo_vialidad_referencia2_valor: string) => {
      this.cve_tipo_vialidad_referencia2 = cve_tipo_vialidad_referencia2_valor;
      if (this.tiposVialidadesReferencia2 && this.tiposVialidadesReferencia2.length > 0) {
        const tipoVialidadReferencia2Seleccionada = this.tiposVialidadesReferencia2.find(tipoVialidadReferencia2 => tipoVialidadReferencia2.cve_tipovial === this.cve_tipo_vialidad_referencia2);
        this.nom_tipo_vialidad_referencia2 = (tipoVialidadReferencia2Seleccionada) ? tipoVialidadReferencia2Seleccionada.descripcion : '';
      }
    });

    // Detectar cambios en Nombres de Vialidades Referencia2
    this.formularioCapturar.get('cve_nombre_vialidad_referencia2')?.valueChanges.subscribe((cve_nombre_vialidad_referencia2_valor: string) => {
      this.cve_nombre_vialidad_referencia2 = cve_nombre_vialidad_referencia2_valor;
      if (this.nombresVialidadesReferencia2 && this.nombresVialidadesReferencia2.length > 0) {
        const nombreVialidadReferencia2Seleccionada = this.nombresVialidadesReferencia2.find(nombreVialidadReferencia2 => nombreVialidadReferencia2.cvevial === this.cve_nombre_vialidad_referencia2);
        this.nom_nombre_vialidad_referencia2 = (nombreVialidadReferencia2Seleccionada) ? nombreVialidadReferencia2Seleccionada.nomvial : '';
      }
    });

    // Detectar cambios en Tipos de Vialidades Posterior
    this.formularioCapturar.get('cve_tipo_vialidad_posterior')?.valueChanges.subscribe((cve_tipo_vialidad_posterior_valor: string) => {
      this.cve_tipo_vialidad_posterior = cve_tipo_vialidad_posterior_valor;
      if (this.tiposVialidadesPosterior && this.tiposVialidadesPosterior.length > 0) {
        const tipoVialidadPosteriorSeleccionada = this.tiposVialidadesPosterior.find(tipoVialidadPosterior => tipoVialidadPosterior.cve_tipovial === this.cve_tipo_vialidad_posterior);
        this.nom_tipo_vialidad_posterior = (tipoVialidadPosteriorSeleccionada) ? tipoVialidadPosteriorSeleccionada.descripcion : '';
      }
    });

    // Detectar cambios en Nombres de Vialidades Posterior
    this.formularioCapturar.get('cve_nombre_vialidad_posterior')?.valueChanges.subscribe((cve_nombre_vialidad_posterior_valor: string) => {
      this.cve_nombre_vialidad_posterior = cve_nombre_vialidad_posterior_valor;
      if (this.nombresVialidadesPosterior && this.nombresVialidadesPosterior.length > 0) {
        const nombreVialidadPosteriorSeleccionada = this.nombresVialidadesPosterior.find(nombreVialidadPosterior => nombreVialidadPosterior.cvevial === this.cve_nombre_vialidad_posterior);
        this.nom_nombre_vialidad_posterior = (nombreVialidadPosteriorSeleccionada) ? nombreVialidadPosteriorSeleccionada.nomvial : '';
      }
    });
  }

  getEntidades() {
    this.entidades = [];
    this.capturarSvc.getEntidades().subscribe({
      next: (response: any) => {
        this.entidades = response;
        if (this.entidades) {
          console.log('entidades->', this.entidades);
          ComponentesFormulario.clearEnableFields(this.formularioCapturar, 'e', 'd', 'd',   'd', 'd', 'd',   'd', 'd',   'd', 'd', 'd',   'd',   'd', 'd', 'd',   'd', 'd', 'd',   'd', 'd', 'd',   'd');
        } else {
          console.log('Error al leer datos de la entidad');
        }
      },
      error: (error: any) => {
        console.log('Error al leer datos de la entidad');
        console.log(error);
      }
    });
  }

  getMunicipios() {
    this.municipios = [];
    this.capturarSvc.getMunicipios(this.cve_ent).subscribe({
      next: (response: any) => {
        this.municipios = response;
        if (this.municipios) {
          console.log('municipios->', this.municipios);
          ComponentesFormulario.clearEnableFields(this.formularioCapturar, 'x', 'e', 'd',   'd', 'd', 'd',   'd', 'd',   'd', 'd', 'd',   'd',   'd', 'd', 'd',   'd', 'd', 'd',   'd', 'd', 'd',   'd');
        } else {
          console.log('Error al leer datos del municipios');
        }
    },
      error: (error: any) => {
        console.log('Error al leer datos del municipios');
        console.log(error);
      }
    });
  }

  getLocalidades() {
    this.localidades = [];
    this.capturarSvc.getLocalidades(this.cve_ent, this.cve_mun).subscribe({
      next: (response: any) => {
        this.localidades = response;
        if (this.localidades) {
          console.log('localidades->', this.localidades);
          ComponentesFormulario.clearEnableFields(this.formularioCapturar, 'x', 'x', 'e',   'd', 'd', 'd',   'd', 'd',   'd', 'd', 'd',   'd',   'd', 'd', 'd',   'd', 'd', 'd',   'd', 'd', 'd',   'd');
        } else {
          console.log('Error al leer datos de las localidades');
        }
      },
      error: (error: any) => {
        console.log('Error al leer datos de las localidades');
        console.log(error);
      }
    });
  }

  getBuscarNombreVialidad(buscar_nombre_vialidad_param: any) {
    this.buscar_nombre_vialidad = (buscar_nombre_vialidad_param === '') ? '' : (buscar_nombre_vialidad_param.target as HTMLInputElement).value;
    this.getTiposVialidades();
  }

  getTiposVialidades() {
    if (this.buscar_nombre_vialidad === '') {
      this.buscar_nombre_vialidad = 'L*G*D*D';
    }
    console.log('this.buscar_nombre_vialidad->', this.buscar_nombre_vialidad);
    this.tiposVialidades = [];
    this.capturarSvc.getTiposVialidades(this.cve_ent, this.cve_mun, this.cve_loc, this.buscar_nombre_vialidad).subscribe({
      next: (response: any) => {
        this.tiposVialidades = response;
        console.log('this.tiposVialidades:',this.tiposVialidades);
        if (this.tiposVialidades.length > 0) {
          if (this.tiposVialidades) {
            ComponentesFormulario.clearEnableFields(this.formularioCapturar, 'x', 'x', 'x',   'x', 'e', 'd',   'd', 'd',   'd', 'd', 'd',   'd',   'd', 'd', 'd',   'd', 'd', 'd',   'd', 'd', 'd',   'd');
          } else {
            console.log('Error al leer datos de tipos vialidades');
          }
        } else {
          ComponentesFormulario.clearEnableFields(this.formularioCapturar, 'x', 'x', 'x',   'd', 'd', 'd',   'd', 'd',   'd', 'd', 'd',   'd',   'd', 'd', 'd',   'd', 'd', 'd',   'd', 'd', 'd',   'd');
          this.mensajeErrorTipoVialidad();
        }
      },
      error: (error: any) => {
        console.log('Error al leer datos de tipos vialidades');
        console.log(error);
      }
    });
  }

  getNombresVialidades() {
    this.nombresVialidades = [];
    this.capturarSvc.getNombresVialidades(this.cve_ent, this.cve_mun, this.cve_loc, this.cve_tipo_vialidad, this.buscar_nombre_vialidad).subscribe({
      next: (response: any) => {
        this.nombresVialidades = response;
        if (this.nombresVialidades) {
          ComponentesFormulario.clearEnableFields(this.formularioCapturar, 'x', 'x', 'x',   'x', 'x', 'e',   'd', 'd',   'd', 'd', 'd',   'd',   'd', 'd', 'd',   'd', 'd', 'd',   'd', 'd', 'd',   'd');
        } else {
          console.log('Error al leer datos de nombres vialidades');
        }
      },
      error: (error: any) => {
        console.log('Error al leer datos de nombres vialidades');
        console.log(error);
      }
    });
  }

  numeroExteriorEInterior() {
    ComponentesFormulario.clearEnableFields(this.formularioCapturar, 'x', 'x', 'x',   'x', 'x', 'x',   'e', 'e',   'e', 'e', 'd',   'd',   'd', 'd', 'd',   'd', 'd', 'd',   'd', 'd', 'd',   'd');
    this.getTiposAsentamientos();
  }

  getBuscarNombreAsentamiento(buscar_nombre_asentamiento_param: any) {
    this.buscar_nombre_asentamiento = (buscar_nombre_asentamiento_param === '') ? '' : (buscar_nombre_asentamiento_param.target as HTMLInputElement).value;
    this.getTiposAsentamientos();
  }

  getTiposAsentamientos() {
    if (this.buscar_nombre_asentamiento === '') {
      this.buscar_nombre_asentamiento = 'L*G*D*D';
    }
    console.log('this.buscar_nombre_asentamiento->', this.buscar_nombre_asentamiento);
    this.tiposAsentamientos = [];
    this.capturarSvc.getTiposAsentamientos(this.cve_ent, this.cve_mun, this.cve_loc, this.buscar_nombre_asentamiento).subscribe({
      next: (response: any) => {
        this.tiposAsentamientos = response;
        console.log('this.tiposAsentamientos:',this.tiposAsentamientos);
        if (this.tiposAsentamientos.length > 0) {
          if (this.tiposAsentamientos) {
            ComponentesFormulario.clearEnableFields(this.formularioCapturar, 'x', 'x', 'x',   'x', 'x', 'x',   'x', 'x',   'x', 'e', 'd',   'd',   'd', 'd', 'd',   'd', 'd', 'd',   'd', 'd', 'd',   'd');
          } else {
            console.log('Error al leer datos de tipos asentamientos');
          }
        } else {
          ComponentesFormulario.clearEnableFields(this.formularioCapturar, 'x', 'x', 'x',   'x', 'x', 'x',   'x', 'x',   'e', 'e', 'd',   'd',   'd', 'd', 'd',   'd', 'd', 'd',   'd', 'd', 'd',   'd');
          this.mensajeErrorTipoAsentamiento();
        }
      },
      error: (error: any) => {
        console.log('Error al leer datos de tipos asentamientos');
        console.log(error);
      }
    });
  }

  getNombresAsentamientos() {
    this.nombresAsentamientos = [];
    this.capturarSvc.getNombresAsentamientos(this.cve_ent, this.cve_mun, this.cve_loc, this.cve_tipo_asentamiento, this.buscar_nombre_asentamiento).subscribe({
      next: (response: any) => {
        this.nombresAsentamientos = response;
        if (this.nombresAsentamientos) {
          ComponentesFormulario.clearEnableFields(this.formularioCapturar, 'x', 'x', 'x',   'x', 'x', 'x',   'x', 'x',   'x', 'x', 'e',   'd',   'd', 'd', 'd',   'd', 'd', 'd',   'd', 'd', 'd',   'd');
        } else {
          console.log('Error al leer datos de nombres asentamientos');
        }
      },
      error: (error: any) => {
        console.log('Error al leer datos de nombres asentamientos');
        console.log(error);
      }
    });
  }

  codigoPostal() {
    ComponentesFormulario.clearEnableFields(this.formularioCapturar, 'x', 'x', 'x',   'x', 'x', 'x',   'x', 'x',   'x', 'x', 'x',   'e',   'e', 'e', 'd',   'd', 'd', 'd',   'd', 'd', 'd',   'd');
    this.getTiposVialidadesReferencia1();
  }

  getBuscarNombreVialidadReferencia1(buscar_nombre_vialidad_referencia1_param: any) {
    this.buscar_nombre_vialidad_referencia1 = (buscar_nombre_vialidad_referencia1_param === '') ? '' : (buscar_nombre_vialidad_referencia1_param.target as HTMLInputElement).value;
    this.getTiposVialidadesReferencia1();
  }

  getTiposVialidadesReferencia1() {
    if (this.buscar_nombre_vialidad_referencia1 === '') {
      this.buscar_nombre_vialidad_referencia1 = 'L*G*D*D';
    }
    console.log('this.buscar_nombre_vialidad_referencia1->', this.buscar_nombre_vialidad_referencia1);
    this.tiposVialidadesReferencia1 = [];
    this.capturarSvc.getTiposVialidades(this.cve_ent, this.cve_mun, this.cve_loc, this.buscar_nombre_vialidad_referencia1).subscribe({
      next: (response: any) => {
        this.tiposVialidadesReferencia1 = response;
        console.log('this.tiposVialidadesReferencia1:',this.tiposVialidadesReferencia1);
        if (this.tiposVialidadesReferencia1) {
          ComponentesFormulario.clearEnableFields(this.formularioCapturar, 'x', 'x', 'x',   'x', 'x', 'x',   'x', 'x',   'x', 'x', 'x',   'x',   'x', 'e', 'd',   'd', 'd', 'd',   'd', 'd', 'd',   'd');
        } else {
          console.log('Error al leer datos de tipos vialidades referencia 1');
        }
      },
      error: (error: any) => {
        console.log('Error al leer datos de tipos vialidades referencia 1');
        console.log(error);
      }
    });
  }

  getNombresVialidadesReferencia1() {
    this.nombresVialidadesReferencia1 = [];
    this.capturarSvc.getNombresVialidades(this.cve_ent, this.cve_mun, this.cve_loc, this.cve_tipo_vialidad_referencia1, this.buscar_nombre_vialidad_referencia1).subscribe({
      next: (response: any) => {
        this.nombresVialidadesReferencia1 = response;
        if (this.nombresVialidadesReferencia1) {
          ComponentesFormulario.clearEnableFields(this.formularioCapturar, 'x', 'x', 'x',   'x', 'x', 'x',   'x', 'x',   'x', 'x', 'x',   'x',   'x', 'x', 'e',   'd', 'd', 'd',   'd', 'd', 'd',   'd');
        } else {
          console.log('Error al leer datos de nombres vialidades referencia 1');
        }
      },
      error: (error: any) => {
        console.log('Error al leer datos de nombres vialidades referencia 1');
        console.log(error);
      }
    });
  }

  getBuscarNombreVialidadReferencia2(buscar_nombre_vialidad_referencia2_param: any) {
    this.buscar_nombre_vialidad_referencia2 = (buscar_nombre_vialidad_referencia2_param === '') ? '' : (buscar_nombre_vialidad_referencia2_param.target as HTMLInputElement).value;
  }

  getTiposVialidadesReferencia2() {
    if (this.buscar_nombre_vialidad_referencia2 === '') {
      this.buscar_nombre_vialidad_referencia2 = 'L*G*D*D';
    }
    console.log('this.buscar_nombre_vialidad_referencia2->', this.buscar_nombre_vialidad_referencia2);
    this.tiposVialidadesReferencia2 = [];
    this.capturarSvc.getTiposVialidades(this.cve_ent, this.cve_mun, this.cve_loc, this.buscar_nombre_vialidad_referencia2).subscribe({
      next: (response: any) => {
        this.tiposVialidadesReferencia2 = response;
        console.log('this.tiposVialidadesReferencia2:',this.tiposVialidadesReferencia2);
        if (this.tiposVialidadesReferencia2) {
          ComponentesFormulario.clearEnableFields(this.formularioCapturar, 'x', 'x', 'x',   'x', 'x', 'x',   'x', 'x',   'x', 'x', 'x',   'x',   'x', 'x', 'x',   'x', 'e', 'd',   'd', 'd', 'd',   'd');
        } else {
          console.log('Error al leer datos de tipos vialidades referencia 2');
        }
      },
      error: (error: any) => {
        console.log('Error al leer datos de tipos vialidades referencia 2');
        console.log(error);
      }
    });
  }

  getNombresVialidadesReferencia2() {
    this.nombresVialidadesReferencia2 = [];
    this.capturarSvc.getNombresVialidades(this.cve_ent, this.cve_mun, this.cve_loc, this.cve_tipo_vialidad_referencia2, this.buscar_nombre_vialidad_referencia2).subscribe({
      next: (response: any) => {
        this.nombresVialidadesReferencia2 = response;
        if (this.nombresVialidadesReferencia2) {
          ComponentesFormulario.clearEnableFields(this.formularioCapturar, 'x', 'x', 'x',   'x', 'x', 'x',   'x', 'x',   'x', 'x', 'x',   'x',   'x', 'x', 'x',   'x', 'x', 'e',   'd', 'd', 'd',   'd');
        } else {
          console.log('Error al leer datos de nombres vialidades referencia 2');
        }
      },
      error: (error: any) => {
        console.log('Error al leer datos de nombres vialidades referencia 2');
        console.log(error);
      }
    });
  }

  getBuscarNombreVialidadPosterior(buscar_nombre_vialidad_posterior_param: any) {
    this.buscar_nombre_vialidad_posterior = (buscar_nombre_vialidad_posterior_param === '') ? '' : (buscar_nombre_vialidad_posterior_param.target as HTMLInputElement).value;
  }

  getTiposVialidadesPosterior() {
    if (this.buscar_nombre_vialidad_posterior === '') {
      this.buscar_nombre_vialidad_posterior = 'L*G*D*D';
    }
    console.log('this.buscar_nombre_vialidad_posterior->', this.buscar_nombre_vialidad_posterior);
    this.tiposVialidadesPosterior = [];
    this.capturarSvc.getTiposVialidades(this.cve_ent, this.cve_mun, this.cve_loc, this.buscar_nombre_vialidad_posterior).subscribe({
      next: (response: any) => {
        this.tiposVialidadesPosterior = response;
        console.log('this.tiposVialidadesPosterior:',this.tiposVialidadesPosterior);
        if (this.tiposVialidadesPosterior) {
          ComponentesFormulario.clearEnableFields(this.formularioCapturar, 'x', 'x', 'x',   'x', 'x', 'x',   'x', 'x',   'x', 'x', 'x',   'x',   'x', 'x', 'x',   'x', 'x', 'x',   'x', 'e', 'd',   'd');
        } else {
          console.log('Error al leer datos de tipos vialidades posterior');
        }
      },
      error: (error: any) => {
        console.log('Error al leer datos de tipos vialidades posterior');
        console.log(error);
      }
    });
  }

  getNombresVialidadesPosterior() {
    this.nombresVialidadesPosterior = [];
    this.capturarSvc.getNombresVialidades(this.cve_ent, this.cve_mun, this.cve_loc, this.cve_tipo_vialidad_posterior, this.buscar_nombre_vialidad_posterior).subscribe({
      next: (response: any) => {
        this.nombresVialidadesPosterior = response;
        if (this.nombresVialidadesPosterior) {
          ComponentesFormulario.clearEnableFields(this.formularioCapturar, 'x', 'x', 'x',   'x', 'x', 'x',   'x', 'x',   'x', 'x', 'x',   'x',   'x', 'x', 'x',   'x', 'x', 'x',   'x', 'x', 'e',   'd');
        } else {
          console.log('Error al leer datos de nombres vialidades posterior');
        }
      },
      error: (error: any) => {
        console.log('Error al leer datos de nombres vialidades posterior');
        console.log(error);
      }
    });
  }

  descripcionUbicacion() {
    ComponentesFormulario.clearEnableFields(this.formularioCapturar, 'x', 'x', 'x',   'x', 'x', 'x',   'x', 'x',   'x', 'x', 'x',   'x',   'x', 'x', 'x',   'x', 'x', 'x',   'x', 'x', 'x',   'e');
  }

  async mensajeErrorTipoVialidad() {
    const alert = await this.alertController.create({
      header: 'Error de tipos de vialidades',
      message: 'No existen tipos de vialidades en esta localidad, '
        + 'por favor seleccione otra localidad.',
        buttons: [{
          text: 'Aceptar',
          handler: () => {
            // Aquí defines lo que quieres que haga tu función al presionar OK
          }
        }],
      });
    alert.backdropDismiss = false;
    await alert.present();
  }

  async mensajeErrorTipoAsentamiento() {
    const alert = await this.alertController.create({
      header: 'Error de tipos de asentamientos',
      message: 'No existen tipos de asentamientos en esta localidad, '
        + 'por favor seleccione otra localidad.',
        buttons: [{
          text: 'Aceptar',
          handler: () => {
            // Aquí defines lo que quieres que haga tu función al presionar OK
          }
        }],
      });
    alert.backdropDismiss = false;
    await alert.present();
  }

  async submitForm() {
    if (this.formularioCapturar.invalid) {
      console.log('ERROR');
      console.log('this.formularioCapturar.value:', this.formularioCapturar.value);
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Faltan datos por capturar',
        buttons: ['Aceptar'],
      });
      alert.backdropDismiss = false;
      await alert.present();
      return;
    } else {
      let domicilioGeografico: DomicilioGeografico = new DomicilioGeografico;
      domicilioGeografico.id = Utils.generaIdUnico();
      domicilioGeografico.cve_ent = this.formularioCapturar.value.cve_ent;
      domicilioGeografico.nom_ent = this.nom_ent;
      domicilioGeografico.cve_mun = this.formularioCapturar.value.cve_mun;
      domicilioGeografico.nom_mun = this.nom_mun;
      domicilioGeografico.cve_loc = this.formularioCapturar.value.cve_loc;
      domicilioGeografico.nom_loc = this.nom_loc;
      domicilioGeografico.ambito = this.ambito;
      domicilioGeografico.cve_tipo_vialidad = this.formularioCapturar.value.cve_tipo_vialidad;
      domicilioGeografico.nom_tipo_vialidad = this.nom_tipo_vialidad;
      domicilioGeografico.cve_nombre_vialidad = this.formularioCapturar.value.cve_nombre_vialidad;
      domicilioGeografico.nom_nombre_vialidad = this.nom_nombre_vialidad;
      domicilioGeografico.numero_exterior = this.formularioCapturar.value.numero_exterior;
      domicilioGeografico.numero_interior = this.formularioCapturar.value.numero_interior;
      domicilioGeografico.cve_tipo_asentamiento = this.formularioCapturar.value.cve_tipo_asentamiento;
      domicilioGeografico.nom_tipo_asentamiento = this.nom_tipo_asentamiento;
      domicilioGeografico.cve_nombre_asentamiento = this.formularioCapturar.value.cve_nombre_asentamiento;
      domicilioGeografico.nom_nombre_asentamiento = this.nom_nombre_asentamiento;
      domicilioGeografico.codigo_postal = this.formularioCapturar.value.codigo_postal;
      domicilioGeografico.cve_tipo_vialidad_referencia1 = this.formularioCapturar.value.cve_tipo_vialidad_referencia1;
      domicilioGeografico.nom_tipo_vialidad_referencia1 = this.nom_tipo_vialidad_referencia1;
      domicilioGeografico.cve_nombre_vialidad_referencia1 = this.formularioCapturar.value.cve_nombre_vialidad_referencia1;
      domicilioGeografico.nom_nombre_vialidad_referencia1 = this.nom_nombre_vialidad_referencia1;
      domicilioGeografico.cve_tipo_vialidad_referencia2 = this.formularioCapturar.value.cve_tipo_vialidad_referencia2;
      domicilioGeografico.nom_tipo_vialidad_referencia2 = this.nom_tipo_vialidad_referencia2;
      domicilioGeografico.cve_nombre_vialidad_referencia2 = this.formularioCapturar.value.cve_nombre_vialidad_referencia2;
      domicilioGeografico.nom_nombre_vialidad_referencia2 = this.nom_nombre_vialidad_referencia2;
      domicilioGeografico.cve_tipo_vialidad_posterior = this.formularioCapturar.value.cve_tipo_vialidad_posterior;
      domicilioGeografico.nom_tipo_vialidad_posterior = this.nom_tipo_vialidad_posterior;
      domicilioGeografico.cve_nombre_vialidad_posterior = this.formularioCapturar.value.cve_nombre_vialidad_posterior;
      domicilioGeografico.nom_nombre_vialidad_posterior = this.nom_nombre_vialidad_posterior;
      domicilioGeografico.descripcion_ubicacion = this.formularioCapturar.value.descripcion_ubicacion;
      console.log('domicilioGeografico:', domicilioGeografico);
      this.capturarSvc.insertDomicilioGeografico(domicilioGeografico).subscribe({
        next: (response: any) => {
          console.log(response);
          this.mensajeRegistroExitoso();
        },
        error: (error: any) => {
          console.log('Ocurrió un error');
          console.log(error);
        }
      })
    }
  }

  async mensajeRegistroExitoso() {
    const aviso = await this.alertController.create({
      header: 'Datos registrados',
      message: 'Se han registrado los datos del domicilio geográfico',
      buttons: [{
        text: 'Aceptar',
        handler: () => {
          this.formularioCapturar.reset();
          this.ngOnInit();
          window.location.reload();
        }
      }],
    });
    aviso.backdropDismiss = false;
    aviso.onclick
    await aviso.present();
  }

}
