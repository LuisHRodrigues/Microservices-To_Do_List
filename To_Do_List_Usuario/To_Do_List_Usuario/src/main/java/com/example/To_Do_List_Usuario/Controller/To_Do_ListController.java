package com.example.To_Do_List_Usuario.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.To_Do_List_Usuario.DTO.To_Do_ListRequestDTO;
import com.example.To_Do_List_Usuario.DTO.To_Do_ListResponseDTO;
import com.example.To_Do_List_Usuario.Service.To_Do_ListService;

@RestController
@RequestMapping("/api/todo-lists")
@CrossOrigin(origins = "http://localhost:3000")
public class To_Do_ListController {

    @Autowired
    private To_Do_ListService service;

    @PostMapping
    public ResponseEntity<To_Do_ListResponseDTO> criarLista(@RequestBody To_Do_ListRequestDTO request) {
        To_Do_ListResponseDTO response = service.criarLista(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping
    public ResponseEntity<List<To_Do_ListResponseDTO>> listarTodas() {
        List<To_Do_ListResponseDTO> listas = service.listarTodas();
        return ResponseEntity.ok(listas);
    }

    @GetMapping("/usuario/{usuarioId}")
    public ResponseEntity<List<To_Do_ListResponseDTO>> listarPorUsuario(@PathVariable String usuarioId) {
        List<To_Do_ListResponseDTO> listas = service.listarPorUsuario(usuarioId);
        return ResponseEntity.ok(listas);
    }

    @GetMapping("/{id}")
    public ResponseEntity<To_Do_ListResponseDTO> buscarPorId(@PathVariable Long id) {
        To_Do_ListResponseDTO lista = service.buscarPorId(id);
        if (lista != null) {
            return ResponseEntity.ok(lista);
        }
        return ResponseEntity.notFound().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<To_Do_ListResponseDTO> atualizarLista(@PathVariable Long id, @RequestBody To_Do_ListRequestDTO request) {
        To_Do_ListResponseDTO response = service.atualizarLista(id, request);
        if (response != null) {
            return ResponseEntity.ok(response);
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletarLista(@PathVariable Long id) {
        boolean deletado = service.deletarLista(id);
        if (deletado) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}