<template>
    <div>
        <section class="container">
            <Nav></Nav>
            <h1>Teams page</h1>
            <div class="cards">
                <div v-for="team in teams" :key="team.id" class="card">
                    <h2 class="card__title">{{ team.teamName }}</h2>
                    <div class="card__subtitle">
                        <h5>Team Score: {{ team.teamScore }}</h5>
                    </div>
                   <div class="card__text">
                    <div>{{ team.player1.name }}: {{ team.player1.score }}</div>
                    <div>{{ team.player2.name }}: {{ team.player2.score }}</div>
                   </div>
                    <div class="card__action">
                        <button class="btn btn-primary" @click="editTeam(team.id)">Edit</button>
                        <button class="btn btn-danger" @click="deleteTeam(team.id)">Delete</button>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import { db } from "~/plugins/firebase.js";
import { doc, setDoc, getDocs, collection, deleteDoc } from "firebase/firestore";

export default {
    data() {
        return {
            teams: [],
        };
    },
    methods: {
        async fetchTeams() {
            const teamsRef = getDocs(collection(db, "teams"));
            try {
                (await teamsRef).forEach((doc) => {
                    const team = doc.data();
                    team.id = doc.id;
                    this.teams.push(team);
                });
            } catch (e) {
                console.error(e);
            }
            console.log('teams', this.teams)
        },
        // async deleteTeam(id) {
        //     try {
        //         await deleteDoc(doc(db, "teams", id));

        //         this.teams = this.teams.filter(team => team.id !== id);
        //     } catch (e) {
        //         console.error(e);
        //     }
        // },
        // implement edit method 
        // async editTeam(id) {
        //     console.log("edit team");
        //     //modal to edit
        //     this.$store.commit('toggleModal');
        //     // preset modal input values existing team values
        //     this.$store.commit('setModalInputs', this.teams.find(team => team.id === id));

        //     const cityRef = doc(db, 'teams', id);
        //     setDoc(cityRef, { capital: true }, { merge: true });
        // }
    },
    created() {
        this.fetchTeams();
    }
}
</script>

<style scoped lang="scss">
.cards {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 16px;
    margin-top: 24px;

    .card {
        width: calc(33.33% - 12px);
        border: 1px solid $primary-800;

        &__title {
            margin-top: 12px;
        }

        &__subtitle {
            display: flex;
            justify-content: flex-start;
            gap: 12px;
            margin-top: 12px;
        }

        &__text {
            display: flex;
            flex-direction: column;
            margin-top: 12px;
        }

        &__action {
            margin-top: 24px;
            display: flex;
            gap: 12px;
        }
    }
}
</style>