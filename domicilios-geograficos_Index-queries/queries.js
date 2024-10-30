const Pool = require('pg').Pool

//Base de datos local LGDD
const DB_HOST = process.env.DB_HOST || 'localhost'
const DB_PORT = process.env.DB_PORT || 5433
const DB_NAME = process.env.DB_NAME || 'domiciliosgeograficos'
const DB_USER = process.env.DB_USER || 'postgres'
const DB_PASSWORD = process.env.DB_PASSWORD || 'postgres'

//Pool de conexiones a base de datos
const pool = new Pool({
    host: DB_HOST,
    port: DB_PORT,
    database: DB_NAME,
    user: DB_USER,
    password: DB_PASSWORD,
//    ssl: {
//        rejectUnauthorized: false,
//    },
});

const leeEntidades = (request, response) => {
    pool.query(
        'SELECT cvegeo, cve_ent, nomgeo, nom_abrev '
//        +', pob_total, pob_femenina, pob_masculina, total_viviendas_habitadas '
        + 'FROM catalogos.mgee '
        + 'ORDER BY cve_ent;',
        (error, results) => {
            if (error) {
                throw error;
            }
            response.status(200).json(results.rows);
        }
    );
}

const leeMunicipios = (request, response) => {
    const cve_ent = request.params.cve_ent;
    pool.query(
        'SELECT cvegeo, cve_ent, cve_mun, nomgeo '
//        +', cve_cab, pob_total, pob_femenina, pob_masculina, total_viviendas_habitadas '
        + 'FROM catalogos.mgem '
        + 'WHERE cve_ent = $1 '
        + 'ORDER BY nomgeo;',
        [cve_ent],
        (error, results) => {
            if (error) {
                throw error;
            }
            response.status(200).json(results.rows);
        }
    );
}

const leeLocalidades = (request, response) => {
    const cve_ent = request.params.cve_ent;
    const cve_mun = request.params.cve_mun;
    pool.query(
        'SELECT cvegeo, cve_ent, cve_mun, cve_loc, nomgeo, ambito '
//        + ', latitud, longitud, altitud, pob_total, total_viviendas_habitadas, '
//        + 'cve_carta, estatus, periodo '
        + 'FROM catalogos.localidades '
        + 'WHERE cve_ent = $1 '
        + 'AND cve_mun = $2 '
        + 'ORDER BY nomgeo;',
        [cve_ent, cve_mun],
        (error, results) => {
            if (error) {
                throw error;
            }
            response.status(200).json(results.rows);
        }
    );
}

const leeTiposVialidades = (request, response) => {
    const cve_ent = request.params.cve_ent;
    const cve_mun = request.params.cve_mun;
    const cve_loc = request.params.cve_loc;
    const buscar_nombre_vialidad = request.params.buscar_nombre_vialidad;
    let buscar = buscar_nombre_vialidad === 'L*G*D*D' ? `%` : `%${buscar_nombre_vialidad}%`;
    pool.query(
        'SELECT DISTINCT ON (v.cve_tipovial) cvegeo, cve_ent, cve_mun, cve_loc, cvevial, nomvial, tipovial, '
        + 'ambito, v.cve_tipovial as cve_tipovial, ctv.descripcion as descripcion '
//        + ', cv.cve_tipovial as cve_tipovial, cve_ambito, cvt.nomtipovial as nomtipovial 
        + 'FROM catalogos.vialidades as v, catalogos.cat_tipo_vialidad as ctv '
        + 'WHERE cve_ent = $1 '
        + 'AND cve_mun = $2 ' 
        + 'AND cve_loc = $3 ' 
        + 'AND nomvial LIKE $4 '
		+ 'AND v.cve_tipovial = ctv.cve_tipo_vial '
        + 'ORDER BY v.cve_tipovial;',
        [cve_ent, cve_mun, cve_loc, buscar],
        (error, results) => {
            if (error) {
                throw error;
            }
            response.status(200).json(results.rows);
        }
    );
}

const leeNombresVialidades = (request, response) => {
    const cve_ent = request.params.cve_ent;
    const cve_mun = request.params.cve_mun;
    const cve_loc = request.params.cve_loc;
    const cve_tipo_vialidad = request.params.cve_tipo_vialidad;
    const buscar_nombre_vialidad = request.params.buscar_nombre_vialidad;
    let buscar = buscar_nombre_vialidad === 'L*G*D*D' ? `%` : `%${buscar_nombre_vialidad}%`;
    pool.query(
        'SELECT DISTINCT ON (nomvial) cvegeo, cve_ent, cve_mun, cve_loc, cvevial, nomvial, tipovial, '
//        'SELECT cvegeo, cve_agee, cve_agem, cve_loc, cve_via, nomvial, tipovial, '
        + 'ambito, v.cve_tipovial as cve_tipovial, ctv.descripcion as descripcion '
        + 'FROM catalogos.vialidades as v, catalogos.cat_tipo_vialidad as ctv '
        + 'WHERE cve_ent = $1 '
        + 'AND cve_mun = $2 ' 
        + 'AND cve_loc = $3 ' 
		+ 'AND v.cve_tipovial = $4 '
        + 'AND nomvial LIKE $5 ' 
        + 'AND v.cve_tipovial = ctv.cve_tipo_vial '
        + 'ORDER BY nomvial;',
        [cve_ent, cve_mun, cve_loc, cve_tipo_vialidad, buscar],
        (error, results) => {
            if (error) {
                throw error;
            }
            response.status(200).json(results.rows);
        }
    );
}

