import { Component } from "@angular/core";
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class InvoiceComponent {
  constructor(private http : HttpClient) {};

  invoice: any = {
    "id": "",
    "logo": "",
    "from": "",
    "bill_to": "",
    "address": "",
    "date": "",
    "note": "",
    "items":[],
    "discount": "",
    "tax_after_discount": "",
    "shipping": "",
    "prepaid": ""
  }

  ngOnInit() {
    this.loadShow();
  }

  loadShow() :void {
    this.http.get<any>("../assets/json/Invoice.json")
      .subscribe((data: any) => {
        this.invoice = data;
      });
  }
};
