import { pool } from '../config/db.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || 'seusegredoseguro';

// Função para registrar um novo usuário
export const registrar = async (req, res) => {
  const { nome, email, senha } = req.body;

  try {
    const [usuariosExistentes] = await pool.query('SELECT * FROM usuarios WHERE email = ?', [email]);

    if (usuariosExistentes.length > 0) {
      return res.status(400).json({ mensagem: 'Email já cadastrado.' });
    }

    const senhaCriptografada = await bcrypt.hash(senha, 10);

    await pool.query('INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)', [
      nome,
      email,
      senhaCriptografada,
    ]);

    res.status(201).json({ mensagem: 'Usuário registrado com sucesso.' });
  } catch (erro) {
    console.error('Erro ao registrar usuário:', erro);
    res.status(500).json({ mensagem: 'Erro ao registrar usuário.', erro });
  }
};



// Função para listar todos os usuários
// Função para login de usuário
export const loginUser = async (req, res) => {
  const { email, senha } = req.body;

  try {
    const [rows] = await pool.query('SELECT * FROM usuarios WHERE email = ?', [email]);

    if (rows.length === 0) {
      return res.status(404).json({ mensagem: 'Usuário não encontrado.' });
    }

    const usuario = rows[0];
    const senhaValida = await bcrypt.compare(senha, usuario.senha);

    if (!senhaValida) {
      return res.status(401).json({ mensagem: 'Senha incorreta.' });
    }

    const token = jwt.sign({ id: usuario.id, email: usuario.email }, JWT_SECRET, {
      expiresIn: '1h',
    });

    // 🔥 Aqui retornamos token + dados do usuário
    res.status(200).json({
      token,
      usuario: {
        id: usuario.id,
        email: usuario.email
      }
    });
  } catch (erro) {
    console.error('Erro ao fazer login:', erro);
    res.status(500).json({ mensagem: 'Erro ao fazer login.', erro });
  }
};


// Função para obter os dados do usuário logado
export const obterUsuarioLogado = async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ mensagem: 'Token não fornecido.' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const [rows] = await pool.query('SELECT * FROM usuarios WHERE id = ?', [decoded.id]);
    if (rows.length === 0) {
      return res.status(404).json({ mensagem: 'Usuário não encontrado.' });
    }

    res.status(200).json(rows[0]);
  } catch (erro) {
    res.status(401).json({ mensagem: 'Token inválido.', erro });
  }
};

// funçao para deletar um usuario
export const deletarUsuario = async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await pool.query('DELETE FROM usuarios WHERE id = ?', [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ mensagem: 'Usuário não encontrado.' });
    }

    res.status(200).json({ mensagem: 'Usuário deletado com sucesso!' });
  } catch (erro) {
    res.status(500).json({ mensagem: 'Erro ao deletar usuário.', erro });
  }
};