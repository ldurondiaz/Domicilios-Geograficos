const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./queries');
const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const port = process.env.PORT || 3003;

app.get('/', (request, response) => {
    response.json({ info: 'API Domicilios Geográficos versión: 20240801 0800' });
});

//Endpoints
app.get('/entidades', db.leeEntidades);
app.get('/municipios/:cve_ent', db.leeMunicipios);
app.get('/localidades/:cve_ent/:cve_mun', db.leeLocalidades);

app.get('/tipos_vialidades/:cve_ent/:cve_mun/:cve_loc/:buscar_nombre_vialidad', db.leeTiposVialidades);
app.get('/nombres_vialidades/:cve_ent/:cve_mun/:cve_loc/:cve_tipo_vialidad/:buscar_nombre_vialidad', db.leeNombresVialidades);

app.get('/tipos_asentamientos/:cve_ent/:cve_mun/:cve_loc/:buscar_nombre_asentamiento', db.leeTiposAsentamientos);
app.get('/nombres_asentamientos/:cve_ent/:cve_mun/:cve_loc/:cve_tipo_asentamiento/:buscar_nombre_asentamiento', db.leeNombresAsentamientos);

app.post('/domicilio_geografico', db.insertaDomicilioGeografico);
app.get('/domicilio_geografico', db.leeDomicilioGeografico);
app.delete('/domicilio_geografico/:id', db.eliminaDomicilioGeografico);

app.listen(port, () => {
    console.log('API Domicilios Geográficos corriendo en el puerto', port);
});
