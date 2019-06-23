import { IMGUR_ID } from '../config';

export const fetchComments = (id) =>
  new Promise(function(resolve, reject) {
  fetch(`https://api.imgur.com/3/gallery/${id}/comments/best`,
    {
      "headers": {
        "Authorization": 'Client-ID ' + IMGUR_ID,
      }
    }
  )
  .then(comments => {
    return comments.json()
  })
  .then((comments) => {
    resolve(comments);
  })
  .catch((err) => {
    console.error(err);
  });
});
