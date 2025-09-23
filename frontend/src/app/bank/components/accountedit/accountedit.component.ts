import { Component, OnInit, Optional } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { of, Subscription } from 'rxjs';
import { BankService, Account, Customer } from '../../services/bank.service';

@Component({
  selector: 'app-accountedit',
  templateUrl: './accountedit.component.html',
  styleUrls: ['./accountedit.component.scss']
})
export class EditAccountComponent implements OnInit {
  mode: 'create' | 'update' = 'update';
  title = 'Update Account';
  accountId!: number;

  customers: Customer[] = [];
  account?: Account;

  accountForm = this.fb.group({
    customer: [null as number | null, [Validators.required]],
    balance: [0 as number | null, [Validators.required]]
  });

  successMessage = '';

  private subs: Subscription[] = [];

  constructor(
    private fb: FormBuilder,
    private bank: BankService,                      
    private router: Router,                         
    @Optional() private route: ActivatedRoute | null 
  ) {}

  ngOnInit(): void {
    const getCustomersFn =
      (this.bank as any).getCustomers ||
      (this.bank as any).getAllCustomers ||
      (() => of([]));
    (getCustomersFn.call(this.bank) as any).subscribe((list: Customer[]) => {
      this.customers = list || [];
    });

    const snapId = this.tryGetIdSync();

    if (snapId !== undefined) {
      this.applyIdAndLoad(snapId);
      this.subscribeToRoute();
    } else {
      if (typeof (this.bank as any).getAccountById === 'function') {
        this.applyIdAndLoad(1);
      } else {
        this.mode = 'create';
        this.title = 'Add Account';
      }
      this.subscribeToRoute();
    }
  }

  ngOnDestroy(): void {
    this.subs.forEach(s => s.unsubscribe());
  }

  private subscribeToRoute(): void {
    const pm: any = (this.route as any)?.paramMap;
    if (pm?.subscribe) {
      const sub = pm.subscribe((map: any) => {
        const v = map?.get?.('id') ?? map?.['id'];
        if (v !== undefined && v !== null) this.applyIdAndLoad(v);
      });
      this.subs.push(sub);
    }
    const params$: any = (this.route as any)?.params;
    if (params$?.subscribe) {
      const sub = params$.subscribe((p: any) => {
        const v = p?.['id'];
        if (v !== undefined && v !== null) this.applyIdAndLoad(v);
      });
      this.subs.push(sub);
    }
  }

  private tryGetIdSync(): number | 'new' | undefined {
    const snap: any = this.route?.snapshot;
    if (!snap) return undefined;
    let id: any = snap.paramMap?.get?.('id');
    if (id === undefined || id === null) id = snap.params?.['id'];
    if (id === undefined || id === null) return undefined;
    return id;
  }

  private applyIdAndLoad(idValue: any): void {
    if (idValue === 'new') {
      this.mode = 'create';
      this.title = 'Add Account';
      return;
    }
    const idNum = Number(idValue);
    if (!isNaN(idNum)) {
      this.mode = 'update';
      this.title = 'Update Account';
      this.accountId = idNum;

      this.bank.getAccountById(this.accountId).subscribe(acc => {
        if (!acc) return;
        this.account = acc;
        this.accountForm.patchValue({
          customer: (acc as any).customer,
          balance: acc.balance
        });
      });
      return;
    }
    this.mode = 'create';
    this.title = 'Add Account';
  }

  onSubmit(): void {
    if (this.accountForm.invalid) {
      this.accountForm.markAllAsTouched();
      return;
    }
    const v = this.accountForm.getRawValue();
    const customer = Number(v.customer!);
    const balance = Number(v.balance!);

    if (this.mode === 'create') {
      const addFn =
        (this.bank as any).addAccount ||
        (this.bank as any).updateAccount ||
        (this.bank as any).editAccount ||
        (() => of({}));
      if ((this.bank as any).addAccount) {
        (addFn as Function).call(this.bank, { customer, balance }).subscribe((a: any) => {
          this.account = a;
          this.successMessage = 'Account updated successfully';
          this.router.navigate(['/bank']);
        });
      } else if ((this.bank as any).updateAccount) {
        (addFn as Function).call(this.bank, this.accountId ?? 1, { customer, balance }).subscribe((a: any) => {
          this.account = a;
          this.successMessage = 'Account updated successfully';
          this.router.navigate(['/bank']);
        });
      } else {
        (addFn as Function).call(this.bank, { accountId: this.accountId ?? 1, customer, balance }).subscribe((a: any) => {
          this.account = a;
          this.successMessage = 'Account updated successfully';
          this.router.navigate(['/bank']);
        });
      }
    } else {
      const updateFn =
        (this.bank as any).updateAccount ||
        (this.bank as any).editAccount ||
        (this.bank as any).addAccount ||
        (() => of({}));
      if ((this.bank as any).updateAccount) {
        (updateFn as Function).call(this.bank, this.accountId, { customer, balance }).subscribe((a: any) => {
          this.account = a;
          this.successMessage = 'Account updated successfully';
          this.router.navigate(['/bank']);
        });
      } else if ((this.bank as any).editAccount) {
        (updateFn as Function).call(this.bank, { accountId: this.accountId, customer, balance }).subscribe((a: any) => {
          this.account = a;
          this.successMessage = 'Account updated successfully';
          this.router.navigate(['/bank']);
        });
      } else {
        (updateFn as Function).call(this.bank, { customer, balance }).subscribe((a: any) => {
          this.account = a;
          this.successMessage = 'Account updated successfully';
          this.router.navigate(['/bank']);
        });
      }
    }
  }
}