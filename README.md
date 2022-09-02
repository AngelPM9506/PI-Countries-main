# [Individual Project - Countries](https://pi-countries-main-omega.vercel.app/)

<p align="center">
  <img height="200" src="./client/src/img/bg_Countries.jpg" />
</p>

## Objetivos del Proyecto

- Construir una App utlizando React, Redux, Node y Sequelize.
- Aprender a mejorar las prácticas.
- Aprender y practicar el workflow de GIT.
- Usar y practicar testing.

<p>
    Versiones minimas para funcionar correctamente:
</p>

- __Node__: 12.18.3 o mayor
- __NPM__: 6.14.16 o mayor

Versiones de frameworks usadas:

- __react__: 17.0.1
- __react-dom__: 17.0.1
- __react-router-dom__: 5.2.0
- __redux__: 4.0.5
- __react-redux__: 7.2.3


> __IMPORTANTE:__ Versiones mas actuales podrían presentar configuraciones diferentes respecto a las versiones en las que venimos trabajando durante el bootcamp.

En la `api` es necesario un archivo `.env`  con los siguientes datos:

```env
PORT=3001 // puerto en que escuchará las peticiones
DB_USER=*User* // usuario de la base de datos
DB_PASS=*Password* // contraseña de la base de datos
DB_BD=*Name* // nombre de la base de datos
DB_HOST=*localHost* // host de la base de datos
```
Es necesario una base de datos de PostgreSQL ya que con lo que trabaja este proyecto

## Idea principal

La idea general es crear una aplicación en la cual se pueda ver información de  distintos paises utilizando la api externa [restcountries](https://restcountries.com/) y a partir de ella poder, entre otras cosas:

- Buscar paises
- Filtrarlos / Ordenarlos
- Crear actividades turísticas

#### Tecnologías necesarias a inplementar

- [ ] React
- [ ] Redux
- [ ] Express
- [ ] Sequelize - Postgres

## Base de datos

### Modelos

- [ ] País con las siguientes propiedades:
  - ID (Código de 3 letras) *
  - Nombre *
  - Imagen de la bandera *
  - Continente *
  - Capital *
  - Subregión
  - Área
  - Población
- [ ] Actividad Turística con las siguientes propiedades:
  - ID
  - Nombre
  - Dificultad (Entre 1 y 5)
  - Duración
  - Temporada (Verano, Otoño, Invierno o Primavera)

La relación entre ambas entidades debe ser de muchos a muchos ya que un país puede contener varias actividades turísticas y, a su vez, una actividad turística puede darse en múltiples países. Por ejemplo una actividad podría ser "Ski" que podría ocurrir en Argentina y también en Estados Unidos, pero a su vez Argentina podría también incluir "Rafting".

## Backend

Se debe desarrollar un servidor en Node/Express con las siguientes rutas:

- [ ] __GET /countries__:
  - En una primera instancia deberán traer todos los países desde restcountries y guardarlos en su propia base de datos y luego ya utilizarlos desde allí (Debe retonar sólo los datos necesarios para la ruta principal)
  - Obtener un listado de los paises.
- [ ] __GET /countries/{idPais}__:
  - Obtener el detalle de un país en particular
  - Debe traer solo los datos pedidos en la ruta de detalle de país
  - Incluir los datos de las actividades turísticas correspondientes
- [ ] __GET /countries?name="..."__:
  - Obtener los países que coincidan con el nombre pasado como query parameter (No necesariamente tiene que ser una matcheo exacto)
  - Si no existe ningún país mostrar un mensaje adecuado
- [ ] __POST /activities__:
  - Recibe los datos recolectados desde el formulario controlado de la ruta de creación de actividad turística por body
  - Crea una actividad turística en la base de datos, relacionada con los países correspondientes

## Frontend

__Pagina inicial__: Debe contener

- [ ] Alguna imagen de fondo representativa al proyecto
- [ ] Botón para ingresar al home (`Ruta principal`)

__Ruta principal__: debe contener

- [ ] Input de búsqueda para encontrar países por nombre

- [ ] Área donde se verá el listado de países. Al iniciar deberá cargar los primeros resultados obtenidos desde la ruta `GET /countries` y deberá mostrar su:
  - Imagen de la bandera
  - Nombre
  - Continente
- [ ] Botones/Opciones para filtrar por continente y por tipo de actividad turística

- [ ] Botones/Opciones para ordenar tanto ascendentemente como descendentemente los países por orden alfabético y por cantidad de población

- [ ] Paginado para ir buscando y mostrando los siguientes paises, 10 paises por pagina, mostrando los primeros 9 en la primer pagina.

__Ruta de detalle de país__: debe contener

- [ ] La ruta debe contener (nombre, código de país de 3 letras y continente)
- [ ] Código de país de 3 letras (id)
- [ ] Capital
- [ ] Subregión
- [ ] Área (Mostrarla en km2 o millones de km2)
- [ ] Población
- [ ] Actividades turísticas con toda su información asociada

__Ruta de creación de actividad turística__: debe contener

- [ ] Un formulario __controlado con JavaScript__ con los siguientes campos:
  - Nombre
  - Dificultad
  - Duración
  - Temporada
- [ ] Posibilidad de seleccionar/agregar varios países en simultáneo
- [ ] Botón/Opción para crear una nueva actividad turística

> Es requisito que el formulario de creación esté validado con JavaScript. Por ejemplo: Que el nombre de la actividad no pueda contener símbolos, que la duración no pueda exceder determinado valor, etc.
