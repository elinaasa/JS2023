// TODO: Write interface Item
// TODO: Define the properties 'name', 'price', and 'quantity' within the interface
interface Item {
  name: string;
  price: number;
  quantity: number;
}
// Create an empty array named 'cart' to store the items
const cart: Item[] = [];

// TODO: Implement a loop to prompt the user for item details
// Use 'while' loop to keep prompting until an empty item name is entered
while (true) {
  // TODO: Prompt user for item name, price, and quantity
  const itemName =
    prompt("Enter the item name (or leave empty to finish):") || "";

  // Break the loop if an empty item name is entered
  if (itemName === "") {
    break;
  }

  const itemPriceInput: string | null = prompt("Enter the item price");
  const itemQuantityInput: string | null = prompt("Enter the item quantity");

  // Convert input to numbers, defaulting to 0 if the input is null or cannot be parsed
  const itemPrice: number = itemPriceInput ? parseFloat(itemPriceInput) : 0;
  const itemQuantity: number = itemQuantityInput
    ? parseInt(itemQuantityInput)
    : 0;

  // Create an item object and add it to the 'cart' array
  const newItem: Item = {
    name: itemName,
    price: itemPrice,
    quantity: itemQuantity,
  };
  cart.push(newItem);
}

// Calculate the total cost using the 'map' and 'reduce' functions
const totalCost = cart
  .map((item) => item.price * item.quantity)
  .reduce((sum, cost) => sum + cost, 0);

// Display the total cost to the user
console.log(`Total cost of the shopping cart: $${totalCost.toFixed(2)}`);
