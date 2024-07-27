const logger = require('./logger')

const errorHandler = (error, request, response, next) => {
    logger.error(error.message)
    if(error.name === 'CastError'){
      return response.status(400).send('malformed id')
    }
    else if(error.name === 'ValidationError'){
      return response.status(400).send(error.message)
    }
  
    next(error)
  }

  const unknownPath = (request, response) => {
	response.status(404).send('unknown path')
}


module.exports = {errorHandler, unknownPath}