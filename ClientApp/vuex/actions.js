import axios from 'axios'

export const fetchInitialMessages = ({commit}, origin) => {
  // this one will run on server so it need FQDN or server won't able to resolve the API address
  return axios.get(`${origin}/initialMessages`).then(response => {
    commit('INITIAL_MESSAGES', response.data)
  }).catch(err => {
    console.log(err)
  })
}

export const fetchMessages = ({commit}, lastFetchedMessageDate) => {
  axios.post('/fetchMessages',{
    lastMessageDate : lastFetchedMessageDate
  })
    .then(response => {
      commit('FETCH_MESSAGES', response.data)
    }).catch(err => {
      console.log(err)
    })
}