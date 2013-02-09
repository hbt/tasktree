define([], function()
{
  describe('Syncing', function()
  {
    describe('when saving model', function()
    {
      describe('update the waiting pool', function()
      {
        xit('should add its id to the waiting pool', function()
        {

        })

        xit('the waiting pool should fire an event', function()
        {

        })
      });

      describe('is remote server accessible?', function()
      {
        describe('yes | sync the waiting pool', function()
        {
          xit('should move ids from waiting pool to transaction pool and create a unique transaction ID', function()
          {

          })
          xit('should send the data via web sockets', function()
          {

          })

          xit('should receive results from the server | use transaction ID to identify', function()
          {

          })

          xit('should update the model with its new data', function()
          {
          })
          xit('should remove the ids from the transaction pool', function()
          {
          })
          xit('should fire event that the transaction was completed', function()
          {
          })

          describe('exceptions', function()
          {
            xit('should not update remote model if local model is older than remote | local.updated_at < remote.updated_at ', function()
            {

            })
          });
        });
      });
    });

    describe('connectivity', function()
    {
      describe('when going online', function()
      {
        xit('should fire an event', function()
        {

        })
      });

      describe('when going offline', function()
      {
        xit('should fire an event', function()
        {

        })
      });
    });

    describe('UI', function()
    {
      describe('connectivity', function()
      {
        describe('when online event is fired', function()
        {
          xit('should display online icon', function()
          {

          })
        });

        describe('when offline event is fired', function()
        {
          xit('should display offline icon', function()
          {

          })
        });
      });

      describe('syncing', function()
      {
        describe('when waiting or transaction pool is not empty', function()
        {
          xit('should update the sync in progress icon', function()
          {
          })
        });
      });
    });
  });

})