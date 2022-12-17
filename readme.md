Proyecto Backend de coderhouse.

Passport: Para acceder a las diferentes rutas de las paginas es necesario registrarse. Una vez registrado el usuario puede loguearse y de esa forma podra acceder a las diferentes rutas de la app.

Productos:
El link de la barra PRODUCTOS solo se puede acceder una vez logueado el usuario. El link a traves de una peticion GET trae todos los productos existentes. En la misma pagina a traves de un formulario POST se puede agregar productos nuevos.
Get: Colocando el ID despues de api/products como parametro podemos obtener un producto en particular en un json con una peticion tipo GET.
Delete: Colocando el ID despues de api/products como parametro podemos borrar un producto en particular con una peticion tipo DELETE.
PUT: Con el el ID del producto como parametro y los cambios realizados a traves del body podemos actualizar/modificar los productos existentes.

Carrito:
En el link de la barra CARRITO podemos observar los ID de los carritos y de los usuarios (tenia la intencion de mostrar los contenidos de los carritos pero no encontre la forma correcta de renderizarlos). En api/cart agregando el ID de un carrito podemos ver en un json el contenido de carrito.
POST: En api/cart a traves de una peticion POST creamos un carrito nuevo.
DELETE: Agregando el id del carrito despues de api/cart borramos el carrito seleccionado con una peticion DELETE.
DELETE: En la ruta api/cart agregando el ID del producto, colocando despues 
/product/ seguido del ID del carrito borramos el producto que encuentra dentro del carrito (api/cart/idproducto/product/idcarrito).
POST: En la ruta api/cart agregando el ID del producto, colocando despues 
/product/ seguido del ID del carrito agregamos un nuevo producto al carrito (api/cart/idproducto/product/idcarrio) con una peticion POST.
GET: En la ruta api/product agregamos el ID del carrito seguido de la palabra productos (api/cart/idcarrito/productos) enviamos las notificaciones correspondiente (mail con los productos comprados, mensaje de aviso de compra y mail al administrador) de los productos comprados.

