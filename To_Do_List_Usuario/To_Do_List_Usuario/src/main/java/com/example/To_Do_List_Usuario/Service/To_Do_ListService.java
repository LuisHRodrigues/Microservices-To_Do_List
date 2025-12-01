package com.example.To_Do_List_Usuario.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.To_Do_List_Usuario.DTO.To_Do_ListRequestDTO;
import com.example.To_Do_List_Usuario.DTO.To_Do_ListResponseDTO;
import com.example.To_Do_List_Usuario.Model.To_Do_List_Usuario;
import com.example.To_Do_List_Usuario.Repository.To_Do_ListRepository;

@Service
public class To_Do_ListService {

    @Autowired
    private To_Do_ListRepository repository;

    public To_Do_ListResponseDTO criarLista(To_Do_ListRequestDTO request) {
        To_Do_List_Usuario lista = new To_Do_List_Usuario();
        lista.setTitulo(request.getTitulo());
        lista.setListaDeTarefas(request.getListaDeTarefas());
        lista.setUsuarioId(request.getUsuarioId());
        
        lista = repository.save(lista);
        return converterParaResponse(lista);
    }

    public List<To_Do_ListResponseDTO> listarTodas() {
        return repository.findAll().stream()
                .map(this::converterParaResponse)
                .toList();
    }

    public List<To_Do_ListResponseDTO> listarPorUsuario(String usuarioId) {
        return repository.findByUsuarioId(usuarioId).stream()
                .map(this::converterParaResponse)
                .toList();
    }

    public To_Do_ListResponseDTO buscarPorId(Long id) {
        Optional<To_Do_List_Usuario> lista = repository.findById(id);
        return lista.map(this::converterParaResponse).orElse(null);
    }

    public To_Do_ListResponseDTO atualizarLista(Long id, To_Do_ListRequestDTO request) {
        Optional<To_Do_List_Usuario> optionalLista = repository.findById(id);
        if (optionalLista.isPresent()) {
            To_Do_List_Usuario lista = optionalLista.get();
            lista.setTitulo(request.getTitulo());
            lista.setListaDeTarefas(request.getListaDeTarefas());
            lista = repository.save(lista);
            return converterParaResponse(lista);
        }
        return null;
    }

    public boolean deletarLista(Long id) {
        if (repository.existsById(id)) {
            repository.deleteById(id);
            return true;
        }
        return false;
    }

    private To_Do_ListResponseDTO converterParaResponse(To_Do_List_Usuario lista) {
        To_Do_ListResponseDTO response = new To_Do_ListResponseDTO();
        response.setId(lista.getId());
        response.setTitulo(lista.getTitulo());
        response.setListaDeTarefas(new java.util.ArrayList<>(lista.getListaDeTarefas()));
        response.setUsuarioId(lista.getUsuarioId());
        return response;
    }
}