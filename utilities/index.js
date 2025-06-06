const inventoryModel = require("../models/inventoryModel")
const utilities = {}

/* ************************
 * Constructs the nav HTML unordered list
 ************************** */
utilities.getNav = async function (req, res, next) {
  try {
    console.log('Building navigation...')
    let data = await inventoryModel.getClassifications()
    let list = "<ul>"
    list += '<li><a href="/" title="Home page">Home</a></li>'
    data.forEach((row) => {
      list += "<li>"
      list +=
        '<a href="/inventory/type/' +
        row.classification_id +
        '" title="See our inventory of ' +
        row.classification_name +
        ' vehicles">' +
        row.classification_name +
        "</a>"
      list += "</li>"
    })
    list += "</ul>"
    console.log('Navigation built successfully')
    return list
  } catch (error) {
    console.error('Error building navigation:', error.message)
    // Return a basic navigation if database fails
    return '<ul><li><a href="/" title="Home page">Home</a></li></ul>'
  }
}

/* **************************************
* Build the classification view HTML
* ************************************ */
utilities.buildClassificationGrid = async function (data) {
  let grid
  if (data && data.length > 0) {
    grid = '<ul id="inv-display">'
    data.forEach(vehicle => {
      grid += '<li>'
      grid += '<a href="../../inventory/detail/' + vehicle.inv_id
        + '" title="View ' + vehicle.inv_make + ' ' + vehicle.inv_model
        + ' details"><img src="' + vehicle.inv_thumbnail
        + '" alt="Image of ' + vehicle.inv_make + ' ' + vehicle.inv_model
        + ' on CSE Motors" /></a>'
      grid += '<div class="namePrice">'
      grid += '<hr />'
      grid += '<h2>'
      grid += '<a href="../../inventory/detail/' + vehicle.inv_id + '" title="View '
        + vehicle.inv_make + ' ' + vehicle.inv_model + ' details">'
        + vehicle.inv_make + ' ' + vehicle.inv_model + '</a>'
      grid += '</h2>'
      grid += '<span>$'
        + new Intl.NumberFormat('en-US').format(vehicle.inv_price) + '</span>'
      grid += '</div>'
      grid += '</li>'
    })
    grid += '</ul>'
  } else {
    grid = '<p class="notice">Sorry, no matching vehicles could be found.</p>'
  }
  return grid
}

/* ****************************************
 * Build single vehicle display HTML
 **************************************** */
utilities.buildSingleVehicleDisplay = async (vehicle) => {
  if (!vehicle) {
    return '<p class="notice">Sorry, vehicle details could not be found.</p>'
  }
  
  let svd = '<section id="vehicle-display">'
  svd += "<div>"
  svd += '<section class="imagePrice">'
  svd +=
    "<img src='" +
    vehicle.inv_image +
    "' alt='Image of " +
    vehicle.inv_make +
    " " +
    vehicle.inv_model +
    " on cse motors' id='mainImage'>"
  svd += "</section>"
  svd += '<section class="vehicleDetail">'
  svd += "<h3> " + vehicle.inv_make + " " + vehicle.inv_model + " Details</h3>"
  svd += '<ul id="vehicle-details">'
  svd +=
    "<li><h4>Price: $" +
    new Intl.NumberFormat("en-US").format(vehicle.inv_price) +
    "</h4></li>"
  svd += "<li><h4>Description:</h4> " + vehicle.inv_description + "</li>"
  svd += "<li><h4>Color:</h4> " + vehicle.inv_color + "</li>"
  svd +=
    "<li><h4>Miles:</h4> " +
    new Intl.NumberFormat("en-US").format(vehicle.inv_miles) +
    "</li>"
  svd += "</ul>"
  svd += "</section>"
  svd += "</div>"
  svd += "</section>"
  return svd
}

/* ****************************************
 * Middleware For Handling Errors
 * Wrap other function in this for 
 * General Error Handling
 **************************************** */
utilities.handleErrors = fn => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next)
}

module.exports = utilities