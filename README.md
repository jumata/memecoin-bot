Memecoin Bot

Un bot que interactúa con la API de Birdeye para obtener datos de tokens Solana, almacenarlos en una base de datos PostgreSQL y gestionar su historial. El bot maneja la paginación de los resultados para obtener todos los tokens disponibles en la plataforma.

Características
	•	Obtención de tokens: El bot obtiene los tokens de Solana desde la API de Birdeye en bloques de 50.
	•	Paginación: Se maneja la paginación para asegurarse de obtener todos los tokens de la API, incrementando el offset de 50 en 50 hasta obtener todos los resultados.
	•	Base de datos: La información de los tokens se almacena en una base de datos PostgreSQL. Se ha ajustado la base de datos para permitir almacenar cadenas largas (por ejemplo, el nombre y el logo del token).
	•	Historial de tokens: Los datos históricos de cada token (como el precio, la liquidez, etc.) se almacenan en una tabla separada (solana_token_history), permitiendo realizar un seguimiento de las actualizaciones de los tokens.
	•	Retrasos en las consultas: El bot incluye un retraso entre cada consulta para evitar sobrecargar la API y ser identificado como un bot.

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


Dependencias
	•	Axios: Para realizar las solicitudes HTTP a la API de Birdeye.
	•	PostgreSQL (pg): Cliente para interactuar con la base de datos PostgreSQL.
	•	dotenv: Para cargar las variables de entorno (API keys, configuraciones de la base de datos).
	•	node-cron: Para ejecutar el bot en intervalos regulares.

 Cómo funciona el bot
	1.	Obtención de datos: El bot realiza solicitudes a la API de Birdeye para obtener los tokens de Solana. Los primeros 50 tokens se obtienen en la primera consulta. Luego, el bot usa la paginación para continuar obteniendo los siguientes tokens en bloques de 50 hasta que todos los tokens sean recuperados.
	2.	Almacenamiento en la base de datos: Los datos de cada token se insertan en la tabla solana_tokens en la base de datos PostgreSQL. Si un token ya existe, sus datos se actualizan.
	3.	Historial de tokens: Los datos históricos de cada token, como el precio y la liquidez, se insertan en la tabla solana_token_history para realizar un seguimiento de los cambios a lo largo del tiempo.

 Variables de entorno
	•	BIRDEYE_API_KEY: La clave API para acceder a los datos de Birdeye.
	•	DB_USER: El nombre de usuario de tu base de datos PostgreSQL.
	•	DB_HOST: La dirección del servidor de la base de datos (generalmente localhost si estás trabajando localmente).
	•	DB_DATABASE: El nombre de la base de datos que usas.
	•	DB_PASSWORD: La contraseña para tu base de datos.
	•	DB_PORT: El puerto para conectar con PostgreSQL (generalmente 5432).

 Licencia

Este proyecto está bajo la Licencia MIT.
