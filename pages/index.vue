<template>
  <section class="container">
    <Nav></Nav>
    <div class="home">
      <LeftSidebar></LeftSidebar>
      <div class="main__content">
      <Banner></Banner>
      <LatestMatches></LatestMatches>
      </div>
    </div>
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
import LatestMatches from '../components/LatestMatches.vue';

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
    },
    computed: {
        showModal() {
            return this.$store.state.showModal;
        }
    },
    components: { LeftSidebar, LatestMatches }
};
</script>
<style scoped lang="scss">
.container {
  padding-left: 0;

  .home {
    display: flex;
    gap: 48px;
    .main__content {
      display: flex;
      flex-direction: column;
    }
  }
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
      border-bottom: 1px solid $primary-400;
      padding-bottom: 4px;
    }

    input:focus {
      outline: none;
    }
  }
}
</style>
