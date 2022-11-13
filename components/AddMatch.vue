<template>
    <Modal v-if="showGameModal" id="add-game-modal">
        <template #header>
            <h2>
                Add A Game Results
            </h2>
        </template>
        <template #body>
            <ValidationObserver ref='observer' v-slot="{ handleSubmit }">
                <form @submit.prevent="handleSubmit(addMatch)">
                    <div class="form__wrapper">
                        <div class="form__block">
                            <validation-provider v-slot="{ errors }" name="selectedTeam1" rules="required">
                                <label for="selectedTeam1">
                                    Team 1
                                </label>
                                <v-select v-model="selectedTeam1" :options="selectableTeams" label="teamName"
                                    :searchable="false" placeholder="Select a team">
                                </v-select>
                                <span class="input-invalid-message">
                                    {{ errors[0] }}
                                </span>
                            </validation-provider>
                            <div class="team" v-if="selectedTeam1">
                                <div class="team__info">
                                    <div>Player 1: <strong>{{ selectedTeam1.player1.name }}</strong></div>
                                    <div class="team__points">
                                        <div class="title">
                                            Match Goals (0-9):
                                        </div>
                                        <div class="content">
                                            <validation-provider v-slot="{ errors }" name="player1Goals"
                                                rules="between:0,9|numeric|required">
                                                <div class="input__wrapper">
                                                    <button @click.prevent="decrement('player1Goals')">-
                                                    </button>
                                                    <input type="number" v-model="selectedTeam1.player1.currentScore">
                                                    <button @click.prevent="increment('player1Goals')">+
                                                    </button>
                                                </div>
                                                <div class="input-invalid-message">
                                                    {{ errors[0] }}
                                                </div>
                                            </validation-provider>
                                        </div>
                                    </div>
                                </div>
                                <div class="team__info">
                                    <div>Player 2: <strong>{{ selectedTeam1.player2.name }}</strong></div>
                                    <div class="team__points">
                                        <div class="title">
                                            Match Goals (0-9):
                                        </div>
                                        <div class="content">
                                            <validation-provider v-slot="{ errors }" name="player2Goals"
                                                rules="between:0,9|numeric|required">
                                                <div class="input__wrapper">
                                                    <button @click.prevent="decrement('player2Goals')">-
                                                    </button>
                                                    <input type="number" v-model="selectedTeam1.player2.currentScore">
                                                    <button @click.prevent="increment('player2Goals')">+
                                                    </button>
                                                </div>
                                                <div class="input-invalid-message">
                                                    {{ errors[0] }}
                                                </div>
                                            </validation-provider>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="form__block" v-if="selectedTeam1">
                            <validation-provider v-slot="{ errors }" name="selectedTeam1" rules="required">
                                <label for="selectedTeam1">
                                    Team 2
                                </label>
                                <v-select v-model="selectedTeam2"
                                    :options="selectableTeams.filter(team => team.id !== selectedTeam1.id)"
                                    label="teamName" :searchable="true" placeholder="Select a team">
                                </v-select>
                                <span class="input-invalid-message">
                                    {{ errors[0] }}
                                </span>
                            </validation-provider>
                            <div class="team" v-if="selectedTeam2">
                                <div class="team__info">
                                    <div>Player 1: <strong>{{ selectedTeam2.player1.name }}</strong></div>
                                    <div class="team__points">
                                        <div class="title">
                                            Match Goals (0-9):
                                        </div>
                                        <div class="content">
                                            <validation-provider v-slot="{ errors }" name="player3Goals"
                                                rules="between:0,9|numeric|required">
                                                <div class="input__wrapper">
                                                    <button @click.prevent="decrement('player3Goals')">-
                                                    </button>
                                                    <input type="number" v-model="selectedTeam2.player1.currentScore">
                                                    <button @click.prevent="increment('player3Goals')">+
                                                    </button>
                                                </div>
                                                <div class="input-invalid-message">
                                                    {{ errors[0] }}
                                                </div>
                                            </validation-provider>
                                        </div>
                                    </div>
                                </div>
                                <div class="team__info">
                                    <div>Player 2: <strong>{{ selectedTeam2.player2.name }}</strong></div>
                                    <div class="team__points">
                                        <div class="title">
                                            Match Goals (0-9):
                                        </div>
                                        <div class="content">
                                            <validation-provider v-slot="{ errors }" name="player4Goals"
                                                rules="between:0,9|numeric|required">
                                                <div class="input__wrapper">
                                                    <button @click.prevent="decrement('player4Goals')">-
                                                    </button>
                                                    <input type="number" v-model="selectedTeam2.player2.currentScore">
                                                    <button @click.prevent="increment('player4Goals')">+
                                                    </button>
                                                </div>
                                                <div class="input-invalid-message">
                                                    {{ errors[0] }}
                                                </div>
                                            </validation-provider>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Button class="submit-team">Submit</Button>
                </form>
            </ValidationObserver>
        </template>
    </Modal>
</template>

