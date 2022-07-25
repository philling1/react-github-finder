import { createContext, useReducer } from "react";
import { createRenderer } from "react-dom/test-utils";
//import { createContext, useState } from "react";
import githubReducer from "./GithubReducers";

const GithubContext = createContext()

//Taking this into our function component

// const GITHUB_URL = process.env.REACT_APP_GITHUB_URL
// const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN

export const GithubProvider = ({ children }) => {
  //since we are using reducer we are not going to be needing these

  // const [users, setUsers] = useState([])
  // const [loading, setLoading] = useState(true)

  //Instead
  const initialState = {
    users: [],
    user: {},
    repos: [],
    loading: false
  }

  const [state, dispatch] = useReducer(githubReducer, initialState)

  //Getting the initial users for setting the UI (for testing purpose since we will search the users)
  /*
  const fetchUsers = async () => {
    //Then whenever we are to change the loading state we call the function
    setLoading()

    const response = await fetch(`${GITHUB_URL}/users`, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`
      }
    })

    const data = await response.json()

    //We will no longer be needing these since w're using reducers
    // setUsers(data)
    // setLoading(false)

    //Instead
    dispatch({
      type: 'GET_USERS',
      payload: data,
    })
  }*/

  //Instead since we are going to search the users we then use 
  //AND this also goes to the function component
  
  // const searchUsers = async (text) => {
  // //Then whenever we are to change the loading state we call the function
  //   setLoading()

  //   const params = new URLSearchParams({
  //     q: text
  //   })

  // const response = await fetch(`${GITHUB_URL}/search/users?${params}`, {
  //     headers: {
  //       Authorization: `token ${GITHUB_TOKEN}`
  //     }
  //   })

  //   const {items} = await response.json()

  //   //Instead
  //   dispatch({
  //     type: 'GET_USERS',
  //     payload: items,
  //   })
  // }

  //Get single user
  // const getUser = async (login) => {
  //   setLoading()
  
  //   const response = await fetch(`${GITHUB_URL}/users/${login}`, {
  //       headers: {
  //         Authorization: `token ${GITHUB_TOKEN}`
  //       }
  //     })

  //     if(response.status === 404) {
  //       window.location = '/notfound'
  //     }else {
  //       const data = await response.json()

  //       return dispatch({
  //          type: 'GET_USER',
  //          payload: data,
  //        })

  //     }
  
     
  //   }

  //   // Get the user repos
  //   const getUserRepos = async (login) => {
  //     //Then whenever we are to change the loading state we call the function
  //       setLoading()
      
  //       const params = new URLSearchParams({
  //         sort: 'created',
  //         per_page: 10
  //       })
    
  //     const response = await fetch(`${GITHUB_URL}/users/${login}/repos?${params}`, {
  //         headers: {
  //           Authorization: `token ${GITHUB_TOKEN}`
  //         }
  //       })
    
  //       const data = await response.json()
    
  //       return dispatch({
  //         type: 'GET_REPOS',
  //         payload: data,
  //       })
  //     }

  //Clear users form the state
  // const clearUsers = () => dispatch({
  //   type: 'CLEAR_USERS'
  // })

  //since we will be using the loading state of the reducer in a few different places we
  //SET LOADING
  // const setLoading = () => dispatch({type: 'SET_LOADING'})

  return <GithubContext.Provider value={{
        //refractoring code
        ...state,
        //instead of
        // users: state.users,
        // loading: state.loading,
        // user: state.user,
        // repos: state.repos,
        //so of the fetchusers w're passing the searchUser function
        //And instead of passing the functions
        // searchUsers,
         //We are passing the dispatch function and creating a separate for the function
         dispatch,
        //  clearUsers,
        //  getUser,
        //  getUserRepos,
       
      }}>
        {children}
      </GithubContext.Provider>
    }
    
// If we are supposedly using context api
//   return <GithubContext.Provider value={{
//     users,
//     loading,
//     fetchUsers,
//   }}>
//     {children}
//   </GithubContext.Provider>
// }

export default GithubContext