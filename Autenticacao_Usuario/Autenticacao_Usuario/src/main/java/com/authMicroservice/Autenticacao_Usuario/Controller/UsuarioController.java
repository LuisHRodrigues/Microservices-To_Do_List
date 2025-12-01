package com.authMicroservice.Autenticacao_Usuario.Controller;

import java.net.URI;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.authMicroservice.Autenticacao_Usuario.DTO.LoginRequestDTO;
import com.authMicroservice.Autenticacao_Usuario.DTO.UsuarioDTO;
import com.authMicroservice.Autenticacao_Usuario.DTO.UsuarioRequestDTO;
import com.authMicroservice.Autenticacao_Usuario.Service.UsuarioService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/usuarios")
@CrossOrigin(origins = "http://localhost:3000")
public class UsuarioController {
    private final UsuarioService usuarioService;

    @Autowired
    public UsuarioController(UsuarioService usuarioService) {
        this.usuarioService = usuarioService;
    }

    @PostMapping
    public ResponseEntity<UsuarioDTO> criarUsuario(@Valid @RequestBody UsuarioRequestDTO usuarioRequestDTO) {
        var usuarioCriado = usuarioService.criarUsuario(usuarioRequestDTO);
        
        URI location = ServletUriComponentsBuilder
            .fromCurrentRequest()
            .path("/{id}")
            .buildAndExpand(usuarioCriado.getId())
            .toUri();
            
        return ResponseEntity.created(location).body(usuarioCriado);
    }
    
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequestDTO loginRequest) {
        try {
            var loginResponse = usuarioService.login(loginRequest.getEmail(), loginRequest.getSenha());
            return ResponseEntity.ok(loginResponse);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("message", "Email ou senha inválidos"));
        }
    }
    
    @GetMapping
    public ResponseEntity<String> listarUsuarios() {
        return ResponseEntity.ok("API de Autenticação funcionando! Use POST /usuarios para criar usuários.");
    }
}
