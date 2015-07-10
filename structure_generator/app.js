/* Define dependencies */
var request = require('./request.json');
var Generator = require('./generator');

var sg = new Generator();
sg.setConnection('sample_sequelize', 'sample', '3Jcftix7VycNkEYKxIDW');
sg.createMeta();
sg.createModel(request);
sg.defineEntities(sg.model.namespaces[1].entities);
sg.sync(true);
