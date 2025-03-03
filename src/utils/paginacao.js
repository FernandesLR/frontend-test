import { useCallback } from 'react';

// Função para voltar uma página
export const usePaginaAnterior = (paginaAtual, setPaginaAtual) => {
  return useCallback(() => {
    if (paginaAtual > 1) {
      setPaginaAtual(paginaAtual - 1);
    }
  }, [paginaAtual, setPaginaAtual]);
};

// Função para avançar para a próxima página
export const useProximaPagina = (paginaAtual, totalPaginas, setPaginaAtual) => {
  return useCallback(() => {
    if (paginaAtual < totalPaginas) {
      setPaginaAtual(paginaAtual + 1);
    }
  }, [paginaAtual, totalPaginas, setPaginaAtual]);
};
