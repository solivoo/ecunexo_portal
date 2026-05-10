# Despliegue con Docker y Portainer

La aplicación consta de dos servicios: **web** (landing estática con nginx) y **mail** (API Express para el formulario).

## Requisitos en el servidor

- Docker Engine y plugin Compose v2 (Portainer ya los usa).
- Puerto **80** (web) y **4001** (API mail), o los que configures.

## 1. Clonar el repositorio

```bash
git clone <URL_DEL_REPO> ecunexo_landing_page
cd ecunexo_landing_page
```

## 2. Variables del servicio de correo

En **Portainer** no hace falta el archivo `mail-service/.env` en el servidor: define todas las variables `MAIL_*` en **Environment variables** del stack (o un `.env` de stack que Portainer cargue). Lista en `mail-service/.env.example`.

Para desarrollo local puedes usar un `.env` en la **raíz del repo** (junto a `docker-compose.yml`): Compose lo usa para sustituir `${MAIL_HOST}`, etc., al hacer `docker compose up`.

Ajusta al menos: `MAIL_HOST`, `MAIL_PORT`, `MAIL_SECURE`, `MAIL_USER`, `MAIL_PASS`, `MAIL_FROM_*`, `MAIL_TO`.

En producción define **`MAIL_ALLOWED_ORIGINS`** con las URLs exactas desde las que se carga la landing (incluye `https://` y variantes `www` si aplica), separadas por coma.

## 3. Variable crítica del frontend (`VITE_MAIL_SERVICE_URL`)

Vite **inyecta esta URL en el build**. Debe ser la URL **pública** que el navegador usará para llamar al API de correo, por ejemplo:

- Misma máquina con puertos expuestos: `http://IP_DEL_SERVIDOR:4001`
- Dominio dedicado al API: `https://mail-api.tudominio.com`

Si cambias el dominio o el puerto del API más adelante, **hay que reconstruir la imagen `web`** con el nuevo `VITE_MAIL_SERVICE_URL`.

## 4. Levantar con Compose (prueba local)

Desde la raíz del repo:

```bash
docker compose --env-file stack.env.example up -d --build
```

(Para producción crea un `stack.env` propio y no lo subas a git.)

Comprobaciones:

- Landing: `http://localhost` (o el `WEB_PORT` que hayas puesto).
- Health del mail: `GET http://localhost:4001/health` → `{"ok":true}`.
- CORS: el origen de la página debe estar en `MAIL_ALLOWED_ORIGINS` o en `MAIL_ALLOWED_ORIGIN` del `.env` del mail.

## 5. Portainer (Stack)

1. **Stacks** → **Add stack**.
2. **Web editor** o **Repository**: si usas Git, apunta a este repo y rama.
3. **Compose path**: `docker-compose.yml`.
4. **Environment variables** del stack (obligatorias las mismas que en `mail-service/.env.example` para SMTP y destino):
   - `VITE_MAIL_SERVICE_URL`, `MAIL_ALLOWED_ORIGINS`, `MAIL_HOST`, `MAIL_USER`, `MAIL_PASS`, `MAIL_FROM_EMAIL`, `MAIL_TO`, etc.
   - Opcional: `WEB_PORT`, `MAIL_PUBLISH_PORT`, `MAIL_PORT`, `MAIL_SECURE`, `MAIL_FROM_NAME`, `MAIL_ALLOWED_ORIGIN`.
5. **Deploy the stack** (ya no se usa `env_file: ./mail-service/.env` en el compose del repo).

Tras el primer despliegue, si solo cambias variables del **mail**, basta con **recreate** del servicio `mail`. Si cambias **`VITE_MAIL_SERVICE_URL`**, hay que **rebuild** del servicio **`web`**.

## Estructura relevante

| Archivo | Uso |
| -------- | --- |
| `Dockerfile` | Build multi-stage del frontend (pnpm → nginx). |
| `docker/nginx.conf` | SPA + `try_files` para React Router si lo usas después. |
| `mail-service/Dockerfile` | Imagen Node del API de correo. |
| `docker-compose.yml` | Servicios `web` y `mail`. |
