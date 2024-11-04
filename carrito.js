export default class carrito{

    constructor(productos = []){
        this.productos = productos;
      
    }

    actualizarUnidades(sku,unidades,title = "",price = 0){
       const producto = this.productos.find(product => product.sku === sku);

       if (producto) {
        producto.quantity = unidades;
    } else {
        
        this.productos.push({ sku: sku, title: title, price: price, quantity: unidades });
    }
}
    
    

    obtenerInformacionProducto(sku) {
        const producto = this.productos.find(product => product.sku === sku);
        if (producto) {
           
            return {
                sku: producto.sku,
                title: producto.title,
                price: producto.price,
                quantity: producto.quantity
            };
        } else {
        
            return alert("producto no disponible");

        }
    }

    obtenerCarrito() {
        let total = 0;
        const currency = " €";
        
        const products = this.productos.map(product => {
            total += product.quantity * product.price;
            return {
                sku: product.sku,
                title: product.title,
                price: product.price,
                quantity: product.quantity
            };
         });
         return {
                total: total.toFixed(2),
                currency: currency,
                products: products
                };
      }


}