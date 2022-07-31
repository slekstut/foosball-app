<template>
    <div class="container">
        <div class="nav__wrapper">
            <div class="nav">
                <div class="menu">
                    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clip-path="url(#clip0_2_8)">
                            <path
                                d="M27.125 8.74999L0.875046 8.74999C0.392027 8.74999 6.85448e-05 8.35796 6.85026e-05 7.87501C6.84604e-05 7.39199 0.392099 7.00003 0.875045 7.00003L27.125 7.00003C27.608 7.00003 28 7.39206 28 7.87501C28 8.35796 27.608 8.74999 27.125 8.74999Z"
                                fill="#CACED3" />
                            <path
                                d="M0.875045 14.0473L27.125 14.0473C27.608 14.0473 28 14.4393 28 14.9222C28 15.4052 27.608 15.7972 27.125 15.7972L0.875046 15.7972C0.392027 15.7972 6.85448e-05 15.4052 6.85026e-05 14.9222C6.84604e-05 14.4393 0.392027 14.0473 0.875045 14.0473Z"
                                fill="#CACED3" />
                            <path
                                d="M0.875039 21.0945L18.375 21.0945C18.858 21.0945 19.25 21.4866 19.25 21.9695C19.25 22.4525 18.858 22.8445 18.375 22.8445L0.875039 22.8445C0.392021 22.8445 6.23013e-05 22.4525 6.2259e-05 21.9695C-1.02624e-05 21.4865 0.39202 21.0945 0.875039 21.0945Z"
                                fill="#CACED3" />
                        </g>
                        <defs>
                            <clipPath id="clip0_2_8">
                                <rect width="28" height="28" fill="white"
                                    transform="matrix(-1 8.74228e-08 8.74228e-08 1 28 0)" />
                            </clipPath>
                        </defs>
                    </svg>
                </div>
                <nav>
                    <ul>
                        <li><a href="#">Matches</a></li>
                        <li><a href="#">Teams</a></li>
                        <li><a href="#">Statistics</a></li>
                        <li class="add-team" @click="toggleGameModal"><a href="#">Add A Game</a></li>
                        <!-- <li><a href="#" @click="toggleModal">Add A New Team</a></li> -->
                    </ul>
                </nav>
            </div>
            <div class="search__wrapper">
                <div class="search__bar">
                    <input type="text" placeholder="Search Matches, Players, Stats ...">
                    <div class="search__button">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z"
                                stroke="#CACED3" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M21 21L16.65 16.65" stroke="#CACED3" stroke-width="2" stroke-linecap="round"
                                stroke-linejoin="round" />
                        </svg>
                    </div>
                </div>
            </div>
            <div class="customer">
                <div class="customer__action">
                    <div class="customer__notification">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M18 8C18 6.4087 17.3679 4.88258 16.2426 3.75736C15.1174 2.63214 13.5913 2 12 2C10.4087 2 8.88258 2.63214 7.75736 3.75736C6.63214 4.88258 6 6.4087 6 8C6 15 3 17 3 17H21C21 17 18 15 18 8Z"
                                stroke="#CACED3" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            <path
                                d="M13.73 21C13.5542 21.3031 13.3019 21.5547 12.9982 21.7295C12.6946 21.9044 12.3504 21.9965 12 21.9965C11.6496 21.9965 11.3054 21.9044 11.0018 21.7295C10.6982 21.5547 10.4458 21.3031 10.27 21"
                                stroke="#CACED3" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            <circle cx="18.5" cy="7.5" r="3.25" fill="#2ED06E" stroke="white" stroke-width="0.5" />
                        </svg>
                    </div>
                    <div class="customer__mail">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z"
                                stroke="#CACED3" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M22 6L12 13L2 6" stroke="#CACED3" stroke-width="2" stroke-linecap="round"
                                stroke-linejoin="round" />
                        </svg>
                    </div>
                    <div class="customer__saved">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M20.84 4.60999C20.3292 4.099 19.7228 3.69364 19.0554 3.41708C18.3879 3.14052 17.6725 2.99817 16.95 2.99817C16.2275 2.99817 15.5121 3.14052 14.8446 3.41708C14.1772 3.69364 13.5708 4.099 13.06 4.60999L12 5.66999L10.94 4.60999C9.9083 3.5783 8.50903 2.9987 7.05 2.9987C5.59096 2.9987 4.19169 3.5783 3.16 4.60999C2.1283 5.64169 1.54871 7.04096 1.54871 8.49999C1.54871 9.95903 2.1283 11.3583 3.16 12.39L4.22 13.45L12 21.23L19.78 13.45L20.84 12.39C21.351 11.8792 21.7563 11.2728 22.0329 10.6053C22.3095 9.93789 22.4518 9.22248 22.4518 8.49999C22.4518 7.77751 22.3095 7.0621 22.0329 6.39464C21.7563 5.72718 21.351 5.12075 20.84 4.60999V4.60999Z"
                                stroke="#CACED3" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                    </div>
                </div>
                <div class="customer__profile">
                    <div class="customer__avatar">
                        <img src="../assets/img/Ellipse 1.png" alt="llipse 1.png">
                        <div class="customer__info">
                            <a div="customer__name" href="#">Jane Doe</a>
                            <a class="customer__role" href="#">Foosball Player</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Modal v-if="showGameModal">
            <template #header>
                <h2>
                    Add A Game Results
                </h2>
            </template>
            <nuxt></nuxt>

            <template #body>
                <form>
                    <div class="form__block">
                        <label for="choose-team1">Select Team</label>
                        <select v-model="selectedTeam1" name="choose-team1" id="game-results">
                            <option value="" disavled>Choose A Team 1</option>
                            <option 
                            v-for="selectableTeam in selectableTeams" 
                            :key="selectableTeam.id" 
                            :value="selectableTeam"
                            >
                                {{ selectableTeam.name }}
                            </option>
                        </select>
                        <div class="form__block">
                                <div>
                                    {{ selectedTeam1.player1 }}
                                </div>
                                <div>
                                    {{ selectedTeam1.player2 }}
                                </div>
                        </div>
                    </div>
                    <div class="form__block">
                        <label for="choose-team2">Select Team</label>
                        <select v-model="selectedTeam2" :disabled="!selectedTeam1" name="choose-team2" id="game-results">
                            <option value="" disavled>Choose A Team 2</option>
                            <option
                            v-for="selectableTeam in selectableTeams.filter(team => team.id !== selectedTeam1.id)"
                            :key="selectableTeam.id" 
                            :value="selectableTeam"
                            >
                                {{ selectableTeam.name }}
                            </option>
                        </select>
                        <div class="form__block">
                                <div>
                                    {{ selectedTeam2.player1 }}
                                </div>
                                <div>
                                    {{ selectedTeam2.player2 }}
                                </div>
                        </div>
                    </div>
                    <Button class="submit-team">Submit</Button>
                </form>
            </template>
        </Modal>
    </div>
