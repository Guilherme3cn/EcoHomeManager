// deviceController.js
// src/controllers/deviceController.js

import {
  insertDevice,
  getAllDevices,
  getDeviceByIdOrName,
  updateDevice,
  deleteDevice,
} from '../models/deviceModel.js';

// ✅ Agora todas as rotas funcionam sem autenticação JWT

// Rota para cadastrar um novo dispositivo
export const cadastrarDispositivo = async (req, res) => {
  try {
    const { nome, consumo, icone } = req.body;

    const id = await insertDevice(nome, consumo, icone);
    res.status(201).json({ mensagem: 'Dispositivo cadastrado com sucesso!', id });
  } catch (error) {
    console.error('Erro ao cadastrar dispositivo:', error);
    res.status(500).json({ mensagem: 'Erro ao cadastrar dispositivo.', erro: error.message });
  }
};

// Rota para listar todos os dispositivos (sem autenticação)
export const listarDispositivosDoUsuario = async (req, res) => {
  try {
    const dispositivos = await getAllDevices();
    res.status(200).json(dispositivos);
  } catch (error) {
    console.error('Erro ao listar dispositivos:', error);
    res.status(500).json({ mensagem: 'Erro ao listar dispositivos.' });
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
