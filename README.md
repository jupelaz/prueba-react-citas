## ¿De qué se trata?

En el IFBS han colocado pantallas en el hall de entrada para gestionar las citas, gestión que realiza la empresa QMATIC. No se trata de todo tipo de citas, sino de aquellas que suponen un primer contacto, así como las solicitudes de revisiones. Otras citas se gestionan, por ejemplo, directamente con el trabajador social previamente asignado, y no entran en esta gestión. 

La aplicación de Qmatic que usan sus clientes (en nuestro caso IFBS) permite configurar y gestionar técnicos (recursos), calendarios, citas y colas. 

Así mismo, la aplicación de Qmatic tiene un módulo para reservar citas que se está usando ya. En la página web del IFBS, donde antes había números de teléfono, ahora hay un botón “Cita previa”, que se pulsa habiendo elegido ya el servicio en la página web, pero Qmatic lo vuelve a pedir porque es totalmente independiente. Con este Eskatu se solicita modificar la web del IFBS (hacemos nueva aplicación) que sustituya a dicho módulo.
  
## ¿Página WEB del IFBS? ¿Quién mantiene?
https://web.araba.eus/es/servicios-sociales
Usa Fatwire y la mantiene Mtto. Web, pero, la modificación de contenidos la lleva la Unidad Web. María Angulo se encargará de ponerse en contacto con ellos.

## ¿Quién hace qué de la petición?
El documento de la petición comienza con un cuadro con los distintos servicios para los que se podrá solicitar cita mediante este sistema. Después se indica el texto fijo que se muestra al seleccionar cada uno de ellos. Hasta aquí, será la Unidad Web quien haga el trabajo. A primeros de octubre ya han hecho ese trabajo con ligeros cambios respecto a lo que dice la petición.

Nosotros, es decir, el equipo de Mtto. IFBS, entramos donde dice “Cuando comienzan la solicitud de la cita se les solicita el DNI …”. 
Lo único que queda a la Unidad web por hacer cuando les digamos, es cambiar el enlace a Qmatic por el enlace a nuestra nueva aplicación pasándonos el servicio que el usuario a elegido en la web y el idioma. 

Nueva aplicación Java – Internet				IFCQ-Cita Previa QMATIC


Es necesario saber para cuál de los servicios queremos la cita y el idioma en el que estábamos en la web. Es decir, necesitamos los parámetros SERVICIO_SOLICITADO e IDIOMA. En principio esos datos pueden llegar como un parámetro HTTP sin problemas. No habiendo datos personales, se podrían pasar hasta por GET (preguntar a la UNIDAD WEB ¿a través de María?).
La aplicación no tiene login, ni menú y no se permitirá cambiar el idioma, al menos en la primera entrega. 
Ya veremos los escudos/logos que ponemos. Y nos falta el enlace a Términos y Condiciones y Política de privacidad.

## Cambios respecto a la petición inicial: 
No se prepara la cita para el servicio de familias numerosas con esta petición
Se han incluido más servicios de los que no requieren comprobación en BBDD
Se incluye consulta y anulación de citas
No hemos previsto mostrar el resumen de lo solicitado y pedir confirmación, porque el usuario puede moverse entre las 2 pantallas (datos y cita) antes de pulsar ‘Confirmar cita’
No es necesario incluir las instrucciones en el resguardo. Qmatic las incluye en el correo, y si la cita se ha pedido sin indicar el correo, siempre están en la web. 

El botón Consultar o anular mis citas, copiado de Osakidetza, aunque inicialmente pensamos que nos podía llevar a ENCUENTRA CITA de Qmatic, no podemos porque dicha opción del módulo de Qmatic tiene un botón para ir a su página de inicio. Finalmente, el botón llevará a otra página de nuestra nueva aplicación que se describe más adelante (pendiente).

Los mensajes de error se muestran abajo, no con ventana y botón aceptar, excepto para validar campos obligatorios, que ya veremos si hacemos como en _Web AT. Hay que averiguar si la API de Qmatic devuelve códigos o textos.

Hay que averiguar cómo identificar la oficina del IFBS, que es única. Lo mismo con los servicios, cuyos códigos son A1, A2, B1, etc. Tenemos que poner los mismos códigos en desarrollo que en producción. El usuario solicita cita para un servicio (FN, RSD, RCM, …), pero algunos se dividen en inicial o nuevo y revisión o renovación, y esto se determina en este programa, consultando en Ayudas si ya tiene un expediente activo de ese tipo o no. Vamos a necesitar también los textos asociados a los servicios de Qmatic para mostrarlos en el resguardo. 

