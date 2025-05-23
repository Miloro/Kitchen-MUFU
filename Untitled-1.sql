 select distinct p.persona,  p.nombres || ' ' || p.apellido nombres_apellido, dt.desc_abreviada || ' ' || pd.nro_documento as tipo_nro_documento,
                pc_m.email, p.sexo as genero,
                case when sd.persona is not null then 'Sí' else 'No' end as docente,
                p.fecha_nacimiento,
(                select dptos_partidos.nombre  || ' - ' || provincias.nombre

FROM negocio.vw_personas persona
         JOIN negocio.mdp_datos_censales censal ON censal.persona = persona.persona
         JOIN negocio.mdp_datos_personales censal_pers ON censal.dato_censal = censal_pers.dato_censal
         LEFT JOIN negocio.mug_localidades localidad_periodo_lectivo
                   ON localidad_periodo_lectivo.localidad = censal_pers.periodo_lectivo_localidad
        left join mug_dptos_partidos dptos_partidos on dptos_partidos.dpto_partido = localidad_periodo_lectivo.dpto_partido
        left join mug_provincias provincias on provincias.provincia = dptos_partidos.provincia where persona.persona = p.persona ) as lugar_residencia,

                spa.anio_academico as año_ingreso,
                sco.fecha_egreso,
                case when regular = 'S' then 'Sí' else 'No' end as regular,
                case when calidad = 'A' then 'Activo' else 'Inactivo' end as calidad,

                vp.propuesta_nombre, vp.plan_nombre,

                (select distinct string_agg(sra.nombre, '- ') from sga_responsables_academicas sra where pra.responsable_academica = sra.responsable_academica),


                --'email: '||coalesce(pc_m.email,'') || ', tel: '||
                coalesce( (select distinct string_agg(coalesce(pc_t.telefono_codigo_area||'-', '') || pc_t.telefono_numero,'; ')|| ' ' from mdp_personas_contactos pc_t
                           where contacto_tipo='T' and pc_t.persona=p.persona and pc_t.telefono_numero is not null), '')
                    || 'cel: ' ||
                coalesce( (select distinct string_agg(coalesce(pc_c.telefono_codigo_area||'-', '')|| pc_c.telefono_numero,'; ') from mdp_personas_contactos pc_c
                           where contacto_tipo='C' and pc_c.persona=p.persona and pc_c.telefono_numero is not null), '') as telefonos,

                --mdt.nombre as tipo_discapacidad, mdc.nombre as caracter_discapacidad, mdg.nombre as severidad,
                case when mdp_datos_discapacidad.tiene_cud = 'S' then 'Si'
                     when mdp_datos_discapacidad.tiene_cud = 'N' then 'No'
                    end  AS salud_certificado,

                CASE
                    WHEN disc_tipo = 'disc_auditiva'
                        THEN 'Discapacidad auditiva'
                    WHEN disc_tipo = 'disc_visual'
                        THEN 'Discapacidad visual'
                    WHEN disc_tipo = 'disc_motora'
                        THEN 'Discapacidad motora'
                    WHEN disc_tipo = 'disc_cond_psicosocial'
                        THEN 'Discapacidad de condicion psicosocial'
                    WHEN disc_tipo = 'disc_otra'
                        THEN 'Otra discapacidad'
                    END salud_tipo_desc,
                CASE
                    WHEN  disc_tipo = 'disc_auditiva'
                        THEN dif_auditiva.descripcion
                    WHEN  disc_tipo = 'disc_visual'
                        THEN dif_visual.descripcion
                    when disc_tipo = 'disc_cond_psicosocial'
                        THEN mdp_datos_discapacidad.psi_descripcion
                    when disc_tipo = 'disc_otra'
                        THEN mdp_datos_discapacidad.otra_descripcion
                    else '-'
                    END salud_grado_desc,
                CASE
                    when disc_tipo='disc_auditiva'
                        THEN
                        (CASE  WHEN  (mdp_datos_discapacidad.aud_req_interprete_lengua_senias = 'S')
                                   THEN 'Interprete de lengua de se<F1>as
' else '' end ||
                         CASE WHEN (mdp_datos_discapacidad.aud_req_aro_magnetico = 'S')
                                  THEN 'Aro magnetico
' else '' end ||
                         CASE WHEN (mdp_datos_discapacidad.aud_req_otros_apoyos = 'S')
                                  THEN 'Otro apoyo auditivo: '|| coalesce(mdp_datos_discapacidad.aud_otros_apoyos,'-')
                              else ''  end)
                    when    disc_tipo='disc_visual'
                        THEN (CASE  WHEN  (mdp_datos_discapacidad.vis_req_archivo_audio = 'S')
                            THEN 'Archivo audio
' else '' end ||
                              CASE WHEN (mdp_datos_discapacidad.vis_req_texto_digital = 'S')
                                       THEN 'Texto digital
' else '' end ||
                              CASE WHEN (mdp_datos_discapacidad.vis_req_texto_braile = 'S')
                                       THEN 'Texto braille
' else '' end ||
                              CASE WHEN (mdp_datos_discapacidad.vis_req_otros_apoyos = 'S')
                                       -- reuso este condicional para xx_otro_apoyo
                                       THEN 'Otro apoyo visual: '|| coalesce(mdp_datos_discapacidad.vis_otros_apoyos,'-')
                                   else ''
                                  end)
                    WHEN disc_tipo='disc_motora' then
                        (case when(mdp_datos_discapacidad.mot_req_otros_apoyos = 'S')
                                  THEN  'Otro apoyo motor: '|| coalesce(mdp_datos_discapacidad.mot_otros_apoyos,'-')
                              else 'No requiere apoyo' end)
                    WHEN disc_tipo='disc_cond_psicosocial' then
                        (case WHEN mdp_datos_discapacidad.psi_req_otros_apoyos = 'S'
                                  THEN 'Otro apoyo psicosocial: '|| coalesce(mdp_datos_discapacidad.psi_otros_apoyos,'-')
                              else 'No requiere apoyo' end)
                    when mdp_datos_discapacidad.otra_req_apoyo_vida_diaria = 'S'
                        -- error siu que cruza los campos(vida_diaria=>otro)
                        then 'Otro apoyo: '|| coalesce(mdp_datos_discapacidad.otra_apoyo_vida_diaria,'-')
                    ELSE 'No requiere apoyo'
                    END requiere_apoyo,

                --apoyo vida_diaria..
                CASE
                    WHEN  disc_tipo = 'disc_auditiva'
                        THEN coalesce(aud_apoyo_vida_diaria,'No')
                    WHEN  disc_tipo = 'disc_visual'
                        THEN coalesce(vis_apoyo_vida_diaria,'No')
                    when disc_tipo = 'disc_cond_psicosocial'
                        THEN coalesce(psi_apoyo_vida_diaria,'No')
                    when disc_tipo = 'disc_motora'
                        THEN coalesce(mot_apoyo_vida_diaria,'No')
                    else 'No' --disc otra no tiene.
                    END apoyo_vida_diaria,
                --apoyo_aula..
                CASE
                    when disc_tipo='disc_auditiva'
                        THEN
                        (CASE  WHEN  (mdp_datos_discapacidad.aud_lenguaje_senias = 'S')
                                   THEN 'Lenguaje de Se<F1>as
' else '' end ||
                         CASE WHEN (mdp_datos_discapacidad.aud_lenguaje_labial = 'S')
                                  THEN 'Lenguaje Labial
' else '' end ||
                         coalesce(mdp_datos_discapacidad.aud_comunicacion_otra,'')
                            )
                    when disc_tipo = 'disc_motora'
                        THEN  (case when(mdp_datos_discapacidad.mot_req_apoyo_aula = 'S')
                                        THEN  'Apoyo motor: '|| coalesce(mdp_datos_discapacidad.mot_apoyo_aula,'-')
                                    else '-' end)
                    else '-'
                    END apoyo_aula,
                mdp_datos_discapacidad.informacion_importante as informacion_importante
