# UASD Chat — Consulta del Estatuto Orgánico

Chatbot inteligente para consultar el Estatuto Orgánico de la Universidad Autónoma de Santo Domingo (UASD), impulsado por la API de Claude (Anthropic).

## Tecnologías

- **Next.js 14** (App Router)
- **TypeScript**
- **API de Anthropic (Claude)**
- CSS puro (sin frameworks)

## Estructura del proyecto

```
uasd-chatbot/
├── app/
│   ├── api/chat/route.ts   # Endpoint de la IA
│   ├── globals.css         # Estilos globales
│   ├── layout.tsx          # Layout raíz
│   └── page.tsx            # Página principal (chatbot)
├── lib/
│   ├── estatuto.ts         # Contenido del Estatuto + system prompt
│   └── preguntas.ts        # Preguntas sugeridas
├── .env.local.example      # Plantilla de variables de entorno
└── README.md
```

## Configuración local

### 1. Instalar dependencias
```bash
npm install
```

### 2. Configurar la API key
```bash
cp .env.local.example .env.local
```
Edita `.env.local` y añade tu API key de Anthropic:
```
ANTHROPIC_API_KEY=sk-ant-tu-clave-aqui
```
Obtén tu clave en: https://console.anthropic.com/

### 3. Ejecutar en desarrollo
```bash
npm run dev
```
Abre http://localhost:3000

## Despliegue en Vercel

1. Sube el proyecto a GitHub (el `.gitignore` ya excluye `.env.local`).
2. Importa el repositorio en [Vercel](https://vercel.com/new).
3. En la configuración del proyecto en Vercel, ve a **Settings → Environment Variables**.
4. Añade la variable:
   - **Name:** `ANTHROPIC_API_KEY`
   - **Value:** tu clave de Anthropic
5. Haz clic en **Deploy**.

¡Listo! Vercel detecta automáticamente que es un proyecto Next.js.

## Funcionalidades

- 💬 Chat conversacional con historial de sesión
- 📚 Base de conocimiento: Estatuto Orgánico de la UASD
- ❓ 35+ preguntas sugeridas organizadas por categoría
- 📱 Diseño responsive (computadora, tableta, teléfono)
- ⚠️ Manejo de errores de API
- 🚫 Respuestas limitadas al contenido del Estatuto
