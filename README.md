# CasaClara / Inmoving Area 🌟  
Tu herramienta personal para filtrar y visualizar anuncios de inmuebles de forma eficiente.

## 🚀 Descripción  
CasaClara es una aplicación web diseñada para ayudarte a filtrar anuncios de inmuebles (pisos, garajes, locales, etc.) extraídos mediante web scraping. Presenta la información más relevante como:  
- **Nombre del anuncio.**  
- **Precio en euros.**  
- **Teléfono (particular o inmobiliaria).**  
- **Categoría y ubicación/proximidad.**  

Contará con una vista detallada para ver fotos adicionales, descripciones completas, y más.  

## Estado del proyecto
El proyecto esta en fase inicial, estoy solo desarrollandolo por pasion en mis ratos libres. Es posible que todas las funcionalidades que se describen no esten todavia implementadas.

## 🛠️ Plan de Tecnologías  
### Frontend  
- **Vue.js** + **Vite**  
- **Vuetify** (para componentes visuales).  
- **Axios** (para llamadas a la API).  

### Backend  
- **Node.js** + **Express**  
- **Puppeteer** / **Cheerio** (para scraping).  
- **PostgreSQL** + **PostGIS** (para almacenamiento y búsquedas geoespaciales).  Almacenada en **Supabase**

### Despliegue  
- **Vercel**   

## 📖 Características Principales  
1. **Scraping Inteligente:** Extrae información clave de sitios de anuncios automáticamente.  
2. **Filtros y Ordenación:** Filtra por categoría, precio, o ubicación y ordena los resultados por proximidad a ti.  
3. **Vista Detallada:** Amplía los detalles de un anuncio específico, incluyendo todas las fotos y descripción completa.  
4. **Mapa Interactivo (opcional):** Visualiza la ubicación de los inmuebles en un mapa dinámico.  

## 📦 Instalación y Uso  
1. Clona el repositorio:  
   ```bash
   git clone https://github.com/DyLaNHurtado/casaclara.git  
   cd casaclara  

    Instala las dependencias:

# Instalar frontend  
cd frontend  
npm install  

# Instalar backend  
cd ../backend  
npm install  

Configura las variables de entorno:

    .env (Backend): No son publicas, no todo el mundo tiene acceso a ellas.
Ejecuta la aplicación:

    # Inicia el backend  
    cd casaclara-backend  
    npm run dev  

    # Inicia el frontend  
    cd casaclara-frontend  
    npm run dev  

    Abre el navegador en: http://localhost:3000.

🔍 Roadmap

Ir siguendo el plan con las tecnologias descritas.

Agregar notificaciones automáticas para nuevos anuncios.
Mejorar el sistema de scraping para adaptarse a múltiples sitios.

    Integrar más opciones de exportación (CSV, PDF).

¡Esperamos que CasaClara sea tu compañero perfecto para encontrar inmuebles sin esfuerzo! 🌐
🤝 Contribuciones

¡Las contribuciones son bienvenidas! Si tienes ideas o encuentras un error, abre un issue o crea un pull request.
