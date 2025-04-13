import db from '../config/db.js';

export async function registrarUsuario(nome, email, senhaHash) {
  const query = 'INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)';
  const [result] = await db.execute(query, [nome, email, senhaHash]);
  return result;
}

export async function buscarUsuarioPorEmail(email) {
  const query = 'SELECT * FROM usuarios WHERE email = ?';
  const [rows] = await db.execute(query, [email]);
  return rows[0]; // retorna o primeiro usuário encontrado
}
