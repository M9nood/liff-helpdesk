<template>
<div>
  <h1>Ticket</h1>
  <div>
    <ul>
      <li :key="index" v-for="(ticket,index) in tickets">{{ticket}}</li>
    </ul>
  </div>
</div>
</template>

<script>

export default {
 data() {
   return {
     tickets : []
   }
 },
 mounted() {
    const db = this.$firebase.firestore();
    db.collection('tickets')
      .get()
      .then(snap => {
        const tickets = [];
        snap.forEach(doc => {
          tickets.push({ [doc.id]: doc.data() });
        });
        this.tickets = tickets;
      });
  },
}
</script>
