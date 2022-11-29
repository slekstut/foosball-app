<template>
    <Modal v-if="showModal">
        <template #header-img>
            <img src="../assets/img/teams-icon.svg" alt="teams-icon.svg">
        </template>
        <template #header>
            <h2>
                Add A New Team
            </h2>
        </template>
        <template #body>
            <ValidationObserver v-slot="{ handleSubmit }" ref='observer'>
                <form @submit.prevent="handleSubmit(onSubmit)">
                    <div class="team__attr">
                        <validation-provider v-slot="{ errors }" name="Team Name" rules="required|min:3">
                            <div class="input__wrapper">
                                <label for="name">Team Name:</label>
                                <input type="text" id="name" v-model="teamName">
                                <span class="input-invalid-message">
                                    {{ errors[0] }}
                                </span>
                            </div>
                        </validation-provider>
                        <validation-provider v-slot="{ errors }" name="Team logo" rules="'mimes:image/*'">
                            <div class="input__wrapper">
                                <label for="storageRef">Team Logo</label>
                                <img :src="teamLogoUrl" :alt="teamName+'-logo'">
                                <img v-if="teamLogoUrl" id="img-preview" :alt="teamName+'-logo'">
                                <button v-if="!$store.state.editModalIsOpen" @click="launchImageFile"
                                    :disabled="team.isUploadingImage" type="button">
                                    {{ team.isUploadingImage ? 'Uploading...' : 'Add' }}
                                </button>
                                <button v-if="$store.state.editModalIsOpen" @click="launchImageFileEdit"
                                    :disabled="team.isUploadingImage" type="button">
                                    {{ team.isUploadingImage ? 'Uploading...' : 'Update' }}
                                </button>
                                <div v-if="!$store.state.editModalIsOpen">
                                    <input ref="imageFile" @change.prevent="uploadImageFile($event.target.files)"
                                    type="file" accept="image/png, image/jpeg" class="hidden">
                                </div>
                                <div v-if="$store.state.editModalIsOpen">
                                    <input ref="imageFileEdit" @change.prevent="uploadImageFileEdit($event.target.files)"
                                    type="file" accept="image/png, image/jpeg" class="hidden">
                                </div>
                                <span class="input-invalid-message">
                                    {{ errors[0] }}
                                </span>
                            </div>
                        </validation-provider>
                    </div>
                    <div class="players__attr">
                        <validation-provider v-slot="{ errors }" name="Player 1" rules="required|min:3|max:50">
                            <div class="input__wrapper">
                                <label for="player1">Player 1:</label>
                                <input type="text" id="player1" v-model="player1name">
                                <span class="input-invalid-message">
                                    {{ errors[0] }}
                                </span>
                            </div>
                        </validation-provider>
                        <validation-provider v-slot="{ errors }" name="Player 2" rules="required|min:3|max:50">
                            <div class="input__wrapper">
                                <label for="player2">Player 2:</label>
                                <input type="text" id="player2" v-model="player2name">
                                <span class="input-invalid-message">
                                    {{ errors[0] }}
                                </span>
                            </div>
                        </validation-provider>
                    </div>
                    <div class="submit-btn">
                        <Button class="submit-team">Submit</Button>
                    </div>
                </form>
            </ValidationObserver>
        </template>
    </Modal>
</template>

<script>
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { ValidationObserver, ValidationProvider, extend } from "vee-validate";
import { required, alpha_num } from 'vee-validate/dist/rules';
import { randomBytes } from "crypto";

extend('required', {
    ...required,
    message: 'This field is required'
});

extend('min', {
    validate(value, { length }) {
        return value.length >= length;
    },
    params: ['length'],
    message: 'This field must be at least {length} characters'
})

extend('max', {
    validate(value, { length }) {
        return value.length <= length;
    },
    params: ['length'],
    message: 'This field must be at most {length} characters'
})

extend('mimes', {
    validate(value, { mimes }) {
        return mimes.includes(value.type);
    },
    params: ['mimes'],
    message: 'This field must be a valid image'
})

