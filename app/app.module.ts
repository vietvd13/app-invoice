import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from '@angular/common/http';
import { InvoiceComponent } from './Invoice.component';

@NgModule({
  imports: [BrowserModule, HttpClientModule, FormsModule],
  declarations: [InvoiceComponent],
  bootstrap: [InvoiceComponent]
})
export class AppModule {

}