</template>

<script>
import { db } from "~/plugins/firebase.js";
import { collection, getDocs } from "firebase/firestore";

export default {
    data() {
        return {
            selectableTeams: [],
            selectableTeam: 'Choose team',
            selectedTeam1: '',
            selectedTeam2: '',
        }
    },
    name: 'Nav',
    methods: {
        toggleModal() {
            this.$store.commit('toggleModal');
        },
        toggleGameModal() {
            this.$store.commit('toggleGameModal');
        },
    },
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
    computed: {
        showGameModal() {
            return this.$store.state.showGameModal;
        }
    },
    mounted() {
        // this.getTeams();
        console.log(this.selectableTeams);
    }
};
</script>

<style scroped lang="scss">
.nav {
    display: flex;

    &__wrapper {

        display: flex;
        justify-content: space-between;
        align-items: center;

        nav {
            display: flex;

            ul {
                display: flex;
                align-items: center;
                list-style: none;
                padding-left: 0;
                padding: 48px 0 32px 0;

                li {
                    margin-right: 40px;

                    a {
                        color: $primary-500;
                        font-size: 18px;
                        line-height: 21px;
                        font-weight: 500;
                        transition: all .2s;
                        display: inline-block;
                        position: relative;

                        &:after {
                            content: '';
                            position: absolute;
                            width: 100%;
                            transform: scaleX(0);
                            height: 2px;
                            bottom: -4px;
                            left: 0;
                            background-color: $compliment-500;
                            transform-origin: bottom right;
                            transition: transform 0.25s ease-out;
                        }



                        &:hover {
                            &::after {
                                transform: scaleX(1);
                                transform-origin: bottom left;
                            }

                        }
                    }
                }
            }
        }

        .search {
            &__wrapper {
                display: flex;
            }

            &__bar {
                display: flex;
                position: relative;
                width: 400px;

                input {
                    width: 100%;
                    max-width: 656px;
                    padding: 12px 24px;
                    background: $secondary-500;
                    border: 1px solid $primary-400;
                    border-radius: 100px;

                    &::placeholder {
                        font-weight: 400;
                        font-size: 14px;
                        line-height: 16px;
                        color: $primary-450;
                    }

                    &:focus {
                        outline: none;
                        border: 1px solid $primary-500;
                    }
                }
            }

            &__button {
                position: absolute;
                top: 50%;
                right: 32px;
                transform: translateY(-50%);
                width: 32px;
                height: 32px;
                background: $secondary-500;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
            }
        }

        .customer {
            display: flex;

            &__action,
            &__profile {
                display: flex;
                align-items: center;
            }

            &__action {
                >* {
                    margin-right: 24px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
            }

            &__info {
                display: none;
            }
        }
    }

    .menu {
        display: none;
    }
}
</style>