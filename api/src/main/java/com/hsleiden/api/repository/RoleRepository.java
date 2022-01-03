package com.hsleiden.api.repository;
import java.util.Optional;

import com.hsleiden.api.enums.ERole;
import com.hsleiden.api.models.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {
    Optional<Role> findByName(ERole name);
}
