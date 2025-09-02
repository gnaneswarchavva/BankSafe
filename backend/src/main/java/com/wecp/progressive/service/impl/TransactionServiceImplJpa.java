package com.wecp.progressive.service.impl;

import java.sql.SQLException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.wecp.progressive.entity.Transactions;
import com.wecp.progressive.repository.AccountRepository;
import com.wecp.progressive.repository.TransactionRepository;
import com.wecp.progressive.service.TransactionService;

@Service
public class TransactionServiceImplJpa implements TransactionService{
    @Autowired
    private TransactionRepository transactionRepository;

    @Autowired
    private AccountRepository accountRepository;
    public TransactionServiceImplJpa(TransactionRepository transactionRepository, AccountRepository accountRepository) {
        this.transactionRepository = transactionRepository;
        this.accountRepository = accountRepository;
    }

    @Override
    public List<Transactions> getAllTransactions() throws SQLException{
        return null;
    }

    @Override
    public Transactions getTransactionById(int transactionId) throws SQLException{
        return null;
    }

    @Override
    public int addTransaction(Transactions transaction) throws SQLException{
        return -1;
    }

    @Override
    public void updateTransaction(Transactions transaction) throws SQLException{

    }
    
    @Override
    public void deleteTransaction(int transactionId) throws SQLException{

    }

    @Override
    public List<Transactions> getTransactionsByCustomerId(int customerId){
        return null;
    }
}