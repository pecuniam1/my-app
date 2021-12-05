import { Component, OnInit } from '@angular/core';

import { Item } from '../item';
import { ItemService } from '../item.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})

export class MenuComponent implements OnInit {
  items: Item[] = [];

  constructor(private itemService: ItemService) { }

  ngOnInit(): void {
    this.getItems();
  }
  
  getItems(): void {
    this.itemService.getItems()
        .subscribe(items => this.items = items);
  }

  addItem(id: number): void {
    this.itemService.addCartItem(id);
  }

}
