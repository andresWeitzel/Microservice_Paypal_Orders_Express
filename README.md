# Microservice_PayPal_Integration_ExpressJs
Microservicio para la integración de Paypal implementado con ExpressJs, Nodejs, Typescript, nodemon, morgan, dotenv, cors, etc.


Módulo para la integración de los servicios de Paypal implementado con ExpressJs, Nodejs, Typescript, nodemon, morgan, dotenv, cors, etc.

### Documentación

*   [Ejemplo básico de integración paypal](https://www.youtube.com/watch?v=sBenKZqEzpQ)
*   [PayPal developer doc](https://developer.paypal.com/home)
* [Orders Endpoints](https://developer.paypal.com/docs/api/orders/v2/#orders_create)

### Códigos de integración Paypal

*   [Demo checkout, buttons, etc](https://demo.paypal.com/us/demo/code_samples?)

### Pasos Paypal

1.  [Crear cuenta en la app de paypal (btn Login in dashboard)](https://developer.paypal.com/home/)
2.  [Ver o actualizar credenciales de usuario](https://developer.paypal.com/dashboard/applications/sandbox)
3.  [Click en btn `crear app` para validar registro, keys, realizar la integración, etc](https://developer.paypal.com/dashboard/applications/sandbox)
4.  [Ingresar al dashboard y ver la app creada con credenciales. Ingresar a la app para ejecuciones en el entorno sandbox.](https://developer.paypal.com/dashboard/applications/sandbox)
5.  Copiar ClientId y secret key de usuario app en archivo `.env` para interactuar con la api de paypal

```env
PAYPAL_API_CLIENT = "AY6UZg4..."
PAYPAL_API_SECRET_KEY ="EJMm8IN..."
PAYPAL_API_SANDBOX_URL = "https://sandbox.paypal.com"
```

6.  [Visualizar cuentas sandbox](https://developer.paypal.com/dashboard/accounts)
7.  [Recursos de la api de paypal](https://developer.paypal.com/api/rest/current-resources/)
8.  [Obtener un access token para las operaciones con curl](https://developer.paypal.com/api/rest/)

```curl
curl -v -X POST "https://api-m.sandbox.paypal.com/v1/oauth2/token"\
 -u "CLIENT_ID:CLIENT_SECRET"\
 -H "Content-Type: application/x-www-form-urlencoded"\
 -d "grant_type=client_credentials"
```

[Obtener un access token para las operaciones desde postman](https://developer.paypal.com/api/rest/)

```postman
    Set the verb to POST.
    Enter https://api-m.sandbox.paypal.com/v1/oauth2/token as the request URL.
    Select the Authorization tab.
    From the TYPE list, select Basic Auth.
    In the Username field, enter your client ID.
    In the Password field, enter your client secret.
    Select the Body tab.
    Select the x-www-form-urlencoded option.
    In the KEY field, enter grant_type.
    In the VALUE field, enter client_credentials.
    Select Send.
```

*   Response

```git
{

  "scope": "https://uri.paypal.com/services/invoicing https://uri.paypal.com/services/disputes/read-buyer https://uri.paypal.com/services/payments/realtimepayment https://uri.paypal.com/services/disputes/update-seller https://uri.paypal.com/services/payments/payment/authcapture openid https://uri.paypal.com/services/disputes/read-seller https://uri.paypal.com/services/payments/refund https://api-m.paypal.com/v1/vault/credit-card https://api-m.paypal.com/v1/payments/.* https://uri.paypal.com/payments/payouts https://api-m.paypal.com/v1/vault/credit-card/.* https://uri.paypal.com/services/subscriptions https://uri.paypal.com/services/applications/webhooks",

  "access_token": "A21AAFEpH4PsADK7qSS7pSRsgzfENtu-Q1ysgEDVDESseMHBYXVJYE8ovjj68elIDy8nF26AwPhfXTIeWAZHSLIsQkSYz9ifg",

  "token_type": "Bearer",

  "app_id": "APP-80W284485P519543T",

  "expires_in": 31668,

  "nonce": "2020-04-03T15:35:36ZaYZlGvEkV4yVSz8g6bAKFoGSEzuy3CQcz3ljhibkOHg"

}
```

<br>

## Índice 📜

<details>
 <summary> Ver </summary>

 <br>

### Sección 1) Descripción, configuración y tecnologías.

*   [1.0) Descripción del Proyecto.](#10-descripción-)
*   [1.1) Ejecución del Proyecto.](#11-ejecución-del-proyecto-)
*   [1.2) Configuración del proyecto desde cero](#12-configuración-del-proyecto-desde-cero-)
*   [1.3) Comandos de utilidad.](#13-comandos-de-utilidad)
*   [1.4) Tecnologías.](#14-tecnologías-)

### Sección 2) Endpoints y Ejemplos

*   [2.0) EndPoints y recursos.](#20-endpoints-y-recursos-)
*   [2.1) Ejemplos.](#21-ejemplos-)

### Sección 3) Prueba de funcionalidad y Referencias

*   [3.0) Prueba de funcionalidad.](#30-prueba-de-funcionalidad-)
*   [3.1) Referencias.](#31-referencias-)

<br>

</details>

<br>

## Sección 1) Descripción, configuración y tecnologías.

### 1.0) Descripción [🔝](#índice-)

<details>
  <summary>Ver</summary>

 <br>

### 1.0.0) Descripción General

### 1.0.1) Descripción Arquitectura y Funcionamiento

<br>

</details>

### 1.1) Ejecución del Proyecto [🔝](#índice-)

<details>
  <summary>Ver</summary>
<br>

#### 1.1.0) Configuraciones iniciales

*   Una vez creado un entorno de trabajo a través de algún ide, clonamos el proyecto

```git
git clone https://github.com/andresWeitzel/Module_PayPal_Integration_ExpressJs
```

*   Nos posicionamos sobre el proyecto

```git
cd 'projectName'
```

*   Instalamos la última versión LTS de [Nodejs(v18)](https://nodejs.org/en/download).
*   Instalamos todas las librerías necesarias

```git
npm i
```

*   Las variables de entorno utilizadas en el proyecto se mantienen para simplificar el proceso de configuración de las mismas. Es recomendado agregar el archivo correspondiente (.env) al .gitignore.
*   El siguiente script configurado en el package.json del proyecto es el encargado de
    *   Levantar el servidor con express (entorno productivo)
    *   Levantar el servidor con express y nodemon (entorno local dev)

```git
"scripts": {
   "dev": "nodemon src/server.js",
   "start": "node src/server.js"
 },
```

*   Ejecutamos la app desde terminal para entorno local.

```git
npm run dev
```

*   Ejecutamos la app desde terminal para entorno productivo.

```git
npm start
```

*   Si se presenta algún mensaje indicando qué el puerto 8080 ya está en uso, podemos terminar todos los procesos dependientes y volver a ejecutar la app

```git
npx kill-port 8080
npm run dev o npm start
```

<br>

</details>

<br>

### 1.2) Configuración del proyecto desde cero [🔝](#índice-)

<details>
  <summary>Ver</summary>

<br>

*   Una vez creado un entorno de trabajo a través de algún ide, clonamos el proyecto

```git
git clone https://github.com/andresWeitzel/Module_PayPal_Integration_ExpressJs
```

*   Nos posicionamos sobre el proyecto

```git
cd 'projectName'
```

*   Instalamos la última versión LTS de [Nodejs(v18)](https://nodejs.org/en/download)
*   Abrimos una terminal desde vsc
*   Inicializamos un proyecto nodejs

```git
npm init
```

*   Creamos un archivo .gitignore y agregamos los files necesarios (por el momento node\_modules)

```git
node_modules
```

*   Creamos un direct source (src) para agregar toda la lógica de nuestra app
*   Instalamos el paquete para el uso de Nodejs con Typescript

```git
npm i --save-dev @types/node
```

*   Instalamos lo necesario para usar typescript

```git
# Locally in your project.
npm install -D typescript
npm install -D ts-node

# Or globally with TypeScript.
npm install -g typescript
npm install -g ts-node

# Depending on configuration, you may also need these
npm install -D tslib @types/node
```

*   Instalamos los plugins para [express (framework)](https://www.npmjs.com/package/express) para ts y nodejs

```git
npm i --save-dev @types/express
npm i express
```

*   Instalamos el plugin para [cors (gestión de recursos)](https://www.npmjs.com/package/cors)

```git
npm i --save-dev @types/cors
npm i cors
```

*   Instalamos el plugin para [dotenv (variables de entorno)](https://www.npmjs.com/package/dotenv)

```git
npm i --save-dev @types/dotenv
```

*   Instalamos el plugin para [morgan-middleware (errores, formatos, etc)](https://levelup.gitconnected.com/better-logs-for-expressjs-using-winston-and-morgan-with-typescript-1c31c1ab9342)

```git
npm i morgan @types/morgan
```

*   Instalamos el plugin para [nodemon (autoreload server)](https://www.npmjs.com/package/nodemon) de forma global y local

```git
npm i -g nodemon
npm i nodemon
```

*   Las variables de entorno utilizadas en el proyecto se mantienen para simplificar el proceso de configuración de las mismas. Es recomendado agregar el archivo correspondiente (.env) al .gitignore.
*   El siguiente script configurado en el package.json del proyecto es el encargado de
    *   Levantar el servidor con express (entorno productivo)
    *   Levantar el servidor con express y nodemon (entorno local dev)

```git
"scripts": {
   "start": "node src/server.ts",
   "start:dev": "nodemon src/server.ts"
 },
```

*   Ejecutamos la app desde terminal para entorno local.

```git
npm run start:dev
```

*   Ejecutamos la app desde terminal para entorno productivo.

```git
npm start
```

*   Si se presenta algún mensaje indicando qué el puerto 8080 ya está en uso, podemos terminar todos los procesos dependientes y volver a ejecutar la app

```git
npx kill-port 8080
npm run start:dev o npm start
```

<br>

</details>

### 1.3) Comandos de utilidad [🔝](#índice-)

<details>
  <summary>Ver</summary>

 <br>

<br>

</details>

### 1.4) Tecnologías [🔝](#índice-)

<details>
  <summary>Ver</summary>

 <br>

| **Tecnologías** | **Versión** | **Finalidad** |\
| ------------- | ------------- | ------------- |
| [NodeJS](https://nodejs.org/en/) | 14.18.1  | Librería JS |
| [Typescript](https://www.typescriptlang.org/) | 3.8.3  | Lenguaje con alto tipado basado en JS |
| [VSC](https://code.visualstudio.com/docs) | 1.72.2  | IDE |
| [Postman](https://www.postman.com/downloads/) | 10.11  | Cliente Http |
| [CMD](https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/cmd) | 10 | Símbolo del Sistema para linea de comandos |
| [Git](https://git-scm.com/downloads) | 2.29.1  | Control de Versiones |

</br>

| **Extensión** |\
| -------------  |
| Prettier - Code formatter |
| Typescript Toolbox - generate setters, getters, constrc, etc |
| Otras |

<br>

</details>

<br>

## Sección 2) Endpoints y Ejemplos.

### 2.0) Endpoints y recursos [🔝](#índice-)

<details>
  <summary>Ver</summary>

<br>

</details>

### 2.1) Ejemplos [🔝](#índice-)

<details>
  <summary>Ver</summary>
<br>

<br>

</details>

<br>

## Sección 3) Prueba de funcionalidad y Referencias.

### 3.0) Prueba de funcionalidad [🔝](#índice-)

<details>
  <summary>Ver</summary>

<br>

<br>

</details>

### 3.1) Referencias [🔝](#índice-)

<details>
  <summary>Ver</summary>

 <br>

#### Documentación

*   [Ejemplo básico de integración paypal](https://www.youtube.com/watch?v=sBenKZqEzpQ)
*   [PayPal developer doc](https://developer.paypal.com/home)

#### Códigos de integración Paypal

*   [Demo checkout, buttons, etc](https://demo.paypal.com/us/demo/code_samples?)

#### Herramientas

*   [Convert cURL para node-axios](https://curlconverter.com/node-axios/)

#### Remark

*   [remark-inline-links](https://github.com/remarkjs/remark-inline-links)
*   [remark-lint-list-item-indent](https://www.npmjs.com/package/remark-lint-list-item-indent)

<br>

</details>
