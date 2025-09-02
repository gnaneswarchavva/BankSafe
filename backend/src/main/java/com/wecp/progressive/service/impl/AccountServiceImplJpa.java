package com.wecp.progressive.service.impl;

import java.sql.SQLException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.wecp.progressive.entity.Accounts;
import com.wecp.progressive.repository.AccountRepository;
import com.wecp.progressive.service.AccountService;

@Service
public class AccountServiceImplJpa implements AccountService{

    @Autowired
    private AccountRepository accountRepository;

    
    public AccountServiceImplJpa(AccountRepository accountRepository) {
        this.accountRepository = accountRepository;
    }


    @Override
    public List<Accounts> getAllAccounts() throws SQLException {
        return null;
    }


    @Override
    public int addAccount(Accounts accounts) throws SQLException {
        return -1;
    }

    @Override
    public List<Accounts> getAllAccountsSortedByBalance() throws SQLException {
        return null;
    }

    
    public Accounts getAccountById(int accountId) throws SQLException{
        return null;
    }

    public List<Accounts> getAccountsByUser(int userId) throws SQLException{
        return null;
    }

    public void updateAccount(Accounts accounts) throws SQLException {

    }

    public void deleteAccount(int accountId) throws SQLException {

    }
    
}