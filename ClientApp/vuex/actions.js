import axios from 'axios'

export const fetchInitialMessages = ({commit}) => {
  // this one will run on server so it need FQDN or server won't able to resolve the API address
  return axios.get('http://localhost:5000/initialMessages').then(response => {
    commit('INITIAL_MESSAGES', response.data)
  }).catch(err => {
    console.log(err)
  })
}

export const fetchMessages = ({commit}, lastFetchedMessageDate) => {
  axios.get('http://localhost:5000/fetchMessages?lastFetchedMessageDate=' + lastFetchedMessageDate)
    .then(response => {
      commit('FETCH_MESSAGES', response.data)
    }).catch(err => {
      console.log(err)
    })
}