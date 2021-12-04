import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Item } from '../item';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})

export class MenuComponent implements OnInit {

  item: Item ={
    id: 1,
    name: 'Hamburger'
  };

  constructor() { }

  ngOnInit(): void {
  }

}
