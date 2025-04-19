import { Router } from 'express';
import {
  cadastrarDispositivo,
  listarDispositivosDoUsuario,
  buscarDispositivoPorIdOuNome,
  atualizarDispositivo,
  deletarDispositivo,
} from '../controllers/deviceController.js';

const router = Router();

// Todas as rotas de dispositivos agora são públicas
router.post('/', cadastrarDispositivo); // Cadastra novo dispositivo
router.get('/usuario/:usuarioId', listarDispositivosDoUsuario); // Lista dispositivos por usuário
router.get('/buscar/:idOuNome', buscarDispositivoPorIdOuNome); // Busca dispositivo por ID ou nome
router.put('/:id', atualizarDispositivo); // Atualiza dispositivo
router.delete('/:id', deletarDispositivo); // Deleta dispositivo

export default router;
