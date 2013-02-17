define([], function()
{

  var Msg = {
    model:       {
      message: ko.observable('hidden'),
      type:    ko.observable('error'),
      show:    ko.observable(false)
    },

    lastTimeout: null,

    error: function(str)
    {
      this.show('error', str)
    },

    show: function(type, str, duration)
    {
      if(this.lastTimeout !== null)
      {
        window.clearTimeout(this.lastTimeout)
      }

      _.events.trigger('on-msg-show', this.model)

      this.model.message(str)
      this.model.type(type)
      this.model.show(true)

      if(!duration)
      {
        duration = 3000
      }

      this.lastTimeout = window.setTimeout(this.afterMessageCallback, duration)
    },

    afterMessageCallback: function()
    {
      Msg.model.show(false)
    },

    init: function(domEl)
    {
      if(!domEl)
      {
        domEl = $('#messages-container')[0]
      }

      ko.applyBindings(this.model, domEl)

      return Msg
    }
  }


  App.services.Msg = App.services.Msg || Msg.init()
  return App.services.Msg
})