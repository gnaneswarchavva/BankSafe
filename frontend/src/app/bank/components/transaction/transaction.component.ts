import { Component, OnInit, Optional } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Observable, map, of } from "rxjs";
import { BankService } from "../../services/bank.service";
import { Transaction } from "../../types/Transaction";
import { ActivatedRoute, Router } from "@angular/router";
import { Account } from "../../types/Account";
import { Customer } from "../../types/Customer";

@Component({
  selector: "app-transaction",
  templateUrl: "./transaction.component.html",
  styleUrls: ["./transaction.component.scss"],
})
export class TransactionComponent implements OnInit {
  transactionForm: FormGroup;
  accounts$: Observable<Account[]>;
  accounts: Account[] = [];
  date: Date;
  role: string | null;
  userId: string | null;
  transactionError$: Observable<string> | undefined;
  transactionError: string
  transactionSuccess$: Observable<string> | undefined;
  transactionSuccess: string
  users$: Observable<Customer[]>;
  isFormSubmitted: boolean = false;

  errorMessages: { [key: string]: string } = {
    NOT_ENOUGH_BALANCE: "Not enough balance to complete transaction",
  };

  constructor(
    private formBuilder: FormBuilder,
    private bankService: BankService,
    @Optional() private route: ActivatedRoute,
    private router: Router
  ) { }

  // ngOnInit(): void {
  //   this.role = localStorage.getItem("role");
  //   this.userId = localStorage.getItem("user_id");


  //   if (this.role == 'USER') {
  //     // this.accounts$ = this.bankService.getAccounts(strUserId);

  //     this.accounts$ = this.bankService.getAccountsByUser(this.userId);

  //   } else {
  //     this.accounts$ = this.bankService.getAllAccounts();
  //     console.log(this.accounts$);

  //   }
  //   console.log(this.accounts$);


  //   this.transactionForm = this.formBuilder.group({
  //     accounts: ["", Validators.required],
  //     amount: ["", Validators.required],
  //     transactionType: ["", Validators.required],


  //   });
  // }

  ngOnInit(): void {
    this.role = localStorage.getItem("role");
    this.userId = localStorage.getItem("user_id");

    if (this.role === 'USER') {
      if (this.bankService.getAccountsByUser) {
        this.accounts$ = this.bankService.getAccountsByUser(this.userId);
      } else {
        this.accounts$ = of([]);
      }
    } else {
      if (this.bankService.getAllAccounts) {
        this.accounts$ = this.bankService.getAllAccounts();
      } else {
        this.accounts$ = of([]);
      }
    }

    this.accounts$.subscribe(data => {
      this.accounts = data;
    });

    this.transactionForm = this.formBuilder.group({
      accounts: [null, Validators.required],
      transactionType: [null, Validators.required],
      amount: [null, [Validators.required, Validators.min(1)]]
    });
  }


  // onSubmit() {
  //   this.isFormSubmitted = true;
  //   this.transactionError$ = of("");
  //   this.transactionSuccess$ = of("");
  //   if (this.transactionForm.invalid) {
  //     return;
  //   } else {
  //     const data = this.transactionForm.value;
  //     console.log(data);
  //     data.transactionDate = new Date();
  //     const transaction: Transaction = new Transaction(data);
  //     console.log(transaction);
  //     this.bankService.performTransaction(transaction).subscribe(
  //       (res: any) => {
  //         this.transactionSuccess$ = of("Transaction performed successfully");
  //       },
  //       ({ error }) => {
  //         this.transactionError$ = of(this.errorMessages[error.message]);
  //       }
  //     );
  //   }
  // }

  onSubmit() {
    this.isFormSubmitted = true;

    if (this.transactionForm.invalid) {
      return;
    }

    const data = this.transactionForm.value;
    console.log(data);
    
    data.transactionDate = new Date();
    const transaction: Transaction = new Transaction(data);
    console.log(transaction);
    

    this.bankService.performTransaction(transaction).subscribe({
      next: (res) => {
        this.transactionError = "";
        this.transactionSuccess = "Transaction performed successfully";
      },
      error: (error) => {
        this.transactionSuccess="";
        this.transactionError = error.error;
        console.log('Error performing transactions', error)
      }
    })
  }
}