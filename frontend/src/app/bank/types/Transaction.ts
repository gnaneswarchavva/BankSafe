
import { Account } from './Account';

export class Transaction {
    amount: number;
    transactionDate?: Date;
    transactionType: string;
    accounts?: Account;
    constructor(data: any) {
        this.amount = data.amount;
        this.transactionType = data.transactionType;
        this.transactionDate = data.transactionDate;
        this.accounts = data.accounts;
    }
}