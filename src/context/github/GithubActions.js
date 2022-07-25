import axios from "axios"

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN

const github = axios.create({
  baseURL: GITHUB_URL,
  headers: { Authorization: `token ${GITHUB_TOKEN}` }
})

//we also want to make sure to export this so that we can call it from the component

export const searchUsers = async (text) => {
  //since the function is not going to call the setloading because we are going to dispatch from the component we will not be needing this
    // setLoading()

    const params = new URLSearchParams({
      q: text
    })

    //since we are using axios we will not be doing all this
  // const response = await fetch(`${GITHUB_URL}/search/users?${params}`, {
  //     headers: {
  //       Authorization: `token ${GITHUB_TOKEN}`
  //     }
  //   })

  //  const {items} = await response.json()
  
  //Instead
  const response = await github.get(`/search/users?${params}`)


    //since we are dispatching from the component

    // dispatch({
    //   type: 'GET_USERS',
    //   payload: items,
    // })

    //instead what we want to do here is to return the item
    // return items
  
    //but then with axios we are returning
    return response.data.items

  }

  //For this two function we are goin to combine using axios

  //Get user and repos
  export const getUserAndRepos = async(login) => {
    const [user, repos] = await Promise.all([
      github.get(`/users/${login}`),
      github.get(`/users/${login}/repos`)
    ])

    return { user: user.data, repos: repos.data}
  }
  //Get single user
// export const getUser = async (login) => {
//     //Also we getting ride of setloading
//     //setLoading()
  
//     const response = await fetch(`${GITHUB_URL}/users/${login}`, {
//         headers: {
//           Authorization: `token ${GITHUB_TOKEN}`
//         }
//       })

//       if(response.status === 404) {
//         window.location = '/notfound'
//       }else {
//         const data = await response.json()

//         // return dispatch({
//         //    type: 'GET_USER',
//         //    payload: data,
//         //  })

//         //also we are returning the data
//         return data
//       }
  
     
//     }

//     // Get the user repos
// export const getUserRepos = async (login) => {
//         //Also we getting ride of setloading
//         //setLoading()
      
//         const params = new URLSearchParams({
//           sort: 'created',
//           per_page: 10
//         })
    
//       const response = await fetch(`${GITHUB_URL}/users/${login}/repos?${params}`, {
//           headers: {
//             Authorization: `token ${GITHUB_TOKEN}`
//           }
//         })
    
//         const data = await response.json()
    
//         // return dispatch({
//         //   type: 'GET_REPOS',
//         //   payload: data,
//         // })

//         return data
//       }