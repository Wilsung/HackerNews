const api = `https://hacker-news.firebaseio.com/v0`
const json = '.json?print=pretty'

export function fetchMainPosts (type) {
    return fetch(`${api}/${type}stories${json}`)
      .then((res) => res.json())
      .then((ids) => {
        if (!ids) {
          throw new Error(`There was an error fetching the ${type} posts.`)
        }
  
        return ids.slice(0, 50)
      })
      //.then((ids) => Promise.all(ids.map(fetchItem)))
      //.then((posts) => removeDeleted(onlyPosts(removeDead(posts))))
  }