<script>
import { db } from "~/plugins/firebase.js";
import { collection, getDocs, doc, addDoc, writeBatch } from "firebase/firestore";
import vSelect from 'vue-select'
import { ValidationObserver, ValidationProvider, extend } from "vee-validate";
import toastr from "toastr";
import * as rules from 'vee-validate/dist/rules';

Object.keys(rules).forEach(rule => {
    extend(rule, rules[rule]);
});

extend('max_value', {
    validate: (value, args) => {
        return value < args[0];
    },
    params: ['max'],
    message: 'The max value is {max}'
});

extend('numeric', {
    validate: (value) => {
        return /^[0-9]+$/.test(value);
    },
    message: 'The {_field_} field can only contain numeric characters'
});

export default {
    components: {
        vSelect,
        ValidationObserver,
        ValidationProvider
    },
    data() {
        return {
            selectableTeams: [],
            selectableTeam: 'Choose team',
            selectedTeam1: {
                teamName: '',
                player1: {
                    teamId: '',
                    id: '',
                    name: '',
                    score: 0,
                    currentScore: 0
                },
                player2: {
                    teamId: '',
                    id: '',
                    name: '',
                    score: 0,
                    currentScore: 0
                },
                wins: 0,
                losses: 0,
            },
            selectedTeam2: {
                teamName: '',
                player1: {
                    teamId: '',
                    id: '',
                    name: '',
                    score: 0,
                    currentScore: 0
                },
                player2: {
                    teamId: '',
                    id: '',
                    name: '',
                    score: 0,
                    currentScore: 0
                },
                wins: 0,
                losses: 0,
            },
        }
    },
    methods: {
        async fetch() {
            let querySnapshot = await getDocs(collection(db, "teams"));
            querySnapshot.forEach((doc) => {
                let selectableTeam = doc.data();
                let selectableTeamId = doc.id;
                let selectableTeamWithId = {
                    ...selectableTeam,
                    id: selectableTeamId,
                }
                this.selectableTeams.push(selectableTeamWithId);
            });
        },
        // reset all fields
        async reset() {
            this.selectableTeam = 'Choose team';
            this.selectableTeams = []
            this.selectedTeam1 = {
                teamName: '',
                player1: {
                    name: '',
                    score: 0,
                    currentScore: 0
                },
                player2: {
                    name: '',
                    score: 0,
                    currentScore: 0
                },
            };
            this.selectedTeam2 = {
                teamName: '',
                player1: {
                    name: '',
                    score: 0,
                    currentScore: 0
                },
                player2: {
                    name: '',
                    score: 0,
                    currentScore: 0
                }
            };
        },
        toggleGameModal() {
            this.$store.commit('toggleGameModal');
        },
        increment(val) {
            this.$refs.observer.reset();
            if (val === 'player1Goals') {
                this.selectedTeam1.player1.currentScore++;
            } else if (val === 'player2Goals') {
                this.selectedTeam1.player2.currentScore++;
            } else if (val === 'player3Goals') {
                this.selectedTeam2.player1.currentScore++;
            } else if (val === 'player4Goals') {
                this.selectedTeam2.player2.currentScore++;
            }

            if (this.selectedTeam1.player1.currentScore + this.selectedTeam1.player2.currentScore > 9) {
                toastr.error('Total goals can not be more than 9');
                if (val === 'player1Goals') {
                    this.selectedTeam1.player1.currentScore--;
                } else if (val === 'player2Goals') {
                    this.selectedTeam1.player2.currentScore--;
                }

            }
            if (this.selectedTeam2.player1.currentScore + this.selectedTeam2.player2.currentScore > 9) {
                toastr.error('Total goals can not be more than 9');
                if (val === 'player3Goals') {
                    this.selectedTeam2.player1.currentScore--;
                } else if (val === 'player4Goals') {
                    this.selectedTeam2.player2.currentScore--;
                }
            }
        },
        decrement(val) {
            this.$refs.observer.reset();
            if (val === 'player1Goals') {
                this.selectedTeam1.player1.currentScore--;
            } else if (val === 'player2Goals') {
                this.selectedTeam1.player2.currentScore--;
            } else if (val === 'player3Goals') {
                this.selectedTeam2.player1.currentScore--;
            } else if (val === 'player4Goals') {
                this.selectedTeam2.player2.currentScore--;
            }

            if (this.selectedTeam1.player1.currentScore < 0) {
                this.selectedTeam1.player1.currentScore = 0;
            }
            if (this.selectedTeam1.player2.currentScore < 0) {
                this.selectedTeam1.player2.currentScore = 0;
            }
            if (this.selectedTeam2.player1.currentScore < 0) {
                this.selectedTeam2.player1.currentScore = 0;
            }
            if (this.selectedTeam2.player2.currentScore < 0) {
                this.selectedTeam2.player2.currentScore = 0;
            }


        },
        async addMatch() {
            this.$nextTick(() => {
                this.$nuxt.$loading.start()
            })
            // compare scores and add win to winning team
            if (this.selectedTeam1.player1.currentScore + this.selectedTeam1.player2.currentScore > this.selectedTeam2.player1.currentScore + this.selectedTeam2.player2.currentScore) {
                this.selectedTeam1.wins += 1;
                this.selectedTeam2.losses += 1;
            } else {
                this.selectedTeam1.losses += 1;
                this.selectedTeam2.wins += 1;
            }

            const docData = {
                team1: {
                    id: this.selectedTeam1.teamId,
                    name: this.selectedTeam1.teamName,
                    player1: this.selectedTeam1.player1,
                    player2: this.selectedTeam1.player2,
                    goals: parseInt(this.selectedTeam1.player1.currentScore) + parseInt(this.selectedTeam1.player2.currentScore),
                    wins: parseInt(this.selectedTeam1.wins),
                    losses: parseInt(this.selectedTeam1.losses),
                    data: this.selectedTeam2,
                    teamScore: parseInt(this.selectedTeam1.player1.currentScore) + parseInt(this.selectedTeam1.player2.currentScore),
                },
                team2: {
                    id: this.selectedTeam2.teamId,
                    name: this.selectedTeam2.teamName,
                    player1: this.selectedTeam2.player1,
                    player2: this.selectedTeam2.player2,
                    goals: parseInt(this.selectedTeam2.player1.currentScore) + parseInt(this.selectedTeam2.player2.currentScore),
                    wins: parseInt(this.selectedTeam2.wins),
                    losses: parseInt(this.selectedTeam2.losses),
                    data: this.selectedTeam2,
                    teamScore: parseInt(this.selectedTeam2.player1.currentScore) + parseInt(this.selectedTeam2.player2.currentScore),
                },
                match_date: new Date(),
                // add match winner
                winner: this.selectedTeam1.player1.currentScore + this.selectedTeam1.player2.currentScore > this.selectedTeam2.player1.currentScore + this.selectedTeam2.player2.currentScore ? this.selectedTeam1.teamName : this.selectedTeam2.teamName,
            };

            // use action js addMatch to set docData
            this.$store.dispatch('addMatch', docData);
            this.$store.dispatch('updateTeam', docData);

            const playersToUpdate = [
                this.selectedTeam1.player1,
                this.selectedTeam1.player2,
                this.selectedTeam2.player1,
                this.selectedTeam2.player2
            ];
            playersToUpdate.forEach(player => {
                const playerData = {
                    id: player.playerId,
                    goals: player.currentScore,
                    name: player.name,
                    wins: player.wins || null,
                    losses: player.losses || null,
                }
                this.$store.dispatch('updatePlayer', playerData);
            });
            // reset all fields
            this.reset();
            this.fetch();
            this.$nextTick(() => {
                this.$nuxt.$loading.finish()
            })
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
#add-game-modal {
    .modal {
        width: 100%;
        max-width: 600px;

        form {
            .form__wrapper {
                display: flex;
                gap: 48px;
            }

            .form__block {
                width: 100%;

                span {
                    width: 100%;
                    display: flex;
                    flex-direction: column;

                    label {
                        width: 100%;
                    }

                    .vs__selected {
                        text-align: left;
                        align-items: flex-start;
                    }

                    .vs__search {
                        display: none;
                    }
                }

                .v-select {
                    margin-top: 12px;
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

                .team {
                    width: 100%;

                    &__info {
                        display: flex;
                        flex-direction: column;
                        padding-top: 24px;
                        border-top: 1px solid $primary-400;
                        color: $primary-800;
                    }

                    &__points {
                        display: flex;
                        flex-direction: column;
                        justify-content: space-between;

                        .title {
                            margin-top: 8px;
                            font-size: 12px;
                            font-weight: bold;
                            color: $primary-500;
                        }

                        .content {
                            display: flex;
                            flex-direction: column;
                            width: 100%;

                            span {
                                display: flex;
                                flex-direction: column;

                                .input__wrapper {
                                    margin-top: 12px;
                                    padding-bottom: 12px;
                                    display: flex;
                                    flex-direction: row;
                                    justify-content: space-between;
                                }
                            }

                            span {
                                display: flex;
                                justify-content: center;
                                align-items: center;

                                button {
                                    width: 33.33%;
                                    padding: 0 12px;
                                    background-color: transparent;
                                    border: none;
                                    font-size: 24px;
                                    cursor: pointer;

                                    &:hover {
                                        color: $compliment-500;
                                    }
                                }
                            }

                            .input__wrapper {
                                display: flex;
                                justify-content: center;
                                align-items: center;
                                flex-direction: column;

                                input {
                                    min-height: 35px;
                                    display: flex;
                                    width: 100%;
                                    text-align: center;
                                    border: 1px solid $primary-300;
                                    border-radius: 5px;
                                    padding: 2px 32px;
                                }
                            }
                        }
                    }
                }
            }

            .submit-team {
                margin-top: 24px;
            }
        }
    }
}
</style>