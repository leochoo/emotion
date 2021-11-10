<script>
  import { onMount } from "svelte";
  import { db } from "../firebase.js";
  import {
    collection,
    addDoc,
    doc,
    query,
    where,
    onSnapshot,
  } from "firebase/firestore";

  export let uid;

  onMount(async () => {
    console.log(uid);
    const q = query(collection(db, "chats"), where("owner", "==", uid));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const chatRooms = [];
      querySnapshot.forEach((doc) => {
        // chatRooms.push(doc.data());
        chatRooms.push(doc.id);
      });
      console.log("Current chatRooms: ", chatRooms.join(", "));
    });
  });

  async function createChatRoom() {
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
