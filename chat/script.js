//Get the provider that helps us with Google login.
//If you havnet got a Gmail account it is time to get one!
var provider = new firebase.auth.GoogleAuthProvider();
//I skipped the onDocumentLoaded to make the code simpler add if you need it
//Login
function button10() {
    firebase.auth().signInWithPopup(provider).then(function(result) {
        console.log("Logged in");
    }).catch(function(error) {
        console.log("Unsuccessful login");
          console.log(error.message);
    });
}
//Logout
function button20() {
    firebase.auth().signOut().then(function() {
        console.log("Signed Out");
    }).catch(function(error) {
        console.log("Unsuccessful logout");
    });
}
//Get info for logged in user
function button30() {
    //Get the user will be null/false if not logged in
    var user = firebase.auth().currentUser;
    if (user) {
        var name = user.displayName;
        var email = user.email;
        var photoUrl = user.photoURL;
        var emailVerified = user.emailVerified;
        var uid = user.uid;
        console.log(name);
    } else {
        console.log("Not logged in");
    }
}


//Save nick to firebase
function button40() {
    //Get the user will be null/false if not logged in
    var user = firebase.auth().currentUser;
    if (user) {
        var datapath = firebase.database().ref('users/' + user.uid);
        var nick_name = "Korven" + getRandomInteger(1000);
        datapath.set({
            nick: nick_name
        }).then(function() {
            console.log('Save succeeded');
        }).catch(function(error) {
            console.log('Saved failed');
        });
    }
}

//Read your nick from firebase
function button50() {
    var user = firebase.auth().currentUser;
    //Get the user will be null/false if not logged in
    if (user) {
        var datapath = firebase.database().ref('users/' + user.uid);
        datapath.once('value').then(function(dataSnapshot) {
            console.log(dataSnapshot.val());
        }).catch(function(error) {
            console.log('Oups');
        });
    } else {
        console.log('Not loggede in');
    }
}

//Push chat-message to database
function button60() {
    var datapath = firebase.database().ref('chat');
    var user = firebase.auth().currentUser;
    if (user) {
        var rand = getRandomInteger(10000);
        // here the chat message is created look at Class-Method below
        //User displayName should be replaced by nick if user regitered one
        var message = new Chat(user.displayName, "The message" + rand);
        //OK push it
        datapath.push(message).then(function() {
            console.log('Save succeeded');
        }).catch(function(error) {
            console.log('Saved failed');
        });
    } else {
        console.log("Not logged in");
    }
}

//Listen for chat-child added (First time it gets all children in search in this example the 10 first)
function button70() {
    var datapath = firebase.database().ref('chat');
    datapath.orderByChild("startedAt").limitToLast(10).on("child_added", function(snapShot) {
        console.log(snapShot.val());
    });
}

//Stop Listening for chat messages
function button80() {
    var datapath = firebase.database().ref('chat');
    datapath.off();
}

//Function for createin a chat message
function Chat(userNameOrNick, message) {
    this.message = message;
    this.user = userNameOrNick;
    this.startedAt = firebase.database.ServerValue.TIMESTAMP;
}

//Function to get a random number so messeges and nicks gets different in this example
function getRandomInteger(max) {
    return Math.round(Math.random() * max);
}
