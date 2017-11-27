import axios from 'axios';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css'; // <- this line is required

export const fetchInitialMessages = ({ commit }) => {
    NProgress.start();
    axios.get('initialMessages').then(response => {
        commit("INITIAL_MESSAGES", response.data);
        NProgress.done();
    }).catch(err => {
        console.log(err);
        NProgress.done();
    });
};

export const fetchMessages = ({ commit }, lastFetchedMessageDate) => {
    NProgress.start();
    axios.get('/fetchMessages?lastFetchedMessageDate='+lastFetchedMessageDate)
    .then(response => {
        commit("FETCH_MESSAGES", response.data);
        NProgress.done();
    }).catch(err => {
        console.log(err);
        NProgress.done();
    });
};