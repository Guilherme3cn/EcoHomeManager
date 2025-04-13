import express from 'express';
import { registrar, loginUser, obterUsuarioLogado, deletarUsuario} from '../controllers/userController.js';


const router = express.Router();

router.post('/registrar', registrar); // Adicionei esta linha para o registro do usuário
router.post('/login', loginUser); // Adicionei esta linha para o login do usuário
router.get('/usuario-logado', obterUsuarioLogado); // Adicionei esta linha para obter os dados do usuário logado
router.delete('/deletar/:id', deletarUsuario); // Adicionei esta linha para deletar o usuário

export default router;
