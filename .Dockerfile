# ----------------------------
# ETAPA 1: Construcción (Node.js)
# ----------------------------
    FROM node:20-alpine AS build

    # Establecemos el directorio de trabajo
    WORKDIR /app
    
    # Copiamos primero los archivos de dependencias para aprovechar el caché de Docker
    COPY package*.json ./
    
    # Instalamos las dependencias
    # Usamos 'npm ci' que es más rápido y limpio para entornos de CI/CD, 
    # pero si te da error, cámbialo por 'npm install --legacy-peer-deps' 
    # ya que veo que usas muchas librerías de UI que a veces dan conflictos.
    RUN npm install --legacy-peer-deps
    
    # Copiamos el resto del código fuente
    COPY . .
    
    # Construimos la aplicación para producción
    RUN npm run build -- --configuration production
    
    # ----------------------------
    # ETAPA 2: Servidor Web (Nginx)
    # ----------------------------
    FROM nginx:alpine
    
    # Copiamos el archivo de configuración de Nginx (que crearemos abajo)
    COPY nginx.conf /etc/nginx/conf.d/default.conf
    
    # Copiamos los archivos compilados desde la Etapa 1
    # OJO AQUÍ: Según tu angular.json el proyecto se llama "velzon".
    # La ruta estándar es /dist/velzon. 
    COPY --from=build /app/dist /usr/share/nginx/html
    
    # Exponemos el puerto 80
    EXPOSE 80
    
    # Arrancamos Nginx
    CMD ["nginx", "-g", "daemon off;"]