import { restaurants, Restaurant } from "./restaurants";
import { orders, Order, PriceBracket } from "./orders";

/**
 * This function returns the minimum price and the maximum price of each price range 
 * @param priceBracket - Takes one of the values of the enum PriceBracket (Low / Medium / High)
 * @returns a tuple of two numbers - the minimum price and the maximum price of the enum passed as parameter
 */
const getMinMaxPrice = (priceBracket: PriceBracket): [number, number] => {
  let minPrice: number = 0;
  let maxPrice: number = 0;
  switch (priceBracket) {
    case PriceBracket.Low:
      minPrice = 0;
      maxPrice = 10;
      break;
    case PriceBracket.Medium:
      minPrice = 10;
      maxPrice = 20;
      break;
    case PriceBracket.High:
      minPrice = 20;
      maxPrice = 30;
      break;
  }
  return [minPrice, maxPrice];
}

/**
 * This function filters through the orders to return the list of orders that are less then or equal to the max price
 * @param price - Enum PriceBracket
 * @param orders - Two dimensional array containing the orders ordered by restaurant
 * @returns a value of type Order[][] - Two dimensional array containing the orders filtered by price
 */
const getOrders = (price: PriceBracket, orders: Order[][]): Order[][] => {
  let filteredOrders: Order[][] = [];
  orders.forEach(restaurant => {filteredOrders.push(
      restaurant.filter(order => order.price > getMinMaxPrice(price)[0] && order.price <= getMinMaxPrice(price)[1]));
  });
  return filteredOrders;
}

/**
 * This function prints the orders for each restaurant in a pretty format
 * @param orders - A two dimensional array of orders ordered by restaurant. Each index in the orders array matches the index of the restaurant in the restaurants array.
 * @returns void - This function simply logs the orders to the console.
 */
const printOrders = (range: PriceBracket, orders: Order[][]): void => {
  orders.forEach((restaurantOrders, restaurantIndex) => {
    console.log(`#${restaurantIndex + 1} ${restaurants[restaurantIndex].name}`);
    if (restaurantOrders.length === 0) console.log(`- No order in the price range ${range}`);
    restaurantOrders.forEach((order, orderIndex) => {
      console.log(`- Order ${orderIndex + 1}: \$${order.price}`);
    });
  });
}

// Main
const priceRange: PriceBracket = PriceBracket.High;
const elligibleOrders = getOrders(priceRange, orders);
printOrders(priceRange, elligibleOrders);
