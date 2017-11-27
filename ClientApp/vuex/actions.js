import axios from 'axios';

export const fetchInitialMessages = ({ commit }) => {
    axios.get('initialMessages').then(response => {
        commit("INITIAL_MESSAGES", response.data);
    }).catch(err => {
        console.log(err);
    });
};

export const fetchMessages = ({ commit }, lastFetchedMessageDate) => {
    axios.get('/fetchMessages?lastFetchedMessageDate='+lastFetchedMessageDate)
    .then(response => {
        commit("FETCH_MESSAGES", response.data);
    }).catch(err => {
        console.log(err);
    });
};