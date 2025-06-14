const pool = require("../database/");

/**
 * Register a new account
 */
async function registerAccount(firstname, lastname, email, password) {
  try {
    const sql = `
      INSERT INTO accounts (account_firstname, account_lastname, account_email, account_password)
      VALUES ($1, $2, $3, $4)
      RETURNING account_id;
    `;
    const result = await pool.query(sql, [firstname, lastname, email, password]);
    return result.rows[0];
  } catch (error) {
    console.error("Error registering account:", error);
    throw error;
  }
}

/**
 * Check if an email already exists
 */
async function checkExistingEmail(email) {
  try {
    const sql = "SELECT account_email FROM accounts WHERE account_email = $1";
    const result = await pool.query(sql, [email]);
    return result.rowCount > 0;
  } catch (error) {
    console.error("Error checking email existence:", error);
    throw error;
  }
}

/**
 * Get account details by email
 */
async function getAccountByEmail(email) {
  try {
    const sql = "SELECT * FROM accounts WHERE account_email = $1";
    const result = await pool.query(sql, [email]);
    return result.rows[0];
  } catch (error) {
    console.error("Error fetching account by email:", error);
    throw error;
  }
}

/**
 * Update account details by ID
 */
async function updateAccountById(accountId, firstname, lastname, email) {
  try {
    const sql = `
      UPDATE accounts
      SET account_firstname = $1, account_lastname = $2, account_email = $3
      WHERE account_id = $4
      RETURNING *;
    `;
    const result = await pool.query(sql, [firstname, lastname, email, accountId]);
    return result.rows[0];
  } catch (error) {
    console.error("Error updating account:", error);
    throw error;
  }
}

/**
 * Update account password
 */
async function updatePassword(accountId, hashedPassword) {
  try {
    const sql = `
      UPDATE accounts
      SET account_password = $1
      WHERE account_id = $2
      RETURNING *;
    `;
    const result = await pool.query(sql, [hashedPassword, accountId]);
    return result.rows[0];
  } catch (error) {
    console.error("Error updating password:", error);
    throw error;
  }
}

module.exports = {
  registerAccount,
  checkExistingEmail,
  getAccountByEmail,
  updateAccountById,
  updatePassword,
};