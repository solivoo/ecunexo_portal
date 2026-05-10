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

Copia el ejemplo y edita con tus credenciales SMTP (no subas `.env` al repositorio):

```bash
cp mail-service/.env.example mail-service/.env
```

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
4. **Environment variables** (o sube un `.env` de stack):
   - `VITE_MAIL_SERVICE_URL`: URL pública del servicio mail vista desde el navegador.
   - `MAIL_ALLOWED_ORIGINS`: orígenes CORS (URLs de la landing).
   - Opcional: `WEB_PORT`, `MAIL_PUBLISH_PORT`.
5. Para el archivo **`mail-service/.env`**, en Portainer suele usarse **Secrets** o montar el archivo; alternativa: definir cada variable `MAIL_*` en el entorno del servicio `mail` (misma lista que en `mail-service/.env.example`).
6. **Deploy the stack**.

Tras el primer despliegue, si solo cambias variables del **mail**, basta con **recreate** del servicio `mail`. Si cambias **`VITE_MAIL_SERVICE_URL`**, hay que **rebuild** del servicio **`web`**.

## Estructura relevante

| Archivo | Uso |
| -------- | --- |
| `Dockerfile` | Build multi-stage del frontend (pnpm → nginx). |
| `docker/nginx.conf` | SPA + `try_files` para React Router si lo usas después. |
| `mail-service/Dockerfile` | Imagen Node del API de correo. |
| `docker-compose.yml` | Servicios `web` y `mail`. |
