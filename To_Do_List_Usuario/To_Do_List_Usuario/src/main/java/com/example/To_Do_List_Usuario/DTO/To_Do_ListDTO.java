package com.example.To_Do_List_Usuario.DTO;

import java.util.ArrayList;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class To_Do_ListDTO {

    private String id;
    private String titulo;
    private ArrayList<String> listaDeTarefas = new ArrayList<>();
}
