define([], function()
{
  describe('tag | tag management', function()
  {

    describe('Design', function()
    {
      describe('when module is initialized', function()
      {
        xit('should create __module__ tag if it does not exist | data that will have as its children all tags', function()
        {
        })
      });

    });

    describe('Features', function()
    {

      describe('Tagging', function()
      {
        describe('when adding a tag', function()
        {
          xit('should not create a new one | tag is unique by name', function()
          {

          })

          xit('should only accept alphanumerical characters with - and _ as separators | keeps parsing simple', function()
          {

          })

          xit('should have __module__ tag as its metadata and be listed as a child | all tags are tracked', function()
          {

          })


          xit('should have the tagged content as a child and the child have the data as its metadata', function()
          {

          })
        });

        describe('when removing a tag', function()
        {
          xit('data no longer has the tag as its metadata and tag no longer has data as its child', function()
          {

          })
        });
      });

      describe('inline tagging | user can tag data using # in text input', function()
      {
        describe('before saving data', function()
        {
          xit('tags are extracted', function()
          {

          })

          xit('data is tagged but content does not include tags inline', function()
          {

          })
        });

      });

    });
  });
})