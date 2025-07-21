# Memecoin Bot

Un bot que interactúa con la API de Birdeye para obtener datos de tokens **Solana**, almacenarlos en una base de datos **PostgreSQL** y gestionar su historial. El bot maneja la paginación de los resultados para obtener todos los tokens disponibles en la plataforma.

## Características

- **Obtención de tokens**: El bot obtiene los tokens de Solana desde la API de Birdeye en bloques de 50.
- **Paginación**: Se maneja la paginación para asegurarse de obtener todos los tokens de la API, incrementando el `offset` de 50 en 50 hasta obtener todos los resultados.
- **Base de datos**: La información de los tokens se almacena en una base de datos **PostgreSQL**. Se ha ajustado la base de datos para permitir almacenar cadenas largas (por ejemplo, el nombre y el logo del token).
- **Historial de tokens**: Los datos históricos de cada token (como el precio, la liquidez, etc.) se almacenan en una tabla separada (`solana_token_history`), permitiendo realizar un seguimiento de las actualizaciones de los tokens.
- **Retrasos en las consultas**: El bot incluye un retraso entre cada consulta para evitar sobrecargar la API y ser identificado como un bot.

## Estructura del Proyecto
	/memecoin-bot
	/config
	db.js           # Conexión a la base de datos
	/controllers
	botController.js # Controlador del bot que maneja la ejecución
	/services
	memecoinService.js # Servicio para interactuar con la API de Birdeye y manejar la lógica de inserción
	/jobs
	tradeJob.js      # Job de cron para ejecutar el bot de forma periódica
	.env               # Variables de entorno (API keys, configuración de la base de datos)
	app.js             # Punto de entrada para ejecutar el bot manualmente
	package.json       # Dependencias y scripts de Node.js
	README.md          # Este archivo

## Dependencias

- **Axios**: Para realizar las solicitudes HTTP a la API de Birdeye.
- **PostgreSQL (pg)**: Cliente para interactuar con la base de datos PostgreSQL.
- **dotenv**: Para cargar las variables de entorno (API keys, configuraciones de la base de datos).
- **node-cron**: Para ejecutar el bot en intervalos regulares.

Puedes ver las dependencias completas en el archivo `package.json`.

## Instalación

Sigue estos pasos para configurar y ejecutar el proyecto:

1. **Clona el repositorio**:

   ```bash
   git clone https://github.com/jumata/memecoin-bot.git
   cd memecoin-bot

---
