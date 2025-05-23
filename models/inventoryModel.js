const pool = require('../db');  // adjust path to your db.js

const inventoryModel = {};  // Declare once here

inventoryModel.getClassifications = async function () {
  return await pool.query("SELECT * FROM public.classification ORDER BY classification_name");
};

inventoryModel.getInventoryByClassificationId = async function (classification_id) {
  try {
    const data = await pool.query(
      `SELECT * FROM public.inventory AS i 
       JOIN public.classification AS c ON i.classification_id = c.classification_id 
       WHERE i.classification_id = $1`,
      [classification_id]
    );
    return data.rows;
  } catch (error) {
    console.error("getInventoryByClassificationId error " + error);
  }
};

inventoryModel.getInventoryById = async function (invId) {
  try {
    const data = await pool.query(
      `SELECT * FROM public.inventory AS i 
       JOIN public.classification AS c ON i.classification_id = c.classification_id 
       WHERE i.inv_id = $1`,
      [invId]
    );
    return data.rows[0];
  } catch (error) {
    console.error(error);
  }
};

module.exports = inventoryModel;
