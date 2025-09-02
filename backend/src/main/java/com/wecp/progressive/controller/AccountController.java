package com.wecp.progressive.controller;

import com.wecp.progressive.entity.Accounts;
import com.wecp.progressive.entity.Customers;
import com.wecp.progressive.service.impl.AccountServiceImplArraylist;
import com.wecp.progressive.service.impl.AccountServiceImplJpa;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.SQLException;
import java.util.List;


@RestController
@RequestMapping("/accounts")
public class AccountController {

    @Autowired
    private AccountServiceImplJpa accountServiceImplJpa;
    @Autowired
    private AccountServiceImplArraylist accountServiceImplArraylist;
    @GetMapping
    public ResponseEntity<List<Accounts>> getAllAccounts() {
        try{
            List<Accounts> accounts=accountServiceImplJpa.getAllAccounts();
            return new ResponseEntity<>(accounts,HttpStatus.OK);
        }
        catch(SQLException e){
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public ResponseEntity<Accounts> getAccountById(int accountId) {
        return null;
    }

    public ResponseEntity<List<Accounts>> getAccountsByUser(String param) {
        return null;
    }

    @PostMapping
    public ResponseEntity<Integer> addAccount(@RequestBody Accounts accounts) {
        try{
            int accountId=accountServiceImplJpa.addAccount(accounts);
            return new ResponseEntity<>(accountId, HttpStatus.CREATED);
        }
        catch(Exception e){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    public ResponseEntity<Void> updateAccount(int accountId, Accounts accounts) {
        return null;
    }

    public ResponseEntity<Void> deleteAccount(int accountId) {
        return null;
    }
}