export default {
    components: {
        ValidationObserver,
        ValidationProvider
    },
    data() {
        return {
            teams: [],
            team: {
                teamName: "",
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
        toggleModal() {
            this.$store.commit("toggleModal");
        },
        // add reset form
        resetForm() {
            this.team = {
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
            };
        },
        async onSubmit() {
            this.$nextTick(() => {
                this.$nuxt.$loading.start()
            })
            this.addTeam();
            this.$nextTick(() => {
                this.$nuxt.$loading.finish()
            })

        },
        launchImageFile() {
            this.$refs.imageFile.click()
        },
        // add launchImageFileEdit
        launchImageFileEdit() {
            alert('edit')
            this.$refs.imageFileEdit.click()

        },
        // add uploadImageFileEdit
        uploadImageFileEdit(files) {
            alert('from edit')
            this.team.isUploadingImage = true;
            const storage = getStorage();
            const storageRef = ref(storage, `teams/${this.team.teamName}/logo/${files[0].name}`);
            uploadBytes(storageRef, files[0]).then((snapshot) => {
                console.log('Uploaded a blob or file!');
            });
            getDownloadURL(storageRef).then((url) => {
                this.team.teamLogoUrl = url;
                this.team.isUploadingImage = false;
            });

        },

        uploadImageFile(files) {
            alert('test')

            if (!files.length) {
                return
            }

            const file = files[0]
            if (!file.type.match('image.*')) {
                alert('Please upload an image.')
                return
            }
            this.team.isUploadingImage = true
            const storage = getStorage();
            const storageRef = ref(storage, `images/${file.name}`);
            uploadBytes(storageRef, file).then((snapshot) => {
                getDownloadURL(ref(storage, `images/${file.name}`))
                    .then(url => {
                        this.team.imageData = true
                        this.team.imgUrl = url
                        setTimeout(() => {
                            const img = document.getElementById('img-preview');
                            img.setAttribute('src', url);
                            this.team.isUploadingImage = false
                        }, 1000)

                    })
            })
                .catch((error) => {
                    console.log(error);
                })

        },
        async addTeam() {
            const randomPlayer1Id = randomBytes(16).toString('hex');
            const randomPlayer2Id = randomBytes(16).toString('hex');
            const randomTeamId = randomBytes(16).toString('hex');

            // if no image was selected then add default image
            if (!this.team.imageData) {
                this.team.imgUrl = "https://firebasestorage.googleapis.com/v0/b/foosball-tracker-67dd0.appspot.com/o/images%2Fdefault-logo.png?alt=media&token=2baf78d9-d1ae-4e17-8e51-3ea14e20ce0f";
            }
            this.team.imageData = false;

            const team = {
                teamId: randomTeamId,
                teamName: this.team.teamName,
                teamLogoUrl: this.team.imgUrl,
                player1: {
                    playerId: randomPlayer1Id,
                    name: this.team.player1.name,
                    score: this.team.player1.score,
                    currentScore: this.team.player1.currentScore,
                },
                player2: {
                    playerId: randomPlayer2Id,
                    name: this.team.player2.name,
                    score: this.team.player2.score,
                    currentScore: this.team.player2.currentScore,
                },
                createdAt: new Date(),
                wins: 0,
                losses: 0,
                teamScore: 0
            }

            this.team.createdAt = new Date();
            this.$store.dispatch("addTeam", team);

            // collect new players for new collection in database
            const newPlayer1 = {
                playerId: randomPlayer1Id,
                playerName: this.team.player1.name,
                playerScore: this.team.player1.score
            }

            const newPlayer2 = {
                playerId: randomPlayer2Id,
                playerName: this.team.player2.name,
                playerScore: this.team.player2.score
            }

            this.$store.dispatch("addPlayers", newPlayer1);
            this.$store.dispatch("addPlayers", newPlayer2);
            this.$refs.observer.reset();
            //reset form
            this.resetForm();
        },
    },
    computed: {
        showModal() {
            return this.$store.state.showModal;
        },
        teamName: {
            get() {
                return this.$store.state.team.teamName;
            },
            set(value) {
                this.$store.commit('updateTeamName', value)
            }
        },
        player1name: {
            get() {
                return this.$store.state.team.player1.name;
            },
            set(value) {
                this.$store.commit('updateTeamPlayer1Name', value)
            }
        },
        player2name: {
            get() {
                return this.$store.state.team.player2.name;
            },
            set(value) {
                this.$store.commit('updateTeamPlayer2Name', value)
            }
        },
        teamLogoUrl: {
            get() {
                return this.$store.state.team.teamLogoUrl;
            },
            set(value) {
                this.$store.commit('updateTeamLogoUrl', value)
            }
        }
    },
}
</script>

<style scoped lang="scss">
.modal {
    form {
        display: flex;
        flex-direction: column;

        .input__wrapper {
            display: flex;
            flex-direction: column;
        }

        .submit-team {
            margin-top: 30px;
        }

        label {
            margin: 12px 0;
            font-weight: 600;
            color: $primary-500;
        }

        input {
            padding-bottom: 4px;
            border: none;
            border-bottom: 1px solid $primary-800;
            border-radius: 0;
            color: $primary-800;
        }

        input:focus {
            outline: none;
        }

        .team__attr,
        .players__attr {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            gap: 24px;

            &>* {
                width: 50%;
            }
        }

        .players__attr {
            gap: 0;
            flex-wrap: wrap;

            &>* {
                width: calc(50% - 12px);
            }
        }

        .input__wrapper {
            display: flex;
            justify-content: center;
            align-items: flex-start;

            img {
                max-width: 50px;
                max-height: 50px;
                width: 100%;
                height: auto;
            }
        }
    }
}
</style>