Si el servicio es AT finalmente no se va a consultar si ya tiene un expediente porque hay probabilidad de que no se encuentre. Por ej.:
Si teclean DNI ficticio (con secuencia). Es complicado validar este formato. Podríamos coger solo 8 dígitos, pero, ¿y si hay hermanos? 
Hay menores que tienen ya asignado un número con letra K, pero la familia no lo sabe.
Además, los que tienen que renovar ya sabrán que no tienen que pedir cita aquí, sino al trabajador social.

Para la etiqueta del DNI, NIE etc., elegimos Identificador, como en el Imserso, y no Documento, como en muchos sitios, porque tenemos DNIs ficticios, no solo en AT sino también en RSD.

Aunque se habló de no validar el formato porque si un identificador no se encuentra en el FIA solo supone que se le da una cita más larga, finalmente vamos a hacerlo, pero solo si es DNI, NIE (X e Y) o DNI de menor (K). Por ese motivo solicitamos Tipo Identificador, aunque no se pueda grabar en Qmatic. Lo hemos pensado así, no solo porque el SW que tenemos para descomponerlo también lo valida, sino porque en un futuro podríamos querer hacer búsquedas que lo incluyan (de momento serán solo por nº teléfono), o podríamos querer validar que ya tenga cita, y simplemente para tener datos grabados lo mejor posible. 

Conceptos: espacio de tiempo, hora, cita, reserva, visita. Qmatic tiene el mismo problema que todos para distinguir entre una cita aún sin persona (espacio de tiempo) y una cita con persona. 

Fechas con horas libres: Los espacios de tiempo se crean desde la aplicación de Qmatic, que maneja el IFBS, al actuar sobre el calendario de un técnico. En el calendario de nuestra aplicación, al igual que en el módulo de Qmatic, solo se mostrarán habilitados los días con citas libres y no se cambian mientras no se cambie el servicio. Es decir, puede ocurrir que pinchemos en un día y nos diga que no hay libres o que haya libres y no podamos pinchar. A pesar de ello, al menos de momento, lo vamos a hacer como Qmatic.

Crear cita vs Reservar y Confirmar:
En el módulo de Qmatic primero se elige la hora y después se introducen los datos. Por ello, al elegir la cita se reserva y en el paso siguiente se confirma. Esto implica:
Cuando durante el proceso el usuario cambia la hora elegida, la aplicación tiene que borrar la anterior reserva. Es decir, al pinchar en una hora la aplicación elimina la reserva anterior y crea la nueva.
Si el usuario sale sin confirmar la cita, ésta queda reservada (bloqueada) durante 10’ (este tiempo es parametrizable). 
Si solo hay una hora libre en una fecha y alguien la reserva antes de entrar yo, ese día no se habilita, aunque la hora quede libre. 

En nuestra aplicación lo último que se elige es la cita, por lo que no vemos necesario reservar al elegir la hora. A pesar de los inconvenientes arriba descritos, vamos a hacerlo, porque si Qmatic lo aconseja encarecidamente, aún después de explicar esto, puede ser porque no se fían del servicio ‘Crear cita’. Eso sí, en el botón ‘Cerrar sesión’ vamos a programar la eliminación de la reserva, pero no un botón ‘Limpiar reserva’ como tiene Qmatic, porque el usuario ni sabe que tiene una reserva (a no ser que pusiéramos lo de “Tiene 10’ para confirmar” o similar).
Tanto en una aplicación como en la otra, puede suceder que al confirmar la cita ésta ya no esté libre o ya no esté reservada. Aunque se haya reservado la cita, 10’ pasan rápido. En ese caso Qmatic muestra “Su cita no puede ser reservada. Por favor, inténtelo de nuevo más tarde.”, pero es posible que el mensaje sea éste porque en la prueba que he hecho, el teléfono era el mismo. Además, parece que la aplicación ha confirmado la cita porque después me da error de “no único” al consultar.
En principio, la palabra ‘Paso’ o barra con los mismos, no vamos a poner.

### Como título arriba grande, seguramente en fondo lila foral, ponemos este texto:
Texto|Entrada|Salida
---|---|---
Solicitud de Título de FAMILIA NUMEROSA|FN|A1 y A2   
Solicitud de VALORACIÓN de la situación de DEPENDENCIA|RSD|B1 y B2
Solicitud de VALORACIÓN de la situación de DISCAPACIDAD|RCM|C1 y C2
Solicitud de VALORACIÓN de ATENCIÓN TEMPRANA|AT|D
Solicitud de PENSION NO CONTRIBUTIVA|PNC|E1 y E2
Entrega y REGISTRO de documentación|DOC|F
Empleados de servicios sociosanitarios|ESS|G
Solicitud de certificados|CER|H
Servicio de información social|INF|I

----

Botón Consultar o anular mis citas|Cita Previa|Botón Cerrar sesión
---|---|---
**Paso 1**||
Datos de la persona destinataria del servicio (obligatorios)|
Tipo Identificador|Identificador
 (Si es AT, en vez de ‘Identificador’, hay que poner ‘Identificador del padre, madre o tutor’)|
