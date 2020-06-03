import { Request, Response } from "express";
import knex from "../database/connection"; // Minha conexão com o banco de dados

class ItemsController {
  async index(req: Request, res: Response) {
    const items = await knex("items").select("*");

    // transformo os dados para um novo formato o qual vai ser mais acessível para quem está acessando a rota
    const serializedItems = items.map((item) => {
      return {
        id: item.id,
        name: item.title,
        image_url: `http://localhost:3333/uploads/${item.image}`,
      };
    });

    return res.json(serializedItems);
  }
}

export default ItemsController;
