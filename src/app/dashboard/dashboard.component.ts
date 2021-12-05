import { Component, OnInit, Input } from '@angular/core';
import { Item } from '../item';
import { ItemService } from '../item.service';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  @Input() serverNumber?: string;
  @Input() serverPassword?: string;

  items: Item[] = [];
  alert: boolean = false;

  constructor(private itemService: ItemService,
    private router: Router,
    private app: AppComponent) { }

  ngOnInit(): void {
    this.getItems();
  }

  keytab(event: any): void {
    let element: string = event.srcElement.id;
    if (element == "serverNameInput") {
      (document.querySelector("#serverPasswordInput") as HTMLElement).focus();
    }
    else if(element == "serverPasswordInput") {
      this.login();
    }
  }

  getItems(): void {
    this.itemService.getItems()
        .subscribe(items => this.items = items.slice(1, 5));
  }

  login(): void {
    // server number and password should be zero (0)
    console.log("trying to login");
    console.log(`username: ${this.serverNumber}, password: ${this.serverPassword}`);
    if (this.serverNumber == "0" && this.serverPassword == "0") {
      this.app.login();
    }
    else {
      this.alert = true;
    }
  }

  // dismiss alert
  close(): void {
    this.alert = false;
  }

}
