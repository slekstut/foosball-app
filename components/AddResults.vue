<template>
    <Modal v-if="showGameModal">
        <template #header>
            <h2>
                Add A Game Results
            </h2>
        </template>
        <template #body>
            <ValidationObserver ref='observer' v-slot="{ handleSubmit }">
                <form @submit.prevent="handleSubmit(onSubmit)">
                    <div class="form__wrapper">
                        <div class="form__block">
                            <validation-provider v-slot="{ errors }" name="selectedTeam1" rules="required">
                                <label for="selectedTeam1">
                                    Team 1
                                </label>
                                <v-select v-model="selectedTeam1"
                                    :options="selectableTeams.filter(team => team.id !== selectedTeam2.id)"
                                    label="teamName" :searchable="false" placeholder="Select a team">
                                </v-select>
                                <span class="input-invalid-message">
                                    {{ errors[0] }}
                                </span>
                            </validation-provider>
                            <div class="team" v-if="selectedTeam1">
                                <div class="team__info">
                                    <div>Player 1: <strong>{{ selectedTeam1.playerName1 }}</strong></div>
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
                                                    <input type="number" v-model="player1Goals">
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
                                    <div>Player 2: <strong>{{ selectedTeam1.playerName2 }}</strong></div>
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
                                                    <input type="number" v-model="player2Goals">
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
                                :options="selectableTeams.filter(team => team.id !== selectedTeam1.id)" label="teamName"
                                :searchable="true" placeholder="Select a team">
                            </v-select>
                            <span class="input-invalid-message">
                                    {{ errors[0] }}
                                </span>
                            </validation-provider>
                            <div class="team" v-if="selectedTeam2">
                                <div class="team__info">
                                    <div>Player 1: <strong>{{ selectedTeam2.playerName1 }}</strong></div>
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
                                                    <input type="number" v-model="player3Goals">
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
                                    <div>Player 2: <strong>{{ selectedTeam2.playerName2 }}</strong></div>
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
                                                    <input type="number" v-model="player4Goals">
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
import { collection, getDocs } from "firebase/firestore";
import vSelect from 'vue-select'
import { ValidationObserver, ValidationProvider } from "vee-validate";
import toastr from "toastr";

import { extend } from 'vee-validate';
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
            selectedTeam1: '',
            selectedTeam2: '',
            player1Goals: null,
            player2Goals: null,
            player3Goals: null,
            player4Goals: null
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
        // at closing modal, reset all fields
        reset() {
            this.selectableTeam = 'Choose team';
            this.selectedTeam1 = '';
            this.selectedTeam2 = '';
            this.player1Goals = null;
            this.player2Goals = null;
            this.player3Goals = null;
            this.player4Goals = null;
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
            // check if total sum goals are not more than 9
            if (this.player1Goals + this.player2Goals > 9) {
                this[val] -= 1;
                toastr.error('Total goals can not be more than 9');
            }
            if (this.player3Goals + this.player4Goals > 9) {
                this[val] -= 1;
                toastr.error('Total goals can not be more than 9');
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
            if (this.player1Goals + this.player2Goals > 9) {
                this[val] -= 1;
                toastr.error('Total goals can not be more than 9');
            }
            if (this.player3Goals + this.player4Goals > 9) {
                this[val] -= 1;
                toastr.error('Total goals can not be more than 9');
            }
        },
        onSubmit() {
            alert('Submitted')
        }

    },
    computed: {
        showGameModal() {
            this.reset();
            return this.$store.state.showGameModal;
        },

    },
    mounted() {
        this.fetch();
    },

}
</script>

<style lang="scss">
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
                display: flex;
                flex-direction: column;
            }

            .v-select {
                margin-top: 12px;
                min-width: 150px;
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
</style>