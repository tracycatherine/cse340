const pool = require("../database/")

const inventoryModel = {}

/* ***************************
 *  Get all classification data
 * ************************** */
inventoryModel.getClassifications = async function () {
  try {
    const result = await pool.query('SELECT * FROM classification');
    return result.rows;
  } catch (err) {
    console.error('DB query error in getClassifications:', err);
    throw err;
  }
}


/* ***************************
 *  Get all inventory items and classification_name by classification_id
 * ************************** */
inventoryModel.getInventoryByClassificationId = async function (classification_id) {
  try {
    const data = await pool.query(
      `SELECT * FROM public.inventory AS i 
          JOIN public.classification AS c 
          ON i.classification_id = c.classification_id 
          WHERE i.classification_id = $1`,
      [classification_id]
    )
    return data.rows
  } catch (error) {
    console.error("getclassificationsbyid error " + error)
  }
}

inventoryModel.getInventoryById = async function (invId) {
  try {
    const data = await pool.query(
      "SELECT * FROM public.inventory AS i JOIN public.classification AS c ON i.classification_id = c.classification_id WHERE i.inv_id = $1",
      [invId]
    )
    return data.rows[0]
  } catch (error) {
    console.error(error)
  }
}

module.exports = inventoryModel