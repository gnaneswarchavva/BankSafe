package com.wecp.progressive.service.impl;


import com.wecp.progressive.dao.AccountDAO;
import com.wecp.progressive.entity.Accounts;
import com.wecp.progressive.service.AccountService;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

public class AccountServiceImpl implements AccountService {
    private AccountDAO accountDAO;

    private static List<Accounts> accountsList = new ArrayList<>();
    public AccountServiceImpl(AccountDAO accountDAO) {
        this.accountDAO = accountDAO;
    }

    @Override
    public List<Accounts> getAllAccounts() throws SQLException {
        return accountDAO.getAllAccounts();
    }

    @Override
    public Accounts getAccountById(int accountId) throws SQLException {
        return accountDAO.getAccountById(accountId);
    }

    @Override
    public int addAccount(Accounts accounts) throws SQLException {
        return accountDAO.addAccount(accounts);
    }

    @Override
    public void updateAccount(Accounts accounts) throws SQLException {
        accountDAO.updateAccount(accounts);
    }

    @Override
    public void deleteAccount(int accountId) throws SQLException {
        accountDAO.deleteAccount(accountId);
    }

    @Override
    public List<Accounts> getAllAccountsSortedByBalance() throws SQLException {
        List<Accounts> sortedAccounts = accountDAO.getAllAccounts();
        if (sortedAccounts != null) {
            sortedAccounts.sort(Comparator.comparingDouble(Accounts::getBalance)); 
        }
        return sortedAccounts;
    }

    @Override
    public List<Accounts> getAccountsByUser(int userId) throws SQLException{
        return accountDAO.getAllAccounts();
    }

}