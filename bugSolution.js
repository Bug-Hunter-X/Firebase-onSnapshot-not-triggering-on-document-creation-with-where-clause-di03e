const query = query(collection(db, 'users'), where('uid', '==', user.uid));
let unsubscribe = null;

// First get the document, then listen for changes
getDocs(query).then(snapshot => {
    if (!snapshot.empty) {
        snapshot.forEach(doc => {
            console.log('Initial user:', doc.data());
        });
    }
    unsubscribe = onSnapshot(query, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === 'added') {
          console.log('New user:', change.doc.data());
        } else if (change.type === 'modified') {
          console.log('User updated:', change.doc.data());
        } else if (change.type === 'removed') {
          console.log('User removed:', change.doc.data());
        }
      });
    });
}).catch(error => {
    console.error('Error fetching documents:', error);
});

// unsubscribe(); // Important: Remember to unsubscribe when you're done!