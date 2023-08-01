

 

![](https://img.shields.io/badge/Node%20JS-v18-75b062)
![](https://img.shields.io/badge/Nest%20JS-v10.1.10-ea2845)
![](https://img.shields.io/badge/PostgresSQL-v13-2f6695)
![](https://img.shields.io/badge/JWT--yellow)


#
(Última actualización: Datos referentes al docker-compose y README.md)

# Deployment

El repositorio está el archivo .env.example, dicho archivo se debe modificar los atributos relacionados con los parámetros del contenedor de ser necesario.

Nota: Las variables de entorno relacionadas con el email también se modifican, en mi caso cree una cuenta en Mailtrap que me proporciono configuración gratuita y allí llegan los correos emitidos con la información del token.


1. Ubicarse dentro de la carpeta del proyecto y ejecutar:

```bash
  docker-compose up

```

2. En el explorador escribir <localhost:3000> que es donde corre por defecto, si no se ha modificado las variables de entorno.






# API Reference

## Users

```http
  GET /users/all
```

| Parametros | Tipo     | Descripcion                |
| :-------- | :------- | :------------------------- |
| `none` | `none` | Retorna los usuarios registrados|


```http
  GET /users/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | Devuelve usuario segun id |


```http
  PUT /users/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | Actualiza datos del usuario segun id |

```http
  POST /users
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
|Json example: `{"name": "string", "email": "string", "password": "string","lastname": "string"}`| `application/json`  | Actualiza datos del usuario segun id |


```http
  DELETE /users/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | Elimina usuario por id |



## Files

```http
  GET /files/get-image/${objectKey}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `objectKey`| `string` | Key de la imagen subida al Bucket de AWS |


```http
  PUT /files/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | Actualiza el nombre segun la el key de la imagen (No funciona, devuelve Acceso denegado) |

```http
  POST /files/upload
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `file`| `form-data`  | Sube la imagen que se encuentra local |


```http
  POST /files/upload-image-url
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| Json example: `{"url": "string"}`    | `application/json` | Sube una imagen dada una url, ejemplo de url: `https://images.unsplash.com/photo-1682814270823-b3b2bce8c6d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80` o  `https://cdn.pixabay.com/photo/2023/07/20/11/00/pie-8139063_960_720.jpg`|


## Auth

```http
  POST /auth/login
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| json example:`{"email": "string", "password": "string"}`| `application/json`  | Usuario inicia sesion y devuelve token |


```http
  POST /auth/email-reset/{email}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `email`| `string`  | Envia correo con el token para actualizar password |


```http
  POST /auth/reset-password
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| json example: `{"email": "string", "password": "string"}` | `application/json` | actualiza la contraseña segun el campo password **(Requiere token)**|


