<template>
  <section class="container">
    <Nav></Nav>
    <LeftSidebar></LeftSidebar>
    <Teams></Teams>
    <Modal v-if="showModal">
      <template #header>
        <h2>
          Add A New Team
        </h2>
      </template>
      <nuxt></nuxt>
      <template #body>
        <form>
          <label for="name">Team Name:</label>
          <input type="text" id="name" v-model="newTeam.name" placeholder="Enter team title">
          <label for="player1">Player 1:</label>
          <input type="text" id="player1" v-model="newTeam.player1" placeholder="Enter a name">
          <label for="player2">Player 2:</label>
          <input type="text" id="player2" v-model="newTeam.player2" placeholder="Enter a name">
          <Button class="submit-team" @click="addTeam, fetchTeams">Submit</Button>
        </form>
      </template>
    </Modal>
  </section>
</template>
<script>
import LeftSidebar from '../components/LeftSidebar.vue';
// import { db } from "~/plugins/firebase.js";
// import { doc, setDoc, getDocs, collection, Timestamp } from "firebase/firestore";
// import { Store } from "vuex";

export default {
    data() {
        return {
            teams: [],
            newTeam: {
                name: "",
                player1: "",
                player2: "",
                score: "",
                createdAt: ""
            },
        };
    },
    methods: {
        toggleModal() {
            this.$store.commit("toggleModal");
        },
        // fetchTeams() {
        //   this.$store.dispatch('fetchTeams');
        //   console.log('fetch from methods')
        // }
    },
    computed: {
        showModal() {
            return this.$store.state.showModal;
        }
    },
    components: { LeftSidebar }
};
</script>
<style scoped lang="scss">
.container {
  padding-left: 0;
}
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