from mdp_personas p
    inner join mdp_personas_documentos pd on pd.persona = p.persona and p.documento_principal = pd.documento
    inner join mdp_tipo_documento dt on dt.tipo_documento = pd.tipo_documento
    inner join mdp_personas_contactos pc_m on pc_m.persona=p.persona and email is not null and contacto_tipo='MP'
         INNER JOIN mdp_datos_censales dc on dc.persona=p.persona
         INNER JOIN mdp_datos_discapacidad ON mdp_datos_discapacidad.dato_censal = dc.dato_censal
         INNER JOIN mdp_dificultad_discapacidad as dif_auditiva ON dif_auditiva.dificultad = mdp_datos_discapacidad.aud_tipo
         INNER JOIN mdp_dificultad_discapacidad as dif_visual ON dif_visual.dificultad = mdp_datos_discapacidad.vis_dificultad_para_ver

         inner join (select key as disc_tipo, dato_censal
                     from (select dato_censal, disc_auditiva, disc_visual, disc_otra, disc_motora, disc_cond_psicosocial
                           from mdp_datos_discapacidad ) c,
                         lateral json_each(row_to_json(c)) where (value #>> '{}') = 'S') t_activos
                    on t_activos.dato_censal=mdp_datos_discapacidad.dato_censal
         left join sga_alumnos a on a.persona=p.persona
         left join vw_planes vp on a.propuesta = vp.propuesta and a.plan_version=vp.plan_version
         left join sga_propuestas_ra pra on pra.propuesta=vp.propuesta
         left join sga_propuestas_aspira spa on spa.propuesta_aspira = (
    select max(propuesta_aspira)
    from sga_propuestas_aspira pa
    where pa.persona = a.persona and pa.propuesta = a.propuesta
)
         left join sga_docentes sd on a.persona = sd.persona
         left join negocio.sga_certificados_otorg sco on a.alumno = sco.alumno and sco.anulado = 0
where
    mdp_datos_discapacidad.condicion_discapacidad = 'S'
and (sd.persona is not null or a.persona is not null );