## Deployment

El el repositorio existe el archivo .env.example, dicho archivo se debe de modificar los artributos relacionados a AWS

Nota: Para la configuracion de correo cree una cuenta en Mailtrap el cual ofrece configuracion gratuita, alli llegan los correo del realizados por el emisor.

1. Ubicarse dentro de la carpeta del proyecto u ejecutar

```bash
  docker build -t aluxion .

```

2. Ejecutar docker-compose con los comandos

```bash
  docker-compose up -d postgres

  docker-compose up -d pgadmin

```

Ejecutar

```bash
 docker run -it aluxion

```
