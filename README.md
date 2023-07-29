## Deployment

El el repositorio existe el archivo .env.example, dicho archivo se debe de modificar los artributos relacionados a AWS

Nota: Las varibles de entorno relacionadas al email tambien se modifican, en mi caso cree una cuenta en mailtrap que me proporciono configuracion gratuita y alli llegan los correos emitidos con la informacion del token.

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
