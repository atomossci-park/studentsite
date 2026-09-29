# Google Cloud Run static-site container. Never copy backend or secrets here.
FROM nginx:stable-alpine
RUN rm -rf /usr/share/nginx/html/*
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY index.html privacy.html config.js app.js bank.js style.css icon.svg icon-192.png icon-512.png manifest.webmanifest sw.js /usr/share/nginx/html/
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