Apellidos|
Nombre |
**Le enviaremos una confirmación. Introduzca el número de teléfono móvil (obligatorio) y el correo electrónico (opcional)** |
Código de País|Número de teléfono (adrede no ponemos “móvil” porque queremos permitir fijo)|
Correo electrónico|
**Datos del puesto de trabajo	(este apartado solo si es ESS)**|
Puestos de trabajo|
Empresa|
Centro de trabajo|
Espacio para los mensajes de error|
Botón Continuar|
----
----
### Al entrar en la pantalla: 

El desplegable Tipo Identificador, cuyos posibles valores son ‘DNI/NIE/DNI menor/Otros’ se inicializa con ‘DNI’ y en ‘Identificador’ se muestra ‘Ej. 12345678Z’ en “difuminado”.

El código de país (del número de teléfono) se inicializa con +34.

Si el desplegable ‘Tipo Identificador’ cambia a:
‘DNI’, en ‘Identificador’ se muestra ‘Ej. 12345678Z’
‘NIE’ en ‘Identificador’ se muestra ‘Ej. X1234567L’
‘DNI menor’, en ‘Identificador’ se muestra ‘Ej. K1234567L’
 ‘Otros’, en ‘Identificador’ no se muestra nada

Si pulsan continuar:
Campos obligatorios: Todos excepto el correo electrónico.  

### Validaciones de formatos:
Identificador: 

Quitar los posibles espacios a la izquierda y pasar a mayúsculas (también al salir del campo).
Si ‘Tipo de identificador’ es ‘DNI’, ‘NIE’ o ‘DNI menor’:
Mostrar “El formato del Identificador no es correcto” en estos casos porque no lo valida el SW que usamos más adelante:
Si ‘Tipo Identificador’ es ‘DNI’ y el primer carácter no es numérico
Si ‘Tipo Identificador’ es ‘NIE’ y el primer carácter no es “X” ni “Y
Si ‘Tipo Identificador’ es ‘DNI menor’ y el primer carácter no es “K”
Si la longitud del dato introducido no es 9

Ejecutar el método fValidaDNINIFOficial de WCORPVALIDARNIF pasando como parámetro ‘Identificador’,  que valida la longitud de la parte numérica y que el carácter de control sea correcto, y, descompone el identificador en Letra Identificador, Nº Identificador y Carácter de control. Si el código de retorno no es cero, sino que es:
5, mostrar “El carácter de control del Identificador no es correcto”
4 o 9, mostrar “El formato del Identificador no es correcto”
En otro caso, mostrar “Se ha producido un fallo al validar el Identificador”

Código de País: 

Qmatic añade “+” cuando se escribe el primer carácter en el campo. Tendremos que hacer lo mismo o, al enviar a Qmatic añadirlo. Además, validar que el campo sea numérico con no más de 3 dígitos; en caso contrario mostrar “Código de País no válido”. 
Número de teléfono: Si el Código de País es +34, validar que el campo sea numérico con 9 dígitos; en caso contrario mostrar “Número de teléfono no válido”.

Correo electrónico: 

Si no contiene el carácter “@”, mostrar “Correo electrónico no válido”
Obtener servicio Qmatic	(Ver abajo los accesos a DB2)
Si es para FN (no van a llegar de momento), mostrar “Servicio no incluido en este sistema”

Si es para RSD:

Si tiene activo un expediente de la ayuda 18, el servicio es B1
Si no, el servicio es B2

Si es para RCM:

Si tiene activo un expediente de la ayuda 15, el servicio es C1
Si no, el servicio es C2
Si es para AT, el servicio es D

Si es para PNC:

Si tiene activo un expediente de la ayuda 1, el servicio es E1
Si no, el servicio es E2

Si es para DOC, el servicio es F

Si es para ESS:
Si el DNI no existe en una tabla nueva DB2 por decidir mostrar, “No puede solicitar cita previa para este servicio”
Si no, el servicio es G

Si es para CER, el servicio es H

Si es para INF, el servicio es I

Consultaren QMATIC los días con citas libres para la oficina y el servicio (3.3 Obtener fechas), o al entrar en la pantalla siguiente.

---
Paso 2|
---|---
Seleccione fecha y hora|Selección actual: dd-mm-aaaa	hh:mm
(la etiqueta se ve siempre, la fecha y la hora solo si se han seleccionado ambas)

Espacio para los mensajes de error
---|---
Botón Volver al paso anterior | Botón Confirmar cita
---|---
---
Al entrar en la pantalla:

