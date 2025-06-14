/* ***************************
 *  Create 500 Error
 * ************************** */
async function triggerError(req, res, next) {
  try {
    throw new Error("This is an intentional 500 error.");
  } catch (error) {
    next(error);
  }
}

module.exports = {
  triggerError, // Correctly export the function
};