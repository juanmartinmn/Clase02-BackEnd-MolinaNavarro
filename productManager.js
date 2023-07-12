const fs = require('fs');

class ProductManager {
    constructor() {
        this.products = [];
        this.nextId = 1;
    }

    loadProductsFromFile(filePath) {
        try {
        const jsonData = fs.readFileSync(filePath, 'utf8');
        this.products = JSON.parse(jsonData);
        this.updateNextId();
        } catch (error) {
        console.error('Error: no se pudieron cargar productos de este archivo:', error);
        }
    }

    updateNextId() {
        if (this.products.length === 0) {
        this.nextId = 1;
        } else {
        const ids = this.products.map(product => product.id);
        this.nextId = Math.max(...ids) + 1;
        }
    }

    addProduct(title, description, price, thumbnail, code, stock) {
        const existingProduct = this.products.find(product => product.code === code);
        if (existingProduct) {
        console.error(`El producto con el codigo '${code}' ya existe.`);
        return;
        }

    if (!title || !description || !price || !thumbnail || !code || !stock) {
        console.error('Error: Campos incompletos.');
        return;
        }

    // creo un producto
    const product = {
        id: this.nextId,
        title: title,
        description: description,
        price: price,
        thumbnail: thumbnail,
        code: code,
        stock: stock
    };

    this.nextId++;

    // productos al array
    this.products.push(product);
    }

    getProducts() {
        return this.products;
    }

    getProductById(id) {
        const product = this.products.find((product) => product.id === id);
        if (product) {
            return product;
        } else {
            console.error('Product not found.');
          return null; // Return null or throw an error to indicate that the product was not found
        }
        }
    }

// Creo ProductManager
const manager = new ProductManager();

// Cargo productos
manager.loadProductsFromFile('products.json');

// addProduct
manager.addProduct('Californication', 'RHCP', 6000, 'ruta/cali.jpg', 'A007', 5);

// getProductById (deberia salir Definitely Maybe)
const productId = 3; // reemplazar por el id que se quiere buscar
const product = manager.getProductById(productId);
if (product) {
    console.log('Product found by ID:', product);
} else {
    console.log('Product not found.');
}

    
const allProducts = manager.getProducts();
console.log(allProducts);



