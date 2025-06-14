const pool = require("../database/");

/**
 * Get all classifications
 */
async function getClassifications() {
  try {
    const result = await pool.query("SELECT * FROM classifications ORDER BY classification_name");
    return result;
  } catch (error) {
    console.error("Error fetching classifications:", error);
    throw error;
  }
}

/**
 * Get inventory by classification ID
 */
async function getInventoryByClassificationId(classificationId) {
  try {
    const result = await pool.query(
      "SELECT * FROM inventory WHERE classification_id = $1",
      [classificationId]
    );
    return result;
  } catch (error) {
    console.error("Error fetching inventory by classification ID:", error);
    throw error;
  }
}

/**
 * Get inventory details by inventory ID
 */
async function getInventoryById(invId) {
  try {
    const result = await pool.query(
      "SELECT * FROM inventory WHERE inv_id = $1",
      [invId]
    );
    return result;
  } catch (error) {
    console.error("Error fetching inventory by ID:", error);
    throw error;
  }
}

module.exports = { getClassifications, getInventoryByClassificationId, getInventoryById };