<template>
    <div>
        <section class="container">
            <Nav></Nav>
            <h1>Teams page</h1>
            <div class="cards">
                <div v-for="team in teams" :key="team.id" class="card">
                    <div class="card__head">
                        <div class="card__image">
                            <img :src="team.teamLogoUrl" :alt="team.teamName">
                        </div>
                        <h2 class="card__title">{{ team.teamName }}</h2>
                    </div>
                    <div class="card__subtitle">
                        <h5>Team Score: {{ team.teamScore }}</h5>
                    </div>
                    <div class="card__text">
                        <div>{{ team.player1.name }}: {{ team.player1.score }}</div>
                        <div>{{ team.player2.name }}: {{ team.player2.score }}</div>
                    </div>
                    <div class="card__action">
                        <button class="btn btn-primary" @click="editTeam(team.id), changeModalState()">Edit</button>
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
    name: "Teams",
    data() {
        return {
            teams: [],
            team: {
                teamName: '',
                player1: {
                    name: "",
                    score: 0,
                    currentScore: 0,
                    imgUrl: null,
                    isUploadingImage: false,
                    imageData: false,
                },
                player2: {
                    name: "",
                    score: 0,
                    currentScore: 0,
                    imgUrl: null,
                    isUploadingImage: false,
                    imageData: false,
                },
                teamLogoUrl: "",
                createdAt: "",
                isUploadingImage: false,
                imageData: false,
                imgUrl: null,
                wins: 0,
                losses: 0,
            },
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
        },
        async deleteTeam(id) {
            try {
                await deleteDoc(doc(db, "teams", id));
                this.teams = this.teams.filter(team => team.id !== id);
            } catch (e) {
                console.error(e);
            }
        },
        // implement edit team with modal
        async editTeam(id) {
            const team = this.teams.find(team => team.id === id);
            this.$store.dispatch('editModalIsOpen', true);
            this.$store.dispatch('setModalTitle', 'Edit Modal');
            this.$store.dispatch('setModalInputsForEdit', team)
        },
        changeModalState() {
            this.$store.commit('toggleModal')
        }
    },
    computed: {
    },
    created() {
        this.fetchTeams();
    }
}
</script>

<style lang="scss">
.container {

    .cards {
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;
        gap: 16px;
        margin: 48px 0;

        .card {
            width: calc(33.33% - 12px);
            padding: 24px;
            border: 1px solid $primary-800;
            border-radius: 8px;

            &:hover {
                transform: scale(1.02);
            }

            &__head {
                display: flex;
                align-items: center;
                gap: 12px;
            }

            &__image {
                max-width: 46px;
            }

            &__subtitle {
                display: flex;
                justify-content: flex-start;
                gap: 12px;
                margin-top: 12px;

                h5 {
                    font-size: 20px;
                }
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
}
</style>