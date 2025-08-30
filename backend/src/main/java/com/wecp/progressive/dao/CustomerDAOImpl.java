package com.wecp.progressive.dao;

import java.util.ArrayList;
import java.util.List;

import com.wecp.progressive.dto.CustomerAccountInfo;
import com.wecp.progressive.entity.Customers;

public class CustomerDAOImpl implements CustomerDAO{

    
    @Override
    public List<Customers> getAllCustomers() {
        List<Customers> customers=new ArrayList<>();
        return customers;
    }
    @Override
    public Customers getCustomerById(int customerId) {
        return null;
    }
    @Override
    public int addCustomer(Customers customers) {
       return -1;
    }
    @Override
    public void updateCustomer(Customers customers) {
        
    }
    @Override
    public void deleteCustomer(int customerId) {
        
    }
    @Override
    public CustomerAccountInfo getCustomerAccountInfo(int customerId) {
       return null;
    }

}
