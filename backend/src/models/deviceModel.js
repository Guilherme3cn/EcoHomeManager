// src/models/deviceModel.js
// src/models/deviceModel.js

import { pool } from '../config/db.js';

// Inserir um novo dispositivo (sem vínculo com usuário)
// src/models/deviceModel.js
export const insertDevice = async (nome, consumo, icone, usuario_id) => {
  const [result] = await pool.query(
    'INSERT INTO dispositivos (nome, consumo, icone, usuario_id) VALUES (?, ?, ?, ?)',
    [nome, consumo, icone, usuario_id]
  );
  return { id: result.insertId };
};

// Buscar todos os dispositivos
export const getDevicesByUsuarioId = async (usuario_id) => {
  const [rows] = await pool.query(
    'SELECT * FROM dispositivos WHERE usuario_id = ?',
    [usuario_id]
  );
  return rows;
};

// Atualizar um dispositivo existente
export async function updateDevice(id, nome, consumo, icone) {
  const query = 'UPDATE dispositivos SET nome = ?, consumo = ?, icone = ? WHERE id = ?';
  await pool.execute(query, [nome, consumo, icone, id]);
}

// Deletar um dispositivo existente
export async function deleteDevice(id) {
  const query = 'DELETE FROM dispositivos WHERE id = ?';
  await pool.execute(query, [id]);
}

// Buscar um dispositivo pelo ID ou nome
export async function getDeviceByIdOrName(identifier) {
  const query = 'SELECT * FROM dispositivos WHERE id = ? OR nome = ?';
  const [rows] = await pool.execute(query, [identifier, identifier]);
  return rows[0];
}
