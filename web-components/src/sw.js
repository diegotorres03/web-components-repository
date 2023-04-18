import localforage from 'localforage'


self.addEventListener('fetch', async (event) => {
  console.log('logging fetch event carajo!', event.request.url)
  if (event.request.url.includes('/code/assets')) {

    if (event.request.method === 'GET') {
      console.log('si incluye /code/assets', event.request.url)
      event.respondWith(
        new Response(JSON.stringify({ data: 'get mock data' }), {
          headers: { 'Content-Type': 'application/json' },
        })
      );
    } else if(event.request.method === 'POST') {
      console.log('si incluye /code/assets', event.request)
      await localforage.setItem(event.request.url, 'event.request.body')
      event.respondWith(
        new Response(JSON.stringify({ data: 'post mock data' }), {
          headers: { 'Content-Type': 'application/json' },
        })
      );
    }
  }
});

// self.addEventListener('fetch', (event) => {

//   console.log('event on SW')
//   console.log(event)
//   if (event.request.method === 'GET' && event.request.headers.get('accept').includes('text/plain')) {
//     event.respondWith(
//       fetch(event.request).then((response) => {
//         const clonedResponse = response.clone();
//         clonedResponse.text().then((text) => {
//           saveFile(event.request.url, text);
//         });
//         return response;
//       }).catch(() => {
//         return getFile(event.request.url);
//       })
//     );
//   }
// });


// function saveFile(url, text) {
//   const dbPromise = openDatabase();
//   dbPromise.then((db) => {
//     const transaction = db.transaction('files', 'readwrite');
//     const store = transaction.objectStore('files');
//     store.put(text, url);
//     return transaction.complete;
//   });
// }

// function getFile(url) {
//   const dbPromise = openDatabase();
//   return dbPromise.then((db) => {
//     const transaction = db.transaction('files', 'readonly');
//     const store = transaction.objectStore('files');
//     return store.get(url);
//   }).then((text) => {
//     if (text) {
//       return new Response(text);
//     } else {
//       return fetch(url);
//     }
//   });
// }
