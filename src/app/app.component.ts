import { Component, OnDestroy } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { Subscription } from 'rxjs';

export let BrowserRefresh = false;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnDestroy {

  subscription: Subscription;
  loggedIn: boolean = false;

  constructor(private router: Router) {
    this.subscription = router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        //this.logout();
      }
    })

  }

  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }

  login(): void {
    this.showCart();
    this.router.navigate(['/menu']);
    this.loggedIn = true;
  }
  
  logout(): void {
    this.hideCart();
    this.router.navigate(['']);
    this.loggedIn = false;
  }

  isCartVisible: boolean = false;

  title = 'Sample Point-of-Sale System';

  showCart(): void {
    this.isCartVisible = true;
  }

  hideCart(): void {
    this.isCartVisible = false;
  }

  routerClasses(): string {
    return "wrapper_router_with_cart";
    return this.loggedIn
    ? "wrapper_router_with_cart"
    : "wrapper_router_no_cart";
  }

  cartClasses(): string {
    return "wrapper_cart_with_cart";
    return this.loggedIn
    ? "wrapper_cart_with_cart"
    : "wrapper_cart_no_cart"
  }
}
