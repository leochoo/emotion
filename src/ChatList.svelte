<script>
  import { onMount } from "svelte";
  import { db } from "../firebase.js";
  import { Router, Link, Route } from "svelte-routing";

  import {
    collection,
    addDoc,
    doc,
    query,
    where,
    onSnapshot,
    orderBy,
  } from "firebase/firestore";

  export let uid;

  let chatList = [];

  console.log(uid);

  const q = query(
    collection(db, "chats"),
    where("owner", "==", uid),
    orderBy("createdAt", "desc")
  );
  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    var chatRooms = [];
    querySnapshot.forEach((doc) => {
      const chatObj = {
        id: doc.id,
        createdAt: doc.data().createdAt,
        owner: doc.data().owner,
        members: doc.data().members,
      };

      chatRooms = [...chatRooms, chatObj];
      chatList = chatRooms;
    });
    console.log("Current chatRooms: ", chatRooms);
  });

  onMount(async () => {});

  async function createChatRoom() {
    const newChat = await addDoc(collection(db, "chats"), {
      createdAt: Date.now(),
      owner: uid,
      members: [uid],
    });

    console.log(newChat);
  }
</script>

<main>
  <div>
    <ul>
      {#each chatList as chat (chat.id)}
        <li><Link to={"chat/" + chat.id}>{chat.id}</Link></li>
      {/each}
    </ul>

    <button on:click={createChatRoom} class="button"
      >Create New Chat Room</button
    >
  </div>
</main>
