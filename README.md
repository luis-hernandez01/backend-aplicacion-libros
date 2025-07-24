

#Pasos a seguir para instalar el backend realizado en NESTJS el cual es consumido por el frontend en ANGULAR V19
version nestjs: 11.0.7
node: v22.17.1
PostgreSQL
TypeORM
Axios + Cheerio (para web scraping)

Jest (pruebas unitarias)

○ GET /books: listado completo
○ GET /books/:id: detalle
○ GET /books?category=x: filtrado por categoría
○ DELETE /books/:id: eliminar libro

#Requistos para obtener el backen de nestjs
Instalar globalmente npm install -g @nestjs/cli

#INSTALACION

1) Descargar el back  git clone https://github.com/luis-hernandez01/backend-aplicacion-libros.git
2) ingresar al proyecto con el comando de windows cd nombre_proyecto
3) instalar las dependencias necesarias con el siguiente comando npm install
4) luego ejecutar lo siguiente para que se inicialice el proyecto y abra el navegador 
npm run start
 5) Para la realizacion de las pruebas ejecutar npm run test
 6) cambiar parametros de conexion desde app.module

prealizacion de pruebas con Postman
lista                   =>        http://localhost:3000/books
Buscar por categoria    =>        http://localhost:3000/books?category=Poetry
detalle                 =>        http://localhost:3000/books/2
Eliminar                =>        http://localhost:3000/books/20
Scraping                =>        http://localhost:3000/books/scrape-books
