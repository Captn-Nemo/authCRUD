function sendError ( body ) {
    return { success: false, error: body };
  }
  
  function sendSuccess ( body ) {
    return { success: true, data: body }; 
  }
  
  function updateSuccess ( body ) {
    return { 
      success: true, 
      message: body + " has been updated successfully"
    }
  }
  module.exports = { sendError, sendSuccess, updateSuccess }; 