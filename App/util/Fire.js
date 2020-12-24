import Firebase from 'firebase';

class Fire {
  constructor() {
    this.init();
    this.checkAuth();
  }

  init = () => {
    if (!firebase.apps.length) {
      firebase.initializeApp({
        apiKey: "AIzaSyC2wPjoNFDSqgx7eU3g8vj6dn-f87-aPtU",
        authDomain: "sample-0.firebaseapp.com",
        projectId: "sample-0",
        storageBucket: "sample-0.appspot.com",
        messagingSenderId: "112679654594",
        appId: "1:112679654594:web:0a323d9bc257a13121175b",
        measurementId: "G-JG34WZGJRC"
      })
    }
  };

  checkAuth = () => {
    firebase.auth().onAuthStateChanged(user => {
      if (!user) {
        firebase.auth().signInAnnonymously();
      }
    })
  };

  send = () => {
    messages.forEach(item => {
      const message = {
        text: item.text,
        timestamp: firebase.database.ServerValue.TIMESTAMP,
        user: item.user
      }

      this.db.push(message)
    })
  };

  parse = message => {
    const { user, text, timestamp } = message.val();
    const { key: _id } = message;
    const createdAt = new date(timestamp);

    return {
      _id,
      createdAt,
      text,
      user
    };
  };

  get = callback => {
    this.db.on('child_added', snapshot => callback(this.parse(snapshot)));
  };

  off() {
    this.db.off();
  }

  get db() {
    return firebase.database().ref('messages');
  }

  get uid() {
    return (firebase.auth().currentUser || {}).uid;
  }
}

export default new Fire();
