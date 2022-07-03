<template>
  <section class="container">
    <Nav></Nav>
    <Teams></Teams>
    <AddTeam v-if="showModal"></AddTeam>
    <Modal>
      <template #header>This is my header!!!</template>
    </Modal>
  </section>
</template>
<script>
import { db } from "~/plugins/firebase.js";
import { doc, setDoc, getDocs, collection, Timestamp } from "firebase/firestore";

export default {
  data() {
    return {
      teams: [],
      newTeam: {
        name: "",
        player1: "",
        player2: "",
        score: 0,
      },
    };
  },
  methods: {
    async fetchTeams() {
      const teamsRef = getDocs(collection(db, "teams"));

      try {
        (await teamsRef).forEach((doc) => {
          this.teams.push(doc.data());
        });
      } catch (e) {
        console.error(e);
      }
    },
    async addTeam() {
      const newTeamRef = doc(collection(db, "teams"));

      const newTeam = {
        name: this.newTeam.name,
        player1: this.newTeam.player1,
        player2: this.newTeam.player2,
        score: this.newTeam.score,
        createdAt: Timestamp.now()
      };
      try {
        await setDoc(newTeamRef, newTeam);
        this.newTeam.name = "";
        this.newTeam.player1 = "";
        this.newTeam.player2 = "";
        this.newTeam.score = 0;
      } catch (e) {
        console.error(e);
      }
    },
  },
  computed: {
  showModal () {
    return this.$store.state.showModal
  }
},
  mounted() {
    this.fetchTeams();
  },
};
</script>
<style scoped lang="scss">
</style>
