
<script>
import { mapGetters, mapActions } from 'vuex';
import Message from './Message.vue';
export default {
    components: { Message },
    computed: mapGetters(['messages', 'lastFetchedMessageDate']),
    methods: mapActions(['fetchMessages']),
    created () {
        return this.$store.dispatch('fetchInitialMessages')
    }
}
</script>

<template>
    <div>
        <h1>Hello from Vue#!!!#</h1>
        <Message v-for="(msg, index) in messages" :message="msg" :key="index" />
        <button @click="fetchMessages(lastFetchedMessageDate)">Fetch a message</button>
    </div>
</template>
