import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import * as localService from "../service/localService.js"

export const getAllLocais = async (req, res) => {
  try {
    const locais = await localService.getAllLocais();
    res.json(locais);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar locais' });
    console.error("Erro:", error);
  }
};// requisição de buscar de locais ja com tratamento de erros.

export const createLocal = async (req, res) => {
  try {
    const { name } = req.body;
    const newlocal = await localService.createLocal(name);
    res.status(201).json(newlocal);
    console.log(`local ${name} criado com sucesso:`)
  } catch (error) {
    console.error("Erro ao criar local:", error);
    res.status(500).json({ error: 'Erro ao criar local' });
  }
};//  requisição de cria  local.

export const deleteLocal = async (req, res) => {
  try {
    const { id } = req.params;
    await localService.deleteLocal(id);
    console.log("local deletado com sucesso:", id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar local' });
    console.error("Erro ao deletar local:", error);
  }
};//requisição de deletar.
export const getLocalById = async (req, res) => {
  const { id } = req.params;

  try {
    const local = await getLocalById(id);

    if (!local) {
      return res.status(404).json({ error: 'Local não encontrado' });
    }

    res.status(200).json(local);
  } catch (error) {
    console.error("Erro:", error);
    res.status(500).json({ error: 'Erro ao buscar local por ID' });
  }
}; // requisição de buscar local desejado.

export const getLocalsByStatus = async (req, res) => {
  const { status } = req.params;

  try {
    const locais = await prisma.Local.findMany({
      where: { status },
    });

    res.status(200).json(locais);
  } catch (error) {
    console.error('Erro ao buscar locais por status:', error);
    res.status(500).json({ error: 'Erro ao buscar locais por status' });
  }
};//requisição de busca locais por status.