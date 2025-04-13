import express from 'express';
import { autenticarToken } from '../middlewares/authMiddleware.js';
import {
  cadastrarDispositivo,
  listarDispositivos,
  atualizarDispositivo,
  deletarDispositivo,
  buscarDispositivoPorIdOuNome
} from '../controllers/deviceController.js';


const router = express.Router();

// Todas as rotas de dispositivos agora exigem autenticação
router.use(autenticarToken);

router.get('/', autenticarToken, listarDispositivos);
router.post('/', cadastrarDispositivo);
router.get('/:idOuNome', buscarDispositivoPorIdOuNome);
router.put('/:id', autenticarToken, atualizarDispositivo);
router.delete('/:id', deletarDispositivo);

export default router;
