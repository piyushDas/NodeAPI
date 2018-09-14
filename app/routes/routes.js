/*
  In Express, routes are wrapped in a function,
  which takes the Express instance and a database as arguments.
*/
// module.exports = function(app, db) {
//   app.post('/notes', (req, res) => {
//     // Create your note here.
//     // console.log(req.body);
//     // res.send('Hello')
//   });
// };
var ObjectID = require('mongodb').ObjectID;

/*
  Create operation - POST
*/
module.exports = function(app, database) {
  console.log("inside routes");
  const db = database.db("mdb_first_api");

  app.post('/notes', (req, res) => {
    const note = { text: req.body.body, title: req.body.title };
    db.collection('notes').insert(note, (err, result) => {
      if (err) {
        res.send({ 'error': 'An error has occurred' });
      } else {
        res.send(result.ops[0]);
      }
    });
  });

  /*
    Retrieve operation - GET
  */
  app.get('/notes/:id', (req, res) => {
    const id = req.params.id;
    const details = { '_id': new ObjectID(id) };
    db.collection('notes').findOne(details, (err, item) => {
      if (err) {
        res.send({'error':'An error has occurred'});
      } else {
        res.send(item);
      }
    });
  });

  /*
    Delete operation - DELETE
  */
  app.delete('/notes/:id', (req, res) => {
    const id = req.params.id;
    const details = { '_id': new ObjectID(id) };
    db.collection('notes').remove(details, (err, item) => {
      if (err) {
        res.send({'error':'An error has occurred'});
      } else {
        res.send('Note ' + id + ' deleted!');
      }
    });
  });

  /*
    Update operation - PUT
  */
  app.put('/notes/:id', (req, res) => {
    const id = req.params.id;
    const details = { '_id': new ObjectID(id) };
    const note = { text: req.body.body, title: req.body.title };
    db.collection('notes').update(details, note, (err, result) => {
      if (err) {
          res.send({'error':'An error has occurred'});
      } else {
          res.send(note);
      }
    });
  });
};
