import {Component, Input, OnInit} from '@angular/core';
import {Order} from "../../../models/order.model";
import {OrderLine} from "../../../models/order-line.model";
import {ApiService} from "../../../services/api.service";
import {ProductService} from "../../../services/product.service";

@Component({
  selector: 'app-user-order-line',
  templateUrl: './user-order-line.component.html',
  styleUrls: ['./user-order-line.component.scss']
})
export class UserOrderLineComponent implements OnInit {

  @Input() order: Order;
  @Input() index: number;

  public orderLines: OrderLine[] = [];

  constructor(private apiService: ApiService,
              private productService: ProductService) { }

  ngOnInit(): void {
    this.apiService.getOrderLines(this.order.id).subscribe(data => {
      this.orderLines = data;
    })
  }

  getProductName(orderLine: OrderLine){
    return this.productService.searchByID(orderLine.product).name;
  }

}
