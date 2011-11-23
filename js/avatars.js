var Avatars = {

  /**
   * an object containing identities of already visited messages 
   * @type {!Object}
   */
  "visited": {},

  /**
   * creates an avatar from a person td, if name available
   * @param {!Element} person The person td
   * @return {Element} the author avatar img or null
   * @private
   */
  "_getAvatar": function(person){
    var author = person.find('.author')
    if(!author.is(':visible')){
      return null;
    }

    var avatar = document.createElement('img');
    avatar.src    = author.data('avatar');
    avatar.title  = author.text();
    avatar.alt    = author.text();
    avatar.width  = 50;
    avatar.height = 50;

    return avatar;
  },

  /**
   * Adds avatars to all users
   */
  "addAvatars": function(){
    var modified = false, 
        people = $('.person');

    for(var i = people.length - 1; i >= 0; --i){
      var person = $(people[i]);

      //check if the message has been already processed
      var messageId = person.parent().attr("id");
      if(Avatars.visited[messageId]){
        break;
      }
      Avatars.visited[messageId] = true;

      var avatar = Avatars._getAvatar(person);
      if(!avatar){
        continue;
      }

      person.append(avatar).find('.author').remove();

      modified = true;
    }

    if(modified){
      Avatars._scrollChatToBottom();
    }

  },

  /**
   * Scrolls the chat pane to the bottom
   * @private
   */
  "_scrollChatToBottom": function(){
    var targetY = Avatars._getPageHeight() + Avatars._getWindowHeight() + 100;
    window.scrollTo(0, targetY);
  },

  /** @return {number} The page height. */
  "_getPageHeight": function() {
    return Math.max(document.documentElement.offsetHeight, document.body.scrollHeight);
  },

  /** @return {number} The window height. */
  "_getWindowHeight": function() {
    return window.innerHeight || document.body.clientHeight;
  }

}

//$.fn.ready(function(){
  Avatars.addAvatars();
  setInterval(Avatars.addAvatars, 1000);
//})
