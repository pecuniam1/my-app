import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Item } from '../item';
import { ItemService } from '../item.service';
import { CART_ITEMS } from '../menu-items';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  cartItems: Item[] = [];
  cartItemsTotal: number = 0;

  constructor(private itemService: ItemService) { }

  ngOnInit(): void {
    this.getCartItems();
    this.getCartItemsTotal();
  }

  checkout() : void {
    console.log("you have checked out.");
  }

  getCartItems(): void {
    this.itemService.getCartItems()
      .subscribe(cartItems => this.cartItems = cartItems);
  };

  getCartItemsTotal(): void {
    this.itemService.getCartItemsTotal()
      .subscribe(cartItemsTotal => this.cartItemsTotal = cartItemsTotal);
  };
}
