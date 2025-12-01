package com.example.To_Do_List_Usuario.Repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.To_Do_List_Usuario.Model.To_Do_List_Usuario;

@Repository
public interface To_Do_ListRepository extends JpaRepository<To_Do_List_Usuario, Long> {
    List<To_Do_List_Usuario> findByUsuarioId(String usuarioId);
}