const leeTiposAsentamientos = (request, response) => {
    const cve_ent = request.params.cve_ent;
    const cve_mun = request.params.cve_mun;
    const cve_loc = request.params.cve_loc;
    const buscar_nombre_asentamiento = request.params.buscar_nombre_asentamiento;
    let buscar = buscar_nombre_asentamiento === 'L*G*D*D' ? `%` : `%${buscar_nombre_asentamiento}%`;
    pool.query(
        'SELECT DISTINCT ON (a.tipo_asen) cvegeo, cve_ent, cve_mun, cve_loc, '
//        + 'cve_asen, nom_asen, tipo_asen, periodo, a.cve_tipoasen as cve_tipoasen, '
        + 'cve_asen, nom_asen, tipo_asen, a.cve_tipo_asen as cve_tipoasen, '
        + 'cta.descripcion as descripcion '
        + 'FROM catalogos.asentamientos as a, catalogos.cat_tipo_asen as cta '
        + 'WHERE cve_ent = $1 '
        + 'AND cve_mun = $2 '
        + 'AND cve_loc = $3 ' 
        + 'AND nom_asen LIKE $4 ' 
		+ 'AND a.cve_tipo_asen = cta.cve_tipo_asen '
		+ 'ORDER BY tipo_asen;',
        [cve_ent, cve_mun, cve_loc, buscar],
        (error, results) => {
            if (error) {
                throw error;
            }
            response.status(200).json(results.rows);
        }
    );
}


const leeNombresAsentamientos = (request, response) => {
    const cve_ent = request.params.cve_ent;
    const cve_mun = request.params.cve_mun;
    const cve_loc = request.params.cve_loc;
    const cve_tipo_asentamiento = request.params.cve_tipo_asentamiento;
    const buscar_nombre_asentamiento = request.params.buscar_nombre_asentamiento;
    let buscar = buscar_nombre_asentamiento === 'L*G*D*D' ? `%` : `%${buscar_nombre_asentamiento}%`;
    pool.query(
        'SELECT DISTINCT ON (nom_asen) cvegeo, cve_ent, cve_mun, cve_loc, '
//        + 'cve_asen, nom_asen, tipo_asen, periodo, ca.cve_tipoasen as cve_tipoasen, '
        + 'cve_asen, nom_asen, tipo_asen, a.cve_tipo_asen as cve_tipoasen, '
        + 'cta.descripcion as descripcion '
        + 'FROM catalogos.asentamientos as a, catalogos.cat_tipo_asen as cta '
        + 'WHERE cve_ent = $1 ' 
        + 'AND cve_mun = $2 ' 
        + 'AND cve_loc = $3 ' 
		+ 'AND a.cve_tipo_asen = $4 ' 
        + 'AND nom_asen LIKE $5 ' 
		+ 'AND a.cve_tipo_asen = cta.cve_tipo_asen '
		+ 'ORDER BY nom_asen;',
        [cve_ent, cve_mun, cve_loc, cve_tipo_asentamiento, buscar],
        (error, results) => {
            if (error) {
                throw error;
            }
            response.status(200).json(results.rows);
        }
    );
}

