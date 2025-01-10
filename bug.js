const query = query(collection(db, 'users'), where('uid', '==', user.uid));
const unsubscribe = onSnapshot(query, (snapshot) => {
  snapshot.docChanges().forEach((change) => {
    if (change.type === 'added') {
      // This will only run once when the user is first added to the database
      console.log('New user:', change.doc.data());
    } else if (change.type === 'modified') {
      // This will run whenever the user's data is updated
      console.log('User updated:', change.doc.data());
    } else if (change.type === 'removed') {
      // This should never run unless the user is explicitly deleted from the database
      console.log('User removed:', change.doc.data());
    }
  });
});
// unsubscribe(); // Important: Remember to unsubscribe when you're done!