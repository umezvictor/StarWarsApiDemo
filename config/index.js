// load database configuration based on environment
// if in production environment
if(process.env.NODE_ENV === 'production'){
    module.exports = require('./dbconfig_prod');
}else{
    // if in development environment
    module.exports = require('./dbconfig_dev');
}

