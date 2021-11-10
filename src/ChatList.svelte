<script>
  import { db } from "../firebase.js";
  import { collection, addDoc } from "firebase/firestore";

  export let uid;

  async function createChatRoom() {
    console.log(uid);
    const newChat = await addDoc(collection(db, "chats"), {
      createdAt: Date.now(),
      owner: uid,
      members: [uid],
    });

    console.log(newChat);
  }
  // export default {
  //   data() {
  //     return {
  //         chats: []
  //     }
  //   },
  //   firestore() {
  //     return {
  //         chats: db.collection('chats').where('owner', '==', this.uid)
  //     }
  //   },
  //   methods: {

  //   },
  //   props: ['uid']

  // };
</script>

<main>
  <div>
    <ul>
      <!-- <li v-for="chat of chats" :key="chat.id">
          <router-link :to="{ name: 'chat', params: { id: chat.id } }">{{ chat.id }}</router-link>
        </li> -->
    </ul>

    <button on:click={createChatRoom} class="button"
      >Create New Chat Room</button
    >
  </div>
</main>
