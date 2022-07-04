<template>
  <section class="container">
    <Nav></Nav>
    <Teams></Teams>
    <Modal v-if="showModal">
      <template #header>
        <h2>
          Add A New Team
        </h2>
      </template>
      <template #body>
        <form @submit.prevent="addTeam">
          <label for="name">Team Name:</label>
          <input type="text" id="name" v-model="newTeam.name" placeholder="Enter team title">
          <label for="player1">Player 1:</label>
          <input type="text" id="player1" v-model="newTeam.player1" placeholder="Enter a name">
          <label for="player2">Player 2:</label>
          <input type="text" id="player2" v-model="newTeam.player2" placeholder="Enter a name">
          <Button class="submit-team" @click="toggleModal">Submit</Button>
        </form>
      </template>
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
    toggleModal() {
        this.$store.commit('toggleModal');
        },
  },
  computed: {
    showModal() {
      return this.$store.state.showModal;
    }
  },
  mounted() {
    this.fetchTeams();
  },
};
</script>
<style scoped lang="scss">
.modal {
  form {
    display: flex;
    flex-direction: column;

    .submit-team {
      margin-top: 30px;
    }
    label {
      margin: 12px 0;
      font-weight: 600;
    }
    input {
      border: none;
      border-bottom: 1px solid $soft-gray;
      padding-bottom: 4px;
    }
    input:focus {
      outline: none;
    }
  }
}
</style>
