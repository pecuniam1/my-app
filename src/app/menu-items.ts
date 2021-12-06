import { Item } from './item';

export const ITEMS: Item[] = [
    { id: 0, name: 'Hamburger', price: 6.99 },
    { id: 1, name: 'Hot Dog', price: 5.89 },
    { id: 2, name: 'French Fries', price: 2.45 },
    { id: 3, name: 'Cole Slaw', price: 1.99 },
    { id: 4, name: 'Cola', price: 2.49 },
    { id: 5, name: 'Salad', price: 7.99 },
    { id: 6, name: 'Chicken Soup', price: 3.49 }
];

// this is what is the transaction list
export var CART_ITEMS: Item[] = [];

export class MenuItems {

    clearCart(): void {
        CART_ITEMS = [];
    }
}
