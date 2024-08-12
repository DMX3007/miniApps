<script lang="ts">
  import { ref } from 'vue';
  import { requestContact } from '@/services/api';
  export default {
    setup() {
      const chatId = ref('');
      const messageText = ref('');
      const buttonText = ref('');
      const response = ref(null);
      const app = window.Telegram.WebApp;
      // Call as soon as your page is ready for the user to see
      app.ready();
      // Expand your web app to full screen
      app.expand();
      const sendContactRequest = async () => {
        try {
        const result = await requestContact(chatId.value, messageText.value, buttonText.value);
        response.value = result;
        } catch (err) {
          console.log(err)
        }
      }
      return {
        chatId,
        messageText,
        buttonText,
        response,
        sendContactRequest
      }
    }
  }
</script>

<template>
  <div class="greetings">
    <h1 class="green">{{ msg }}</h1>
    <h3>
      Telegram mini-apps
    </h3>
    <div>
      <input v-model="chatId" placeholder="Chat ID" />
      <input v-model="messageText" placeholder="Message Text" />
      <input v-model="buttonText" placeholder="Button Text" />
      <button @click="sendContactRequest">Request Contact</button>
      <p v-if="response">{{ response }}</p>
    </div>
  </div>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  position: relative;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>