const insertaDomicilioGeografico = (request, response) => {
    const { 
        id, cve_ent, nom_ent, cve_mun, nom_mun,
        cve_loc, nom_loc, ambito, cve_tipo_vialidad, nom_tipo_vialidad,
        cve_nombre_vialidad, nom_nombre_vialidad, numero_exterior, numero_interior, cve_tipo_asentamiento,
        nom_tipo_asentamiento, cve_nombre_asentamiento, nom_nombre_asentamiento, codigo_postal, cve_tipo_vialidad_referencia1,
        nom_tipo_vialidad_referencia1, cve_nombre_vialidad_referencia1, nom_nombre_vialidad_referencia1, cve_tipo_vialidad_referencia2, nom_tipo_vialidad_referencia2,
        cve_nombre_vialidad_referencia2, nom_nombre_vialidad_referencia2, cve_tipo_vialidad_posterior, nom_tipo_vialidad_posterior, cve_nombre_vialidad_posterior,
        nom_nombre_vialidad_posterior, descripcion_ubicacion
     } = request.body;
    pool.query(
        'INSERT INTO datos.domiciliogeografico('
        + 'id, cve_ent, nom_ent, cve_mun, nom_mun, '
        + 'cve_loc, nom_loc, ambito, cve_tipo_vialidad, nom_tipo_vialidad, '
        + 'cve_nombre_vialidad, nom_nombre_vialidad, numero_exterior, numero_interior, cve_tipo_asentamiento, '
        + 'nom_tipo_asentamiento, cve_nombre_asentamiento, nom_nombre_asentamiento, codigo_postal, cve_tipo_vialidad_referencia1, '
        + 'nom_tipo_vialidad_referencia1, cve_nombre_vialidad_referencia1, nom_nombre_vialidad_referencia1, cve_tipo_vialidad_referencia2, nom_tipo_vialidad_referencia2, '
        + 'cve_nombre_vialidad_referencia2, nom_nombre_vialidad_referencia2, cve_tipo_vialidad_posterior, nom_tipo_vialidad_posterior, cve_nombre_vialidad_posterior, '
        + 'nom_nombre_vialidad_posterior, descripcion_ubicacion) '
        + 'VALUES ('
        + '$1, $2, $3, $4, $5, '
        + '$6, $7, $8, $9, $10, '
        + '$11, $12, $13, $14, $15, '
        + '$16, $17, $18, $19, $20, '
        + '$21, $22, $23, $24, $25, '
        + '$26, $27, $28, $29, $30, '
        + '$31, $32'
        + ') RETURNING *;',
        [
            id, cve_ent, nom_ent, cve_mun, nom_mun,
            cve_loc, nom_loc, ambito, cve_tipo_vialidad, nom_tipo_vialidad,
            cve_nombre_vialidad, nom_nombre_vialidad, numero_exterior, numero_interior, cve_tipo_asentamiento,
            nom_tipo_asentamiento, cve_nombre_asentamiento, nom_nombre_asentamiento, codigo_postal, cve_tipo_vialidad_referencia1,
            nom_tipo_vialidad_referencia1, cve_nombre_vialidad_referencia1, nom_nombre_vialidad_referencia1, cve_tipo_vialidad_referencia2, nom_tipo_vialidad_referencia2,
            cve_nombre_vialidad_referencia2, nom_nombre_vialidad_referencia2, cve_tipo_vialidad_posterior, nom_tipo_vialidad_posterior, cve_nombre_vialidad_posterior,
            nom_nombre_vialidad_posterior, descripcion_ubicacion
        ],
        (error, results) => {
            if (error) {
                throw error;
            }
            textoRespuesta = '{"respuesta": "Se insertó domicilio geográfico: ' + results.rows[0].id + '"}';
            response.status(201).json(JSON.parse(textoRespuesta));
        }
    );
}

const leeDomicilioGeografico = (request, response) => {
    pool.query(
        'SELECT id, cve_ent, nom_ent, cve_mun, nom_mun, cve_loc, nom_loc, '
        + 'ambito, cve_tipo_vialidad, nom_tipo_vialidad, cve_nombre_vialidad, '
        + 'nom_nombre_vialidad, numero_exterior, numero_interior, cve_tipo_asentamiento, '
        + 'nom_tipo_asentamiento, cve_nombre_asentamiento, nom_nombre_asentamiento, '
        + 'codigo_postal, cve_tipo_vialidad_referencia1, nom_tipo_vialidad_referencia1, '
        + 'cve_nombre_vialidad_referencia1, nom_nombre_vialidad_referencia1, '
        + 'cve_tipo_vialidad_referencia2, nom_tipo_vialidad_referencia2, '
        + 'cve_nombre_vialidad_referencia2, nom_nombre_vialidad_referencia2, '
        + 'cve_tipo_vialidad_posterior, nom_tipo_vialidad_posterior, '
        + 'cve_nombre_vialidad_posterior, nom_nombre_vialidad_posterior, descripcion_ubicacion '
	    + 'FROM datos.domiciliogeografico;',
        (error, results) => {
            if (error) {
                throw error;
            }
            response.status(200).json(results.rows);
        }
    );
}

const eliminaDomicilioGeografico = (req, res) => {
    const id = req.params.id;
    pool.query(
        'DELETE FROM datos.domiciliogeografico WHERE id = $1;',
        [id],
        (error, results) => {
            if (error) {
                throw error;
            }
            textoRespuesta = '{"respuesta": "Se eliminó ' + results.rowCount + ' domicilio geográfico: ' + id + '"}';
            res.status(201).json(JSON.parse(textoRespuesta));
        }
    );
}

module.exports = {
    leeEntidades,
    leeMunicipios,
    leeLocalidades,

    leeTiposVialidades,
    leeNombresVialidades,

    leeTiposAsentamientos,
    leeNombresAsentamientos,

    insertaDomicilioGeografico,
    leeDomicilioGeografico,
    eliminaDomicilioGeografico
}