Es posible que ya tengamos seleccionada la fecha, o la fecha y la hora, por alguno de estos motivos:
después de elegir hemos vuelto a la pantalla anterior y estamos accediendo de nuevo a ésta
estamos cambiando de mes en el calendario
‘Confirmar cita’ ha dado error:
Hacer:
Deshabilitar ‘Confirmar cita’
Limpiar las horas
Si habíamos seleccionado ya la fecha, nos situamos en el mes de dicha fecha y si no, en el actual
Habilitar o deshabilitar los días en función de si tienen citas libres o no (consulta guardada) 
Si ya habíamos seleccionado la fecha:
Mostrar la fecha en modo seleccionada
Pintar las horas libres (consulta guardada)
Si ya habíamos seleccionado la hora:
Mostrar la hora en modo seleccionada
Habilitar el botón ‘Confirmar cita’

Al pinchar en un día:

Llamar a Qmatic para consultar las horas (3.4 Obtener horas libres -servicio-) 
Si la lista no está vacía, pintar las horas
Si la lista está vacía o Qmatic devuelve un error que sabemos identificar como tal, mostrar “No hay espacios de tiempo disponibles en la fecha seleccionada” 
Al pinchar en una hora, significa que estamos seleccionando una cita:
Si ya había seleccionado cita, quitar le modo seleccionada de la misma, y ponerlo en la nueva
Poner la cita en ‘Selección actual’
Llamar a Qmatic para anular la reserva anterior (4.4 Borrar una visita -identificación de la cita-)
Llamar a Qmatic para hacer nueva reserva (3.6 Reservar cita – fecha y hora -)
Al cambiar de mes:
Hacer igual que ‘Al entrar en la pantalla’ (si no se puede ejecutar el mismo código, tal vez se pueda, de hecho, salir y entrar de nuevo)
Es suficiente con permitir cambiar de mes con las flechas, pero si se cambia también al pinchar en él, como en Qmatic, está bien.
Si pulsan ‘Confirmar cita’:
Si ‘Selección actual’ no está informado, mostrar “Se ha producido un error inesperado. Inténtelo más tarde” o algo así
Llamar a Qmatic para confirmar la cita (3.7 Confirmar cita -identificación de la cita y persona- )
Si va bien, ir al paso 3
Si da error (por ejemplo, que la cita ya no estuviera libre):
Mostrarlo, pero hay que ver qué errores da
Hacer igual que el segundo punto de ‘Al entrar en la pantalla’

Paso 3 

Su reserva ha sido registrada
La confirmación ha sido enviada a su correo electrónico y / o número de teléfono móvil.
Número de reserva: 99999…. Los que sean
Servicio: El texto de Qmatic
Oficina: Instituto Foral de Bienestar Social  
	   Calle San Prudenci8, 30   01005 Vitoria-Gasteiz
Fecha y hora:	dd-mm-aaaa	hh:mm
Correo electrónico:
Número de teléfono: +999999999…. Los que sean
Datos del puesto de trabajo	(este apartado solo si es ESS)
Puestos de trabajo
Empresa
Centro de trabajo

Código QR

Botón Volver al inicio							              Botón Resguardo

Al pulsar el botón Resguardo:
Se imprime el pantallazo anterior. En Qmatic parece realmente un pantallazo porque sale hasta el botón de la impresora, que por cierto es muy pequeño, tal vez precisamente para obtener el resguardo con un pantallazo. Si es lo opción más sencilla, podemos hacer lo mismo, aunque salgan los botones, y si no, se pintan los datos. En cualquier caso, siempre en un PDF o dejar elegir.
Ejemplo de Qmatic:


Consultas a BD2 (para RSD, RCM y PNC)
Administrado = TADMNUM de THFFAADG para 
TNICODADM=9005, TNIFLETRA = Letra Identificador, TNIFNUME = Nº Identificador, TNIFORDEN = Carácter de control y TNIFSECUE=0
Tiene expediente activo si existe algún registro en la tabla de ayuda en cuestión (RSD/RCM/PNC) con:
CENTRO = 1, ADMCOD = 9005, ADMNUM = Administrado, ADMORD= 0, SECUEN = 0, TIPPRO<>5

Notas:
Si tiene apertura pendiente, no consideramos activo por lo que la cita será para INICIAL/NUEVO
Si tiene apertura o reclamación denegada, no tiene activo por lo que la cita será para INICIAL/NUEVO
El orden en el que hay que poner la condición depende del índice:
RSD tiene índice CENTRO+ADMCOD+ADMNUM+ADMORD
RCM y PNC tienen índice ADMCOD+ADMNUM+ADMORD

Euskera
Los nombres de los servicios de la web, los cogeremos de la web a pelo, como los de castellano; y los de Qmatic de Qmatic, pero casi seguro que la API no los devuelve
Etiquetas de pantalla
‘DNI’, ‘NIE’, ‘DNI menor’, ’Otros’, ‘Ej.’