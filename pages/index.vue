<template>
  <section class="container">
    <div>
      <h2>
        Display all teams.
      </h2>
      <div v-for="team in teams" :key="team.id">
        <p>Team Name: {{ team.name }}</p>
        <p>Team Player 1: {{ team.player1 }}</p>
        <p>Team Player 2: {{ team.player2 }}</p>
        <p>Team score {{ team.score }}</p>
      </div>
    </div>
    <div class="add-team">
      <h2>
        Add a new team.
      </h2>
      <form @submit.prevent="addTeam">
        <label for="name">Team Name:</label>
        <input type="text" id="name" v-model="newTeam.name">
        <label for="player1">Player 1:</label>
        <input type="text" id="player1" v-model="newTeam.player1">
        <label for="player2">Player 2:</label>
        <input type="text" id="player2" v-model="newTeam.player2">
        <button type="submit">Add Team</button>
      </form>
    </div>
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
      }
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
    }
  },
  mounted() {
    this.fetchTeams();
  },
};
</script>
<style>
.container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
</style>
