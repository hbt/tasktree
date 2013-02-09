define(['hbs!modules/list/views/one.tmpl'], function(tmpltxt)
{
  var View = Backbone.View.extend({

    model:        null,
    collection:   null,

    // TODO(hbt) NEXT 12
    childrenList: null,

    events: {
      'blur .task-input':    'save',
      'keydown .task-input': 'keyListener',
      'change .status':      function()
      {
        this.model.toggleDone()
      }
    },

    save: function(e)
    {
      // save content if different
      var input = $(e.target)
      if(input.val() && input.val() !== this.model.get('content'))
      {
        this.model.save({content: input.val()})
        return true
      }

      return false
    },

    keyListener: function(e)
    {
      // create new entry on Enter
      if(e.keyCode === 13)
      {
        this.save(e)

        var nextPos = this.collection.indexOf(this.model) + 1
        if(this.collection.at(nextPos) && this.collection.at(nextPos).get('content') === '')
        {
          // TODO(hbt) add focus on next
        }
        else if($(e.target).val() !== '')
        {
            this.collection.create({content: ''}, {at: nextPos, focus: true })
        }
      }

      // TODO(hbt) NEXT 7 on enter add new model to collection
      // TODO(hbt) NEXT enter will be used to create a new one

      // TODO(hbt) NEXT 7 on enter
      {
        // TODO(hbt) NEXT get model index in collection

        // TODO(hbt) NEXT create new model and add it after this one
      }


      // TODO(hbt) NEXT 10 on shift enter
      {
        // TODO(hbt) NEXT add child
      }
    },

    initialize: function(model, collection)
    {
      this.model = model
      this.collection = collection

      this.listenTo(model, 'change', this.updateOnChange)
      // TODO(hbt) NEXT 11 add listener for children

      this.render()
    },

    updateOnChange: function()
    {
      if(this.el.parentElement === null)
      {
        this.remove()
      }
      else
      {
        this.render()
      }
    },

    render: function()
    {
      // TODO(hbt) NEXT has children?
      // TODO(hbt) NEXT create list view and pass it model

      // TODO(hbt) NEXT 13 create or reuse the list if it has children
      {

      }


      // TODO(hbt) NEXT render list and pass it to template
      this.$el.html($(tmpltxt({
        id:      this.model.get('id'),
        content: this.model.get('content'),
        status:  this.model.isDone() ? 'checked' : ''
      })))

      return this
    }
  })

  window.App.views['One'] = View

  return View
})