const pool = require("../database/");

async function addReview(vehicle_id, account_id, review_text) {
  const sql = `
    INSERT INTO review (vehicle_id, account_id, review_text)
    VALUES ($1, $2, $3) RETURNING *;
  `;
  const result = await pool.query(sql, [vehicle_id, account_id, review_text]);
  return result.rows[0];
}

async function getReviewsByVehicle(vehicle_id) {
  const sql = `
    SELECT r.*, a.account_firstname
    FROM review r
    JOIN account a ON r.account_id = a.account_id
    WHERE r.vehicle_id = $1
    ORDER BY r.review_date DESC;
  `;
  const result = await pool.query(sql, [vehicle_id]);
  return result.rows;
}

module.exports = { addReview, getReviewsByVehicle };