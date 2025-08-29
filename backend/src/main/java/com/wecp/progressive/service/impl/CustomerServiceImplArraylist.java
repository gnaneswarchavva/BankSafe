package com.wecp.progressive.service.impl;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import com.wecp.progressive.entity.Customers;
import com.wecp.progressive.service.CustomerService;

public class CustomerServiceImplArraylist implements CustomerService {
    private static List<Customers> list=new ArrayList<>();
    @Override
    public List<Customers> getAllCustomers() throws SQLException {
        return list;
    }

    @Override
    public int addCustomer(Customers customers) throws SQLException {
        list.add(customers);
        return list.size();
    }

    @Override
    public List<Customers> getAllCustomersSortedByName() throws SQLException {
        List<Customers> sortedList=list;
        Collections.sort(sortedList);
        return sortedList;
    }
    @Override
    public void emptyArrayList(){
        list=new ArrayList<>();
    }
}