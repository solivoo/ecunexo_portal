# EcuNexo Mail Service

Servicio HTTP simple con `nodemailer` para enviar correos desde el formulario de contacto.

## 1) Configurar variables

1. Copia `.env.example` a `.env`.
2. Completa credenciales SMTP y correos destino.

## 2) Instalar y ejecutar

```bash
cd mail-service
npm install
npm run dev
```

## 3) Endpoints

- `GET /health`
- `POST /api/mail/send`

Body esperado:

```json
{
  "name": "Juan Perez",
  "email": "juan@empresa.com",
  "company": "Mi Empresa S.A.",
  "message": "Hola, quiero una demo."
}
```
