package com.authMicroservice.Autenticacao_Usuario.DTO;

public class LoginResponseDTO {
    private String token;
    private UsuarioDTO usuario;
    
    public LoginResponseDTO(String token, UsuarioDTO usuario) {
        this.token = token;
        this.usuario = usuario;
    }
    
    public String getToken() {
        return token;
    }
    
    public void setToken(String token) {
        this.token = token;
    }
    
    public UsuarioDTO getUsuario() {
        return usuario;
    }
    
    public void setUsuario(UsuarioDTO usuario) {
        this.usuario = usuario;
    }
}