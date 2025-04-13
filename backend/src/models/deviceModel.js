// src/models/deviceModel.js
import mysql from 'mysql2/promise';
import { pool } from '../config/db.js';


// Inserir um novo dispositivo
export const insertDevice = async (nome, consumo, icone) => {
    const connection = pool;
  const [result] = await connection.execute(
    'INSERT INTO dispositivos (nome, consumo, icone) VALUES (?, ?, ?)',
    [nome, consumo, icone]
  );
  return result;
};

// Buscar todos os dispositivos
export async function getAllDevices() {
    const [rows] = await pool.query('SELECT * FROM dispositivos');
    return rows;
  }
  

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
    return pool.execute(query, [identifier, identifier]);
  }
  