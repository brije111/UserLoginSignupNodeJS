var mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/CRMdb', {useNewUrlParser: true, useUnifiedTopology: true});