package com.example.To_Do_List_Usuario.DTO;

import java.util.ArrayList;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

public class To_Do_ListRequestDTO {

    private String titulo;
    private ArrayList<String> listaDeTarefas = new ArrayList<>();
    private String usuarioId;

    public To_Do_ListRequestDTO() {}

    public To_Do_ListRequestDTO(String titulo, ArrayList<String> listaDeTarefas, String usuarioId) {
        this.titulo = titulo;
        this.listaDeTarefas = listaDeTarefas;
        this.usuarioId = usuarioId;
    }

    public String getTitulo() {
        return titulo;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public ArrayList<String> getListaDeTarefas() {
        return listaDeTarefas;
    }

    public void setListaDeTarefas(ArrayList<String> listaDeTarefas) {
        this.listaDeTarefas = listaDeTarefas;
    }

    public String getUsuarioId() {
        return usuarioId;
    }

    public void setUsuarioId(String usuarioId) {
        this.usuarioId = usuarioId;
    }
}
