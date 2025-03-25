package com.example.mymanager.repository;

import com.example.mymanager.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface UserRepository extends JpaRepository<User, Long> {
    @Query("SELECT u FROM User u WHERE u.username = :username OR u.email = :email")
    User findByUsernameOrEmail(@Param("username") String username, @Param("email") String email);
    
    User findByUsername(String username);
    User findByEmail(String email);
}