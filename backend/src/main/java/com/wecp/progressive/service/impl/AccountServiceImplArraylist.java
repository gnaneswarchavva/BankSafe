package com.wecp.progressive.service.impl;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

import com.wecp.progressive.entity.Accounts;
import com.wecp.progressive.service.AccountService;

public class AccountServiceImplArraylist implements AccountService {
    private static List<Accounts> account=new ArrayList<>();
    @Override
    public List<Accounts> getAllAccountsSortedByBalance() {
        List<Accounts> sortesAcc=account;
        sortesAcc.sort(Comparator.comparingDouble(Accounts::getBalance));
       return sortesAcc;
    }
    @Override
    public List<Accounts> getAllAccounts()  {
        return account;
    }

    @Override
    public int addAccount(Accounts accounts)  {
        account.add(accounts);
        return account.size();
    }

    
    @Override
    public void emptyArrayList(){
        account=new ArrayList<>();
    }
}