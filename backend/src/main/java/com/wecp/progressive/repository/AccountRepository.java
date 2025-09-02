package com.wecp.progressive.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.wecp.progressive.entity.Accounts;
@Repository
public interface AccountRepository extends JpaRepository<Accounts, Integer> {
    
}