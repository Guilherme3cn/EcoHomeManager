// deviceController.js

import {
  insertDevice,
  getDevicesByUsuarioId,
  getDeviceByIdOrName,
  updateDevice,
  deleteDevice,
} from '../models/deviceModel.js';

// ✅ Agora todas as rotas funcionam sem autenticação JWT

// Rota para cadastrar um novo dispositivo
export async function cadastrarDispositivo(req, res) {
  const { nome, consumo, icone, usuario_id } = req.body;

  if (!nome || !consumo || !icone || !usuario_id) {
    return res.status(400).json({ mensagem: "Dados incompletos." });
  }

  try {
    const novoDispositivo = await insertDevice(nome, consumo, icone, usuario_id);
    res.status(201).json({ mensagem: "Dispositivo cadastrado com sucesso!", id: novoDispositivo.insertId });
  } catch (error) {
    console.error("Erro ao cadastrar dispositivo:", error);
    res.status(500).json({ mensagem: "Erro ao cadastrar dispositivo." });
  }
}


// Rota para listar todos os dispositivos (sem autenticação)
export const listarDispositivosDoUsuario = async (req, res) => {
  const { usuarioId } = req.params;

  try {
    const dispositivos = await getDevicesByUsuarioId(usuarioId);
    res.status(200).json(dispositivos);
  } catch (error) {
    console.error('Erro ao buscar dispositivos:', error);
    res.status(500).json({ mensagem: 'Erro interno no servidor.' });
  }
};

// Atualizar um dispositivo existente
export async function atualizarDispositivo(req, res) {
  const { id } = req.params;
  const { nome, consumo, icone } = req.body;

  try {
    await updateDevice(id, nome, consumo, icone);
    res.status(200).json({ message: 'Dispositivo atualizado com sucesso.' });
  } catch (error) {
    console.error('Erro ao atualizar dispositivo:', error);
    res.status(500).json({ error: 'Erro ao atualizar dispositivo.' });
  }
}

// Deletar um dispositivo existente
export async function deletarDispositivo(req, res) {
  const { id } = req.params;

  try {
    await deleteDevice(id);
    res.status(200).json({ message: 'Dispositivo deletado com sucesso.' });
  } catch (error) {
    console.error('Erro ao deletar dispositivo:', error);
    res.status(500).json({ error: 'Erro ao deletar dispositivo.' });
  }
}

// Buscar um dispositivo pelo ID ou nome
export async function buscarDispositivoPorIdOuNome(req, res) {
  const { id } = req.params;

  try {
    const dispositivo = await getDeviceByIdOrName(id);

    if (!dispositivo) {
      return res.status(404).json({ mensagem: 'Dispositivo não encontrado' });
    }

    res.status(200).json(dispositivo);
  } catch (error) {
    console.error('Erro ao buscar dispositivo:', error);
    res.status(500).json({ mensagem: 'Erro ao buscar dispositivo' });
  }
}
