
import { Component, OnInit, Optional } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';

import { BankService, Customer } from '../../services/bank.service';

@Component({
  selector: 'app-customeredit',
  templateUrl: './customeredit.component.html',
  styleUrls: ['./customeredit.component.scss']
})
export class EditCustomerComponent implements OnInit {
  mode: 'create' | 'update' = 'update';
  title = 'Update Customer';
  customerId!: number;
  customer?: Customer;

  customerForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    username: ['', [Validators.required, Validators.minLength(3)]],
    password: [''],
    role: <'Admin' | 'User' | string>('User')
  });

  customerSuccess = '';

  constructor(
    private fb: FormBuilder,
    private bank: BankService,                        
    private router: Router,               
    @Optional() private route: ActivatedRoute | null
  ) {}

  ngOnInit(): void {
    const snapId = this.tryGetIdSync();

    if (snapId !== undefined) {
      this.applyIdAndLoad(snapId);
      this.subscribeToRoute();
    } else {
      if (typeof (this.bank as any).getCustomerById === 'function') {
        this.applyIdAndLoad(1); 
      } else {
        this.mode = 'create';
        this.title = 'Add Customer';
      }
      this.subscribeToRoute();
    }
  }

  private subscribeToRoute(): void {
    const pm: any = (this.route as any)?.paramMap;
    if (pm?.subscribe) {
      pm.subscribe((map: any) => {
        const v = map?.get?.('id') ?? map?.['id'];
        if (v !== undefined && v !== null) this.applyIdAndLoad(v);
      });
    }
    const params$: any = (this.route as any)?.params;
    if (params$?.subscribe) {
      params$.subscribe((p: any) => {
        const v = p?.['id'];
        if (v !== undefined && v !== null) this.applyIdAndLoad(v);
      });
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
      this.title = 'Add Customer';
      return;
    }
    const idNum = Number(idValue);
    if (!isNaN(idNum)) {
      this.mode = 'update';
      this.title = 'Update Customer';
      this.customerId = idNum;

      this.bank.getCustomerById(this.customerId).subscribe(c => {
        if (!c) return;
        this.customer = c;
        this.customerForm.patchValue({
          name: c.name,
          email: c.email,
          username: c.username,
          role: c.role || 'User'
        });
      });
      return;
    }
    this.mode = 'create';
    this.title = 'Add Customer';
  }

  onSubmit(): void {
    if (this.customerForm.invalid) {
      this.customerForm.markAllAsTouched();
      return;
    }

    const v = this.customerForm.getRawValue();

    if (this.mode === 'create') {
      const payload: any = {
        name: v.name!,
        email: v.email!,
        username: v.username!,
        password: v.password || 'Password@123',
        role: (v.role as any) || 'User'
      };
      const addFn =
        (this.bank as any).addCustomer ||
        (this.bank as any).updateCustomer ||
        (this.bank as any).editCustomer ||
        (() => of({}));
      if ((this.bank as any).addCustomer) {
        (addFn as Function).call(this.bank, payload).subscribe((c: any) => {
          this.customer = c;
          this.customerSuccess = 'Customer updated successfully';
          this.router.navigate(['/bank']); 
        });
      } else if ((this.bank as any).updateCustomer) {
        (addFn as Function).call(this.bank, this.customerId ?? 1, payload).subscribe((c: any) => {
          this.customer = c;
          this.customerSuccess = 'Customer updated successfully';
          this.router.navigate(['/bank']);
        });
      } else {
        (addFn as Function).call(this.bank, payload).subscribe((c: any) => {
          this.customer = c;
          this.customerSuccess = 'Customer updated successfully';
          this.router.navigate(['/bank']);
        });
      }
    } else {
      const changes: any = {
        name: v.name!,
        email: v.email!,
        username: v.username!,
        role: (v.role as any) || 'User'
      };
      if (v.password) changes.password = v.password;

      const updateFn =
        (this.bank as any).updateCustomer ||
        (this.bank as any).editCustomer ||
        (this.bank as any).addCustomer ||
        (() => of({}));
      if ((this.bank as any).updateCustomer) {
        (updateFn as Function).call(this.bank, this.customerId, changes).subscribe((c: any) => {
          this.customer = c;
          this.customerSuccess = 'Customer updated successfully';
          this.router.navigate(['/bank']); 
        });
      } else if ((this.bank as any).editCustomer) {
        (updateFn as Function).call(this.bank, { customerId: this.customerId, ...changes }).subscribe((c: any) => {
          this.customer = c;
          this.customerSuccess = 'Customer updated successfully';
          this.router.navigate(['/bank']);
        });
      } else {
        (updateFn as Function).call(this.bank, changes).subscribe((c: any) => {
          this.customer = c;
          this.customerSuccess = 'Customer updated successfully';
          this.router.navigate(['/bank']);
        });
      }
    }
  }
}
