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

  loadShow() : void {
    this.http.get<any>("../assets/json/Invoice.json")
      .subscribe((data: any) => {
        this.invoice = data;
      });
  };

  totalAmount() : number {
    return this.invoice.items.reduce(
      function (total :number, item :any) {
        return total + (item.rate * item.quantity);
      },
      0
    );
  };

  calDiscount() : string {
    return (this.totalAmount() * this.invoice.discount).toFixed(2);
  };

  calTaxAfterDiscout() :string {
    return ((this.totalAmount() - parseFloat(this.calDiscount())) * this.invoice.tax_after_discount).toFixed(2);
  };

  formatShipping() : string {
    let val = parseFloat(this.invoice.shipping);

    return val.toFixed(2);
  };

  formatAmountPaid() :string {
    let val = parseFloat(this.invoice.prepaid);

    return val.toFixed(2);
  };

  calTotal() : string {
    let val = (
      (this.totalAmount() - parseFloat(this.calDiscount())) +
      (parseFloat(this.calTaxAfterDiscout()) + parseFloat(this.formatShipping()) )
    );

    return val.toFixed(2);
  };

  calBalanceDue() : string {
    let val = (parseFloat(this.calTotal()) - parseFloat(this.formatAmountPaid()));

    return val.toFixed(2);
  };

  handleSplitNumberWithDot(val : any) : string {
    val = val + '';
    const splitVal = val.split('.');

    if (splitVal.length > 1) {
      return `${this.formatMoney(splitVal[0])}.${splitVal[1]}`
    } else {
      return val;
    }
  };

  formatMoney(val : any) : string {
    if (!val) {
      return '';
    };

    return val.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  validateMMDDYYYY(val : string) : boolean {
    if (!val) {
      return false;
    }

    const re = /^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/;

    return re.test(val);
  };

  formatDate(val : string) : string {
    if (!val) {
      return '';
    };

    if (!this.validateMMDDYYYY(val)) {
      const split = val.split('/');
      let textMonth = '';

      switch (split[0]) {
        case '01':
        case '1': {
          textMonth = 'Jan';

          break;
        };

        case '02':
        case '2': {
          textMonth = 'Feb';

          break;
        };

        case '03':
        case '3': {
          textMonth = 'Mar';

          break;
        };

        case '04':
        case '4': {
          textMonth = 'Apr';

          break;
        };

        case '05':
        case '5': {
          textMonth = 'May';

          break;
        };

        case '06':
        case '6': {
          textMonth = 'Jun';

          break;
        };

        case '07':
        case '7': {
          textMonth = 'Jul';

          break;
        };

        case '08':
        case '8': {
          textMonth = 'Aug';

          break;
        };

        case '09':
        case '9': {
          textMonth = 'Sep';

          break;
        };
        case '10': {
          textMonth = 'Oct';

          break;
        };

        case '11': {
          textMonth = 'Nov';

          break;
        };

        case '12': {
          textMonth = 'Dec';

          break;
        }

        default: {
          textMonth = '';
        };
      };

      return `${textMonth} ${split[1]}, ${split[2]}`;
    }

    return '';
  }

};
