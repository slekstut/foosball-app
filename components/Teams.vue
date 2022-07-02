<template>
    <div class="container">
        <h2>
          Board.
        </h2>
        <div class="teams">
          <div v-for="team in teams" :key="team.id" class="team">
            <p class="team__title">{{ team.name }}</p>
            <p class="team__player">Team Player 1: {{ team.player1 }}</p>
            <p class="team__player">Team Player 2: {{ team.player2 }}</p>
            <p class="team__score">Team score {{ team.score }}</p>
          </div>
        </div>
      </div>
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

<style scoped lang="scss">
.container {
  margin-top: 120px;

.teams {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  .team {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    margin: 10px;
    width: 33.33%;
    background-color: #fff;
    box-shadow: 0 0 10px #ccc;
    &__title {
        font-size: 24px;
        font-weight: bold;
    }
  }
}
}

</style>