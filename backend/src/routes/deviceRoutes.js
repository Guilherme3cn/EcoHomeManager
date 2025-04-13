// src/routes/deviceRoutes.js

import express from 'express';
import {
  cadastrarDispositivo,
  listarDispositivosDoUsuario,
  atualizarDispositivo,
  deletarDispositivo,
  buscarDispositivoPorIdOuNome
} from '../controllers/deviceController.js';

const router = express.Router();

// Todas as rotas de dispositivos agora são públicas
router.get('/', listarDispositivosDoUsuario); // Lista todos os dispositivos (anteriormente por usuário)
router.post('/', cadastrarDispositivo); // Cadastra novo dispositivo
router.get('/:idOuNome', buscarDispositivoPorIdOuNome); // Busca por ID ou nome
router.put('/:id', atualizarDispositivo); // Atualiza dispositivo
router.delete('/:id', deletarDispositivo); // Deleta dispositivo

export default router;
