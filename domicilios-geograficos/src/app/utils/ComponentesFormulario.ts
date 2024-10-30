import { FormGroup } from "@angular/forms";

export class ComponentesFormulario {

  static clearEnableFields(parentForm: FormGroup,
    cve_ent: string, cve_mun: string, cve_loc: string,
    buscar_nombre_vialidad: string, cve_tipo_vialidad: string, cve_nombre_vialidad: string,
    numero_exterior: string, numero_interior: string,
    buscar_nombre_asentamiento: string, cve_tipo_asentamiento: string, cve_nombre_asentamiento: string,
    codigo_postal: string,
    buscar_nombre_vialidad_referencia1: string, cve_tipo_vialidad_referencia1: string, cve_nombre_vialidad_referencia1: string,
    buscar_nombre_vialidad_referencia2: string, cve_tipo_vialidad_referencia2: string, cve_nombre_vialidad_referencia2: string,
    buscar_nombre_vialidad_posterior: string,  cve_tipo_vialidad_posterior: string, cve_nombre_vialidad_posterior: string,
    descripcion_ubicacion: string
  )
  {
    parentForm.get('cve_ent')?.setValue(cve_ent !== 'x' ? null : parentForm.get('cve_ent')?.value);
    parentForm.get('cve_ent')?.[cve_ent === 'e' ? 'enable' : cve_ent === 'd' ? 'disable' : 'enable']();
    parentForm.get('cve_mun')?.setValue(cve_mun !== 'x' ? null : parentForm.get('cve_mun')?.value);
    parentForm.get('cve_mun')?.[cve_mun === 'e' ? 'enable' : cve_mun === 'd' ? 'disable' : 'enable']();
    parentForm.get('cve_loc')?.setValue(cve_loc !== 'x' ? null : parentForm.get('cve_loc')?.value);
    parentForm.get('cve_loc')?.[cve_loc === 'e' ? 'enable' : cve_loc === 'd' ? 'disable' : 'enable']();
    parentForm.get('buscar_nombre_vialidad')?.setValue(buscar_nombre_vialidad !== 'x' ? null : parentForm.get('buscar_nombre_vialidad')?.value);
    parentForm.get('buscar_nombre_vialidad')?.[buscar_nombre_vialidad === 'e' ? 'enable' : buscar_nombre_vialidad === 'd' ? 'disable' : 'enable']();
    parentForm.get('cve_tipo_vialidad')?.setValue(cve_tipo_vialidad !== 'x' ? null : parentForm.get('cve_tipo_vialidad')?.value);
    parentForm.get('cve_tipo_vialidad')?.[cve_tipo_vialidad === 'e' ? 'enable' : cve_tipo_vialidad === 'd' ? 'disable' : 'enable']();
    parentForm.get('cve_nombre_vialidad')?.setValue(cve_nombre_vialidad !== 'x' ? null : parentForm.get('cve_nombre_vialidad')?.value);
    parentForm.get('cve_nombre_vialidad')?.[cve_nombre_vialidad === 'e' ? 'enable' : cve_nombre_vialidad === 'd' ? 'disable' : 'enable']();
    parentForm.get('numero_exterior')?.setValue(numero_exterior !== 'x' ? null : parentForm.get('numero_exterior')?.value);
    parentForm.get('numero_exterior')?.[numero_exterior === 'e' ? 'enable' : numero_exterior === 'd' ? 'disable' : 'enable']();
    parentForm.get('numero_interior')?.setValue(numero_interior !== 'x' ? null : parentForm.get('numero_interior')?.value);
    parentForm.get('numero_interior')?.[numero_interior === 'e' ? 'enable' : numero_interior === 'd' ? 'disable' : 'enable']();
    parentForm.get('buscar_nombre_asentamiento')?.setValue(buscar_nombre_asentamiento !== 'x' ? null : parentForm.get('buscar_nombre_asentamiento')?.value);
    parentForm.get('buscar_nombre_asentamiento')?.[buscar_nombre_asentamiento === 'e' ? 'enable' : buscar_nombre_asentamiento === 'd' ? 'disable' : 'enable']();
    parentForm.get('cve_tipo_asentamiento')?.setValue(cve_tipo_asentamiento !== 'x' ? null : parentForm.get('cve_tipo_asentamiento')?.value);
    parentForm.get('cve_tipo_asentamiento')?.[cve_tipo_asentamiento === 'e' ? 'enable' : cve_tipo_asentamiento === 'd' ? 'disable' : 'enable']();
    parentForm.get('cve_nombre_asentamiento')?.setValue(cve_nombre_asentamiento !== 'x' ? null : parentForm.get('cve_nombre_asentamiento')?.value);
    parentForm.get('cve_nombre_asentamiento')?.[cve_nombre_asentamiento === 'e' ? 'enable' : cve_nombre_asentamiento === 'd' ? 'disable' : 'enable']();
    parentForm.get('codigo_postal')?.setValue(codigo_postal !== 'x' ? null : parentForm.get('codigo_postal')?.value);
    parentForm.get('codigo_postal')?.[codigo_postal === 'e' ? 'enable' : codigo_postal === 'd' ? 'disable' : 'enable']();
    parentForm.get('buscar_nombre_vialidad_referencia1')?.setValue(buscar_nombre_vialidad_referencia1 !== 'x' ? null : parentForm.get('buscar_nombre_vialidad_referencia1')?.value);
    parentForm.get('buscar_nombre_vialidad_referencia1')?.[buscar_nombre_vialidad_referencia1 === 'e' ? 'enable' : buscar_nombre_vialidad_referencia1 === 'd' ? 'disable' : 'enable']();
    parentForm.get('cve_tipo_vialidad_referencia1')?.setValue(cve_tipo_vialidad_referencia1 !== 'x' ? null : parentForm.get('cve_tipo_vialidad_referencia1')?.value);
    parentForm.get('cve_tipo_vialidad_referencia1')?.[cve_tipo_vialidad_referencia1 === 'e' ? 'enable' : cve_tipo_vialidad_referencia1 === 'd' ? 'disable' : 'enable']();
    parentForm.get('cve_nombre_vialidad_referencia1')?.setValue(cve_nombre_vialidad_referencia1 !== 'x' ? null : parentForm.get('cve_nombre_vialidad_referencia1')?.value);
    parentForm.get('cve_nombre_vialidad_referencia1')?.[cve_nombre_vialidad_referencia1 === 'e' ? 'enable' : cve_nombre_vialidad_referencia1 === 'd' ? 'disable' : 'enable']();
    parentForm.get('buscar_nombre_vialidad_referencia2')?.setValue(buscar_nombre_vialidad_referencia2 !== 'x' ? null : parentForm.get('buscar_nombre_vialidad_referencia2')?.value);
    parentForm.get('buscar_nombre_vialidad_referencia2')?.[buscar_nombre_vialidad_referencia2 === 'e' ? 'enable' : buscar_nombre_vialidad_referencia2 === 'd' ? 'disable' : 'enable']();
    parentForm.get('cve_tipo_vialidad_referencia2')?.setValue(cve_tipo_vialidad_referencia2 !== 'x' ? null : parentForm.get('cve_tipo_vialidad_referencia2')?.value);
    parentForm.get('cve_tipo_vialidad_referencia2')?.[cve_tipo_vialidad_referencia2 === 'e' ? 'enable' : cve_tipo_vialidad_referencia2 === 'd' ? 'disable' : 'enable']();
    parentForm.get('cve_nombre_vialidad_referencia2')?.setValue(cve_nombre_vialidad_referencia2 !== 'x' ? null : parentForm.get('cve_nombre_vialidad_referencia2')?.value);
    parentForm.get('cve_nombre_vialidad_referencia2')?.[cve_nombre_vialidad_referencia2 === 'e' ? 'enable' : cve_nombre_vialidad_referencia2 === 'd' ? 'disable' : 'enable']();
    parentForm.get('buscar_nombre_vialidad_posterior')?.setValue(buscar_nombre_vialidad_posterior !== 'x' ? null : parentForm.get('buscar_nombre_vialidad_posterior')?.value);
    parentForm.get('buscar_nombre_vialidad_posterior')?.[buscar_nombre_vialidad_posterior === 'e' ? 'enable' : buscar_nombre_vialidad_posterior === 'd' ? 'disable' : 'enable']();
    parentForm.get('cve_tipo_vialidad_posterior')?.setValue(cve_tipo_vialidad_posterior !== 'x' ? null : parentForm.get('cve_tipo_vialidad_posterior')?.value);
    parentForm.get('cve_tipo_vialidad_posterior')?.[cve_tipo_vialidad_posterior === 'e' ? 'enable' : cve_tipo_vialidad_posterior === 'd' ? 'disable' : 'enable']();
    parentForm.get('cve_nombre_vialidad_posterior')?.setValue(cve_nombre_vialidad_posterior !== 'x' ? null : parentForm.get('cve_nombre_vialidad_posterior')?.value);
    parentForm.get('cve_nombre_vialidad_posterior')?.[cve_nombre_vialidad_posterior === 'e' ? 'enable' : cve_nombre_vialidad_posterior === 'd' ? 'disable' : 'enable']();
    parentForm.get('descripcion_ubicacion')?.setValue(descripcion_ubicacion !== 'x' ? null : parentForm.get('descripcion_ubicacion')?.value);
    parentForm.get('descripcion_ubicacion')?.[descripcion_ubicacion === 'e' ? 'enable' : descripcion_ubicacion === 'd' ? 'disable' : 'enable']();
  }

}
