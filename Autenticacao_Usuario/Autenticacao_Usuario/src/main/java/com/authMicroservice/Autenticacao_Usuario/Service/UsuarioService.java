package com.authMicroservice.Autenticacao_Usuario.Service;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Service;

import com.authMicroservice.Autenticacao_Usuario.DTO.LoginResponseDTO;
import com.authMicroservice.Autenticacao_Usuario.DTO.UsuarioDTO;
import com.authMicroservice.Autenticacao_Usuario.DTO.UsuarioRequestDTO;
import com.authMicroservice.Autenticacao_Usuario.Model.Usuario;
import com.authMicroservice.Autenticacao_Usuario.Repository.UsuarioRepository;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository repository;
    


    public UsuarioDTO criarUsuario(UsuarioRequestDTO dto) {
        if (repository.existsByEmail(dto.getEmail())) {
            throw new RuntimeException("Email já cadastrado");
        }
        
        var entity = new Usuario();
        entity.setNome(dto.getNome());
        entity.setEmail(dto.getEmail());
        entity.setTelefone(dto.getTelefone());
        entity.setCpf(dto.getCpf());
        entity.setPassword(dto.getSenha());
        
        var savedEntity = repository.save(entity);
        
        var result = new UsuarioDTO();
        result.setId(savedEntity.getId());
        result.setNome(savedEntity.getNome());
        result.setEmail(savedEntity.getEmail());
        result.setTelefone(savedEntity.getTelefone());
        result.setCpf(savedEntity.getCpf());
        
        return result;
    }
    
    public LoginResponseDTO login(String email, String senha) {
        var usuario = repository.findByEmail(email)
            .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
            
        if (!senha.equals(usuario.getPassword())) {
            throw new RuntimeException("Senha inválida");
        }
        
        // Gerar token simples (em produção, use JWT)
        String token = "token_" + usuario.getId() + "_" + System.currentTimeMillis();
        
        var usuarioDTO = new UsuarioDTO();
        usuarioDTO.setId(usuario.getId());
        usuarioDTO.setNome(usuario.getNome());
        usuarioDTO.setEmail(usuario.getEmail());
        usuarioDTO.setTelefone(usuario.getTelefone());
        usuarioDTO.setCpf(usuario.getCpf());
        
        return new LoginResponseDTO(token, usuarioDTO);
    }
}
