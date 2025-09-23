import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { BankRoutingModule } from "./bank-routing.module";
import { ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { AccountComponent } from "./components/account/account.component";
import { CustomersComponent } from "./components/customer/customer.component";
import { TransactionComponent } from "./components/transaction/transaction.component";
import { NavBarComponent } from "../navbar/navbar.component";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { EditAccountComponent } from "./components/accountedit/accountedit.component";
import { EditCustomerComponent } from "./components/customeredit/customeredit.component";

@NgModule({
  declarations: [
    AccountComponent,
    CustomersComponent,
    TransactionComponent,
    DashboardComponent,
    NavBarComponent,
    EditAccountComponent,
    EditCustomerComponent
  ],
  schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    CommonModule,
    BankRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  exports: [
    NavBarComponent
  ]
})
export class BankModule {}