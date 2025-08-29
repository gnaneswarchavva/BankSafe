package com.wecp.progressive.service.impl;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import com.wecp.progressive.entity.Customers;
import com.wecp.progressive.service.CustomerService;

public class CustomerServiceImplArraylist implements CustomerService {
    List<Customers> list=new ArrayList<>();
    @Override
    public List<Customers> getAllCustomers() throws SQLException {
        return list;
    }

    @Override
    public int addCustomer(Customers customers) throws SQLException {
        return -1;
    }

    @Override
    public List<Customers> getAllCustomersSortedByName() throws SQLException {
        return list;
    }
    public void emptyArrayList(){
        
    }
}