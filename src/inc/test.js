var generator = require('./generate.js')
var params = require('./generate/params');
var sg = new generator;


params.dbUser = 'sample';
params.dbName = 'sample_sequelize';
params.dbPassword = '3Jcftix7VycNkEYKxIDW';
params.dbHost = 'localhost';
params.dbDialect = 'mysql';
params.demFile = '../../sample/01_person/sample_01.dem.json'
sg.createDBEAR(params)