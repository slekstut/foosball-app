<template>
    <Modal v-if="showGameModal">
        <template #header>
            <h2>
                Add A Game Results
            </h2>
        </template>

        <template #body>
            <form>
                <div class="form__block">
                    <div class="form__block">
                        <label for="selectedTeam1">
                            Team 1
                        </label>
                        <v-select v-model="selectedTeam1" :options="selectableTeams" label="name" :searchable="true"
                            placeholder="Select a team">
                        </v-select>
                        <div class="selected-team" v-if="selectedTeam1">
                            <div>
                                Player 1: {{ selectedTeam1.player1 }}
                            </div>
                            <div>
                                Player 2: {{ selectedTeam1.player2 }}
                            </div>
                        </div>

                    </div>
                    <div class="form__block">
                        <label for="selectedTeam2">
                            Team 2
                        </label>
                        <v-select v-model="selectedTeam2" :options="selectableTeams" label="name" :searchable="true"
                            placeholder="Select a team">
                        </v-select>
                    </div>
                    <div class="selected-team" v-if="selectedTeam2">
                        <div>
                            Player 1: {{ selectedTeam2.player1 }}
                        </div>
                        <div>
                            Player 2: {{ selectedTeam2.player2 }}
                        </div>
                    </div>
                </div>
                <Button class="submit-team">Submit</Button>
            </form>
        </template>
    </Modal>
</template>

<script>
import { db } from "~/plugins/firebase.js";
import { collection, getDocs } from "firebase/firestore";
import vSelect from 'vue-select'


export default {
    components: {
        vSelect
    },
    data() {
        return {
            selectableTeams: [],
            selectableTeam: 'Choose team',
            selectedTeam1: '',
            selectedTeam2: '',
        }
    },
    methods: {
        async fetch() {
            const querySnapshot = await getDocs(collection(db, "teams"));
            querySnapshot.forEach((doc) => {
                const selectableTeam = doc.data();
                const selectableTeamId = doc.id;
                const selectableTeamWithId = {
                    ...selectableTeam,
                    id: selectableTeamId,
                }
                this.selectableTeams.push(selectableTeamWithId);
            });
        },
        toggleGameModal() {
            this.$store.commit('toggleGameModal');
        }
    },
    computed: {
        showGameModal() {
            return this.$store.state.showGameModal;
        },

    },
    mounted() {
        this.fetch();
    },

}
</script>

<style lang="scss">
form {
.form__block {
    width: 100%;

    .v-select {
        min-width: 100%;
        width: 100%;
        display: flex;

        .vs__dropdown-toggle {
            width: 100%;
            min-height: 35px;

            .vs__actions {
                cursor: pointer;
            }
        }
    }
}

    .submit-team {
        margin-top: 24px;
    }
}
</style>