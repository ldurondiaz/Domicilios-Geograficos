// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: true,
  //páginas
  paginaMenu: '/menu',
  paginaCapturar: '/capturar',
  paginaEditar: '/editar',
  paginaExportar: '/exportar',
  //
  baseUrl: 'http://localhost',
  puerto: 3003,
  entidades: '/entidades',
  municipios: '/municipios',
  localidades: '/localidades',
  tiposVialidades: '/tipos_vialidades',
  nombresVialidades: '/nombres_vialidades',
  tiposAsentamientos: '/tipos_asentamientos',
  nombresAsentamientos: '/nombres_asentamientos',
  domicilioGeografico: '/domicilio_geografico'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
