-- Crear tablas en el esquema catalogos
CREATE TABLE catalogos.asentamientos (LIKE public.asentamientos INCLUDING ALL);
INSERT INTO catalogos.asentamientos SELECT * FROM public.asentamientos;

CREATE TABLE catalogos.cat_tipo_asen (LIKE public.cat_tipo_asen INCLUDING ALL);
INSERT INTO catalogos.cat_tipo_asen SELECT * FROM public.cat_tipo_asen;

CREATE TABLE catalogos.cat_tipo_vialidad (LIKE public.cat_tipo_vialidad INCLUDING ALL);
INSERT INTO catalogos.cat_tipo_vialidad SELECT * FROM public.cat_tipo_vialidad;

CREATE TABLE catalogos.localidades (LIKE public.localidades INCLUDING ALL);
INSERT INTO catalogos.localidades SELECT * FROM public.localidades;

CREATE TABLE catalogos.mgee (LIKE public.mgee INCLUDING ALL);
INSERT INTO catalogos.mgee SELECT * FROM public.mgee;

CREATE TABLE catalogos.mgem (LIKE public.mgem INCLUDING ALL);
INSERT INTO catalogos.mgem SELECT * FROM public.mgem;

CREATE TABLE catalogos.vialidades (LIKE public.vialidades INCLUDING ALL);
INSERT INTO catalogos.vialidades SELECT * FROM public.vialidades;




-- Modificar información de asentamientos, en cuestión de mayúsculas a minúsculas.
SELECT INITCAP('(X-COLONTÉH)')
	
	
SELECT distinct(regexp_split_to_table(nom_asen, '\s+')) AS palabra FROM asentamientos ORDER BY palabra;

UPDATE asentamientos SET nom_asen=INITCAP(nom_asen_may)
UPDATE localidades SET ambito=INITCAP(ambito_may)

UPDATE asentamientos SET nom_asen = REPLACE(nom_asen, ' De ', ' de ') WHERE nom_asen LIKE '% De %';
UPDATE asentamientos SET nom_asen = REPLACE(nom_asen, ' Del ', ' del ') WHERE nom_asen LIKE '% Del %';
UPDATE asentamientos SET nom_asen = REPLACE(nom_asen, ' La ', ' la ') WHERE nom_asen LIKE '% La %';
UPDATE asentamientos SET nom_asen = REPLACE(nom_asen, ' Las ', ' las ') WHERE nom_asen LIKE '% Las %';
UPDATE asentamientos SET nom_asen = REPLACE(nom_asen, ' Los ', ' los ') WHERE nom_asen LIKE '% Los %';



