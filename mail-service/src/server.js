import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import nodemailer from 'nodemailer'

dotenv.config()

const app = express()

const port = Number(process.env.MAIL_SERVICE_PORT ?? 4001)
const allowedOrigin =
  process.env.MAIL_ALLOWED_ORIGIN ?? 'http://localhost:5173'
const allowedOriginsList = process.env.MAIL_ALLOWED_ORIGINS
  ? process.env.MAIL_ALLOWED_ORIGINS.split(',').map((value) => value.trim()).filter(Boolean)
  : [allowedOrigin]

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOriginsList.includes(origin)) {
        callback(null, true)
        return
      }
      callback(null, false)
    },
  }),
)
app.use(express.json({ limit: '1mb' }))

const smtpPort = Number(process.env.MAIL_PORT ?? 587)
const smtpSecure = String(process.env.MAIL_SECURE ?? 'false') === 'true'

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: smtpPort,
  secure: smtpSecure,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
})

app.get('/health', (_req, res) => {
  res.status(200).json({ ok: true })
})

app.post('/api/mail/send', async (req, res) => {
  const { name, email, company, message } = req.body ?? {}

  if (!name || !email || !message) {
    res.status(400).json({ ok: false, error: 'name, email y message son obligatorios' })
    return
  }

  const fromName = process.env.MAIL_FROM_NAME ?? 'EcuNexo'
  const fromEmail = process.env.MAIL_FROM_EMAIL ?? process.env.MAIL_USER
  const toEmail = process.env.MAIL_TO

  if (!fromEmail || !toEmail) {
    res.status(500).json({ ok: false, error: 'Falta configurar MAIL_FROM_EMAIL o MAIL_TO' })
    return
  }

  const html = `
    <h2>Nuevo contacto desde landing</h2>
    <p><strong>Nombre:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Empresa:</strong> ${company || 'No especificada'}</p>
    <p><strong>Mensaje:</strong></p>
    <p>${String(message).replace(/\n/g, '<br/>')}</p>
  `

  try {
    await transporter.sendMail({
      from: `"${fromName}" <${fromEmail}>`,
      to: toEmail,
      replyTo: email,
      subject: `Nuevo lead: ${name}`,
      text: `Nombre: ${name}\nEmail: ${email}\nEmpresa: ${company || 'No especificada'}\n\nMensaje:\n${message}`,
      html,
    })

    res.status(200).json({ ok: true })
  } catch (error) {
    res.status(500).json({ ok: false, error: 'No se pudo enviar el correo' })
  }
})

app.listen(port, '0.0.0.0', () => {
  // eslint-disable-next-line no-console
  console.log(`Mail service escuchando en http://0.0.0.0:${port}`)
})
