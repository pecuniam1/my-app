import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
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
  cartTaxes: number = 0;
  cartTaxPercent: number = 0.075;
  cartTotal: number = 0;

  constructor(private itemService: ItemService,
    private modalService: NgbModal) { }

  ngOnInit(): void {
    this.getCartItems();
    //this.getCartItemsTotal();
  }

  updateTotals(): void {
    let price: number = 0;
    if (this.cartItems !== undefined) {
      this.cartItems.forEach(element => {
        price += element.price;
      });
      this.cartItemsTotal = price;
    }
    else {
      console.log("called");
      console.log(this.cartItems)
    }
  }

  pay(paymentType: string): void {
    console.log(`you have paid with ${paymentType}`);
    this.itemService.emptyCart();
    this.showReceipt();
  }

  showReceipt(): void {

  }

  itemClick(element: number): void {
    this.cartItems.splice(element, 1);
  }

  checkout(): void {
    console.log("you checked out");
  } 
  
  getCartItems(): void {
    this.itemService.getCartItems()
      .subscribe(cartItems => this.cartItems = cartItems);
  };

  // getCartItemsTotal(): void {
  //   this.itemService.getCartItemsTotal()
  //     .subscribe(cartItemsTotal => this.cartItemsTotal = cartItemsTotal);
  // };



  // modal
  title: string = "appBootstrap";
  closeResult: string = "";

  open(content: any): void {
    this.modalService.open(content, {
      ariaLabelledBy: 'modal-basic-title',
      centered: true
    }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

}
