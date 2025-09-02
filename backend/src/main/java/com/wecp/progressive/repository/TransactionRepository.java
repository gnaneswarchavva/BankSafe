package com.wecp.progressive.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.wecp.progressive.entity.Transactions;

public interface TransactionRepository extends JpaRepository<Transactions, Integer> {
}