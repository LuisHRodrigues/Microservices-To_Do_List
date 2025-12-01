package com.authMicroservice.Autenticacao_Usuario.DTO;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UsuarioDTO {
    private String id;
    private String nome;
    private String email;
    private String telefone;
    private String cpf;

}
