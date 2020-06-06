import { Request, Response } from "express";
import knex from "../database/connection"; // Minha conexão com o banco de dados

class PointsController {

  async filter(req: Request, res: Response) {
    const { city, uf, items } = req.query;

    const parsedItems = String(items)
      .split(",")
      .map((item) => Number(item.trim()));

  
    const allItems = [1, 2, 3, 4, 5, 6]

    // const test = await knex.raw('SELECT * FROM points JOIN point_items ON points.id = point_items.point_id [SELECT point_items.point_id UNION ALL] AS items_ids')
    // console.log(test)
    
    const points = await knex('points')
      .join('point_items', 'points.id', '=', 'point_items.point_id')
      .whereIn('point_items.item_id', isNaN(Number(parsedItems)) ? allItems : parsedItems)
      .where('city', String(city))
      .where('uf', String(uf))
      .select('*')
      .groupBy('points.id')


      // console.log(points)

    if(points.length ===  0 ) {
      return res.status(404).json({ err: 'No points with this filter'});
    }

    return res.json(points);
  }

  async create(req: Request, res: Response) {
    const {
      name,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      uf,
      items,
    } = req.body;

    // Transactions
    // se houver algum erro na segunda query
    // o transaction nao permite que o anterior seja executado
    const trx = await knex.transaction();

    const point = {
      image: "https://images.unsplash.com/photo-1557333610-90ee4a951ecf?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60",
      name,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      uf,
    };

    // usemos no lugar do knex a variável trx
    const insertedIds = await trx("points").insert(point);

    const point_id = insertedIds[0];

    if(items.length <= 0) {
      return res.status(400).json({msg: 'At least one item have to be selected.'})
    }

    const pointItems = items.map((item_id: number) => {
      return {
        item_id,
        point_id,
      };
    });

    await trx("point_items").insert(pointItems);

    // vai realmente fazer os inserts na base de dados
    await trx.commit();

    return res.json({
      id: point_id,
      ...point,
    });
  }

  async show(req: Request, res: Response) {
    const { id } = req.params;

    const point = await knex("points").where("id", id).first();

    if (!point) {
      return res.status(400).json({
        msg: "Point not found.",
      });
    }

    const pointItems = await knex("items")
      .join("point_items", "items.id", "=", "point_items.item_id")
      .where("point_items.point_id", id)
      .select("items.title");

    return res.json({
      point,
      pointItems,
    });
  }
}

export default PointsController;
