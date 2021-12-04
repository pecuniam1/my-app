import { Injectable } from '@angular/core';
import { Item } from './item';
import { ITEMS } from './menu-items';
import { CART_ITEMS } from './menu-items';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor(private messageService: MessageService) { }

  // get
  getItems(): Observable<Item[]> {
    const items = of(ITEMS);
    this.messageService.add('ItemService: fetched items');
    return items;
  }

  getItem(id: number): Observable<Item> {
    // for now, assume that a hero with the specified 'id' always exists.
    // Erro handling will be added in the next step of the tutorial.
    const item = ITEMS.find(i => i.id === id)!;
    this.messageService.add(`ItemService: fetched item id=${id}`);
    return of(item);
  }


  // cart

  // add
  addCartItem(id: number): void {
    CART_ITEMS.push(ITEMS[id]);
  }

  getCartItems(): Observable<Item[]> {
    const items = of(CART_ITEMS);
    this.messageService.add('Get cart items.');
    return items;
  }

  getCartItemsTotal(): Observable<number> {
    if (CART_ITEMS.length <= 0) return of(0);
    const total = of(CART_ITEMS.map(i => i.price).reduce((a, b) => a + b));
    return total;
  }
  

}
