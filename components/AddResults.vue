<template>
    <Modal v-if="showGameModal">
        <template #header>
            <h2>
                Add A Game Results
            </h2>
        </template>
        <template #body>
            <ValidationObserver ref='observer'>
                <form>
                    <div class="form__block">
                        <div class="form__block">
                            <label for="selectedTeam1">
                                Team 1
                            </label>
                            <v-select v-model="selectedTeam1" :options="selectableTeams" label="teamName"
                                :searchable="true" placeholder="Select a team">
                            </v-select>
                            <div class="team" v-if="selectedTeam1">
                                <div class="team__info">
                                    <div>Player 1: <strong>{{ selectedTeam1.playerName1 }}</strong></div>
                                    <div class="team__points">
                                        <div class="title">
                                            Match Goals (0-9):
                                        </div>
                                        <div class="content">
                                            <span>
                                                <button @click.prevent="decrement('player1Goals')">-
                                                </button>
                                            </span>
                                            <validation-provider v-slot="{ errors }" name="player1Goals"
                                                rules="max_value:9|numeric">
                                                <div class="input__wrapper">
                                                    <input type="number" v-model="player1Goals">
                                                    <span class="input-invalid-message">
                                                        {{ errors[0] }}
                                                    </span>
                                                </div>
                                            </validation-provider>
                                            <span>
                                                <button @click.prevent="increment('player1Goals')">+
                                                </button>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div class="team__info">
                                    <div>Player 2: {{ selectedTeam1.playerName2 }} </div>
                                    <div>
                                        <div>
                                            Match Goals:
                                        </div>
                                        <div>
                                            <span><button @click.prevent="decrement('player2Goals')">-</button></span>
                                            <input type="number" :value="player2Goals">
                                            <span><button @click.prevent="increment('player2Goals')">+</button></span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div class="form__block">
                            <label for="selectedTeam2">
                                Team 2
                            </label>
                            <v-select v-model="selectedTeam2" :options="selectableTeams" label="teamName"
                                :searchable="true" placeholder="Select a team">
                            </v-select>
                        </div>
                        <div class="team" v-if="selectedTeam2">
                            <div class="team__info">
                                <div>Player 1: {{ selectedTeam2.playerName1 }}</div>
                                <div>Player 1 score: {{ selectedTeam2.playerScore1 }}</div>
                            </div>
                            <div class="team__info">
                                <div>Player 2: {{ selectedTeam2.playerName2 }}</div>
                                <div>Player 2 score: {{ selectedTeam2.playerScore2 }}</div>
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
import { collection, getDocs } from "firebase/firestore";
import vSelect from 'vue-select'
import { ValidationObserver, ValidationProvider, extend } from "vee-validate";
import { max_value, numeric } from 'vee-validate/dist/rules';
import toastr from "toastr";

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
            selectedTeam1: '',
            selectedTeam2: '',
            player1Goals: null,
            player2Goals: null
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
        },
        increment(val) {
            this.$refs.observer.reset();
            this[val] += 1;
            if (this[val] > 9) {
                this[val] = 9;
            } else if (this[val] < 0) {
                this[val] = 0;
            }
        },
        decrement(val) {
            this.$refs.observer.reset();
            this[val] -= 1;
            if (this[val] > 9) {
                this[val] = 9;
            } else if (this[val] < 0) {
                this[val] = 0;
            }
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

        .team {
            width: 100%;

            &__info {
                display: flex;
                flex-direction: column;
                gap: 12px;
                margin-top: 24px;
                padding-top: 24px;
                border-top: 1px solid $primary-400;
                color: $primary-800;
            }

            &__points {
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                gap: 12px;

                .title {
                    font-size: 12px;
                    font-weight: bold;
                    color: $primary-500;
                }

                .content {
                    display: flex;
                    justify-content: space-between;
                    width: 100%;

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
                            width: 33.33%;
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
</style>