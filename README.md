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



## Funcionalidades

-  Chat conversacional con historial de sesión
-  Base de conocimiento: Estatuto Orgánico de la UASD
-  35+ preguntas sugeridas organizadas por categoría
-  Diseño responsive (computadora, tableta, teléfono)
-  Manejo de errores de API
-  Respuestas limitadas al contenido del Estatuto
