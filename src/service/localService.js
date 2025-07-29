import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const createLocal = async (name,status) => {
  return await prisma.Local.create({
    data: { name,status }
  });
};//cria local banco de dados vai ser uma rota post.

export  const getAllLocais = async () => {
    return await prisma.Local.findMany();
};//exibir todos os locais rota get.

export  const getLocalById = async () => {
    return await prisma.Local.findUnique({
    where: { id }
  });
};//exibir local desejado.  

export const deleteLocal = async (id) => {
  return await prisma.Local.delete({
    where: { id }
  });
};// deleta o local desejado rota delete.

export const getLocalsByStatus = async (status) => {
  return await prisma.Local.findMany({
    where: { status },
  });
};//exibir locais com status expecifico.