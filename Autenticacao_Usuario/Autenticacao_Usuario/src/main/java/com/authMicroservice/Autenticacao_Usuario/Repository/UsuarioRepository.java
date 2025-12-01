package com.authMicroservice.Autenticacao_Usuario.Repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.authMicroservice.Autenticacao_Usuario.Model.Usuario;

public interface UsuarioRepository extends JpaRepository<Usuario, String> {

    boolean existsByEmail(String email);
    Optional<Usuario> findByEmail(String email);

}
