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
  cartItemsTotal: number = 0;
  cartTaxes: number = 0;
  cartTaxPercent: number = 0.075;
  cartTotal: number = 0;

  constructor(private itemService: ItemService,
    private modalService: NgbModal) {
     }

  ngOnInit(): void {
    this.getCartItems();
    this.getCartItemsTotal();
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
    if (this.cartItems.length <= 0) {
      this.cartItemsTotal = 0;
      return;
    }
    this.cartItemsTotal = this.cartItems.map(ci => ci.price).reduce((a, b) => a + b);
  }

  update(): void {
    console.log("blah");
  }

  checkout(): void {
    console.log("you checked out");
  }

  // cart  
  getCartItems(): void {
    this.itemService.getCartItems()
      .subscribe(cartItems => {
        this.cartItems = cartItems
      });
  };



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
