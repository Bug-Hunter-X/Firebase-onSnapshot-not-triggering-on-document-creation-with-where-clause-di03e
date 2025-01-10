# Firebase onSnapshot Not Triggering on Document Creation with Where Clause

This repository demonstrates a common issue encountered when using Firebase's `onSnapshot` with a `where` clause.  The `onSnapshot` listener doesn't fire when a new document matching the `where` clause is added to the collection.

## Problem

The provided code uses `onSnapshot` to listen for changes in a collection of users.  A `where` clause filters for users matching a specific UID.  However, when a new user document with that UID is added, the `added` event in `onSnapshot` is not triggered. This issue occurs because `onSnapshot` only triggers after the document has been fully written to the database and indexed; and this index update happens asynchronously. The where clause filters on this indexed data, therefore initially the query results will be empty until the indexing is finished.

## Solution

The solution involves carefully managing asynchronous operations and the appropriate handling of the `onSnapshot` event. In this case we add a small delay using setTimeout before calling the unsubscribing function to ensure the database is properly updated. Alternatively, a more elegant solution could be to use the `getDocs` function before using `onSnapshot`, ensuring that the initial data is available. This would make sure that the `onSnapshot` does not run into empty data initially.

## Setup

1.  Clone this repository.
2.  Initialize Firebase and set up your project.
3.  Replace placeholders with your Firebase configuration.

## Usage

Run the code in `bug.js` to reproduce the issue.  The solution is implemented in `bugSolution.js`.