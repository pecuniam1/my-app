import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Item } from '../item';
import { ItemService } from '../item.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  cartItems: Item[] = [];
  TaxPercent: number = 0.075;  // this is 7.5%

  constructor(private itemService: ItemService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.getCartItems();
  }
  
  getCartItems(): void {
    this.itemService.getCartItems()
      .subscribe(cartItems => {
        this.cartItems = cartItems
      });
  };

  // Cart functions *****************************************
  clearCart() {
    this.itemService.emptyCart();
  }

  deleteItem(element: number): void {
    this.cartItems.splice(element, 1);    
  }

  // this is the bottom portion of the cart with the subtotal, taxes, and total

  getTotalItems() {
    if (this.cartItems == undefined) return 0;
    else return this.cartItems.length;
  }

  getSubtotal() {
    if (this.cartItems == undefined) return 0;
    else {
      var number = 0;
      this.cartItems.forEach(element => {
        number += element.price
      });
      return number;
    }
  }

  getTaxes() {
    return this.getSubtotal() * this.TaxPercent;
  }

  getTotal() {
    return this.getSubtotal() + this.getTaxes();
  }

  // These are the modal functions ***********************************************
  pay(paymentType: string): void {
    console.log(`you have paid with ${paymentType}`);
    this.itemService.emptyCart();
    this.showReceipt();
  }

  showReceipt(): void { }

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
