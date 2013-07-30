define([], function()
{
  // database schema + migrations
  var schema =
  {
    id:          'tasktree',
    description: 'Task Management',
    // Note(hbt) set to false to see all indexedb operations
    nolog:       0,
    migrations:  [
      {
        // create tables
        version: 1,
        migrate: function(transaction, next)
        {
          transaction.db.createObjectStore('tasks');
          transaction.db.createObjectStore('tags');
          transaction.db.createObjectStore('tagstasks');
          next();
        }
      },
      {
        // add indices
        version: 2,
        migrate: function(transaction, next)
        {
          var store = transaction.objectStore('tasks');
          store.createIndex('contentIndex', 'content', {
            unique: false
          });

          store = transaction.objectStore('tags');
          store.createIndex('contentIndex', 'content', {
            unique: true
          });

          next();
        },

        after: function(next)
        {

          // create default tags
          _.each(['completed', 'incomplete'], function(v)
          {
            App.collections.Tags.create({content: v}, {wait: true})
          })

          next()
        }
      }
    ]
  }


  return schema

})