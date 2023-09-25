export { Book }; // hack to ignore Book from task 3
// TODO Define the 'ElectronicDevice' interface (or type)
interface ElectronicDevice {
  type: "electronic";
  brand: string;
  model: string;
}
// Define the 'Book' interface (or type)
interface Book {
  type: "book";
  title: string;
  author: string;
}
// Define the 'Product' type alias that can represent either 'ElectronicDevice' or 'Book'
type Product = ElectronicDevice | Book;

// Implement instances of the 'Product' type
function createElectronicDevice(): ElectronicDevice {
  // TODO: Prompt user for electronic device details (brand and model)
  const brand = prompt("Enter the electronic device brand:");
  const model = prompt("Enter the electronic device model:");
  // TODO: return object containing brand and model
  return {
    type: "electronic",
    brand: brand || "",
    model: model || "",
  };
}

function createBook(): Book {
  // TODO: Prompt user for book details (title and author)
  const title = prompt("Enter the book title:");
  const author = prompt("Enter the book author:");
  // TODO: return object containing title and author
  return {
    type: "book",
    title: title || "",
    author: author || "",
  };
}

// Create instances of 'Product'
const electronicProduct = createElectronicDevice();
const bookProduct = createBook();

// Display the details of each product
function displayProductDetails(product: Product) {
  console.log(`Product Type: ${product.type}`);
  if (product.type === "electronic") {
    console.log(`Brand: ${product.brand}`);
    console.log(`Model: ${product.model}`);
  } else {
    console.log(`Title: ${product.title}`);
    console.log(`Author: ${product.author}`);
  }
}

console.log("Electronic Device Details:");
displayProductDetails(electronicProduct);

console.log();

console.log("Book Details:");
displayProductDetails(bookProduct);
