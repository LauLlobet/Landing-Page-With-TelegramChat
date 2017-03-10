    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

    ga('create', 'UA-91061520-2', 'auto');
    ga('send', 'pageview', {
      'page': 'www.gnca.live/index.html',
      'title': 'Landing page'
    });
  
  var config = {
    apiKey: "AIzaSyAwjIJXmqcJ_uoUSFFDy1sap4rebuhglDw",
    authDomain: "gncalive.firebaseapp.com",
    databaseURL: "https://gncalive.firebaseio.com",
    storageBucket: "gncalive.appspot.com",
    messagingSenderId: "116350798150"
  };
  firebase.initializeApp(config);


  var fireBase = firebase.database().ref("chat");

  var messagesView = function(name, text, isOwn) {
      var bocadillo;
      var leftOrRight;
      var container = jQuery("<div/>",{
          style: 'width: 660px;z-index: -4;'
      });

      if(isOwn){
        bocadillo = jQuery("<div/>",{
          "class":'talk-bubble tri-right right-top',
        });
        name = "Tu"
        leftOrRight = jQuery("<div/>",{
          style: 'float: right;'
        });

      }else{
        bocadillo = jQuery("<div/>",{
          "class":'talk-bubble tri-right left-top',
        });
        leftOrRight = jQuery("<div/>",{
          style: 'float: left;'
        });
      }

      var p1 = jQuery("<p/>",{
          text: name + ":",
          style: 'font-weight: bold;'
        });
      var p2 = jQuery("<p/>",{
          text: text
        });

      var textBox = jQuery("<div/>",{
        "class": "talktext",
      })
      //textBox.append(p1);
      textBox.append(p2);
      bocadillo.append(textBox);
      bocadillo.appendTo(leftOrRight);
      leftOrRight.appendTo(container);
      container.prependTo("#listMessages ul");
    };

hashCode = function(str){
    if(str === undefined){
      return 0;
    }
    var hash = 0;
    if (str.length == 0) return hash;
    for (i = 0; i < str.length; i++) {
        char = str.charCodeAt(i);
        hash = ((hash<<5)-hash)+char;
        hash = hash & hash; // Convert to 32bit integer
    }
    return Math.abs(hash%500);
}


  fireBase.on("child_added", function(snapshot) {
      var message = snapshot.val();
        ga(function(tracker) {  
            var ownId = tracker.get('clientId');
            var concreteAlias = firebase.database().ref('alias/'+hashCode(message.name));      
            concreteAlias.on('value', function(snapshot2) {
                  var isUserMessage = false;
                  if(ownId === message.name){
                    isUserMessage = true
                  }
                  messagesView(snapshot2.val(), message.text,isUserMessage);
            });
        });
  });
    var newMessage = function(name, text) {
       fireBase.push({
        name: name,
        text: text
      });
  	};

  $("#btnSubmit").click(function(e) {
      var name, text;
        text = $("#newMessage input[name='text']").val();
        $("#newMessage input[name='text']").val("");
        ga(function(tracker) {  
            return newMessage(tracker.get('clientId'), text);
        });
  });

  $("#newMessage input").keypress(function(e) {
      var name, text;
      if (e.keyCode === 13) {
        text = $("#newMessage input[name='text']").val();
        $("#newMessage input[name='text']").val("");
        ga(function(tracker) {  
            return newMessage(tracker.get('clientId'), text);
        });
      }
    });

setTimeout(function(){
  ga(function(tracker) {  
            newMessage(tracker.get('clientId'), "GNCA: Todo para vivir creando programas!");
        });
},4000);

