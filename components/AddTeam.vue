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
                    <validation-provider v-slot="{ errors }" name="Team Name" rules="required|min:3">
                        <div class="input__wrapper">
                            <label for="name">Team Name:</label>
                            <input type="text" id="name" v-model="newTeam.teamName">
                            <span class="input-invalid-message">
                                {{ errors[0] }}
                            </span>
                        </div>
                    </validation-provider>
                    <validation-provider v-slot="{ errors }" name="Team logo" rules="'mimes:image/*'">
                        <div class="input__wrapper">
                            <label for="storageRef">Team Logo</label>
                            <img v-if="newTeam.imageData" id="img-preview" alt="Team Logo">
                            <button v-if="!newTeam.storageRef" @click="launchImageFile"
                                :disabled="newTeam.isUploadingImage" type="button">
                                {{ newTeam.isUploadingImage ? 'Uploading...' : 'Upload' }}
                            </button>
                            <input ref="imageFile" @change.prevent="uploadImageFile($event.target.files)" type="file"
                                accept="image/png, image/jpeg" class="hidden">
                            <span class="input-invalid-message">
                                {{ errors[0] }}
                            </span>
                        </div>
                    </validation-provider>

                    <validation-provider v-slot="{ errors }" name="Player 1" rules="required|min:3|max:50">
                        <div class="input__wrapper">
                            <label for="player1">Player 1:</label>
                            <input type="text" id="player1" v-model="newTeam.player1.name">
                            <span class="input-invalid-message">
                                {{ errors[0] }}
                            </span>
                        </div>
                    </validation-provider>
                    <validation-provider v-slot="{ errors }" name="Player 2" rules="required|min:3|max:50">
                        <div class="input__wrapper">
                            <label for="player2">Player 2:</label>
                            <input type="text" id="player2" v-model="newTeam.player2.name">
                            <span class="input-invalid-message">
                                {{ errors[0] }}
                            </span>
                        </div>
                    </validation-provider>
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
import toastr from "toastr";
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
            newTeam: {
                teamName: "",
                player1: {
                    name: "",
                    score: 0
                },
                player2: {
                    name: "",
                    score: 0
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
        async onSubmit() {
            this.$nextTick(() => {
                this.$nuxt.$loading.start()
                setTimeout(() => {
                    this.$nuxt.$loading.finish();
                    toastr.success('Team Added Successfully');
                }
                    , 2000)
            })
            this.addTeam();
        },
        launchImageFile() {
            this.$refs.imageFile.click()
        },
        uploadImageFile(files) {
            if (!files.length) {
                return
            }
            const file = files[0]

            if (!file.type.match('image.*')) {
                alert('Please upload an image.')
                return
            }

            // const metadata = {
            //     contentType: file.type
            // }

            this.newTeam.isUploadingImage = true

            // Create a reference to the destination where we're uploading
            // the file.
            const storage = getStorage();
            const storageRef = ref(storage, `images/${file.name}`);

            // 'file' comes from the Blob or File API
            uploadBytes(storageRef, file).then((snapshot) => {
                console.log('Uploaded a blob or file!');
                getDownloadURL(ref(storage, `images/${file.name}`))
                    .then(url => {
                        this.newTeam.imageData = true
                        this.newTeam.imgUrl = url
                        setTimeout(() => {
                            const img = document.getElementById('img-preview');
                            img.setAttribute('src', url);
                            this.newTeam.isUploadingImage = false
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

            const newTeam = {
                teamName: this.newTeam.teamName,
                teamLogoUrl: this.newTeam.imgUrl,
                player1: {
                    playerId: randomPlayer1Id,
                    name: this.newTeam.player1.name,
                    score: this.newTeam.player1.score
                },
                player2: {
                    playerId: randomPlayer2Id,
                    name: this.newTeam.player2.name,
                    score: this.newTeam.player2.score
                },
                createdAt: new Date(),
            }
            this.newTeam.createdAt = new Date();
            this.$store.dispatch("addTeam", newTeam);


            // collect new players for new collection in database
            const newPlayer1 = {
                playerId: randomPlayer1Id,
                playerName: this.newTeam.player1.name,
                playerScore: this.newTeam.player1.score
            }

            const newPlayer2 = {
                playerId: randomPlayer2Id,
                playerName: this.newTeam.player2.name,
                playerScore: this.newTeam.player2.score
            }

            this.$store.dispatch("addPlayers", newPlayer1);
            this.$store.dispatch("addPlayers", newPlayer2);
            this.$refs.observer.reset();
            this.newTeam.teamName = "";
            this.newTeam.player1 = {
                name: "",
                score: 0
            };
            this.newTeam.player2 = {
                name: "",
                score: 0
            };
            this.newTeam.createdAt = "";
            this.newTeam.imgUrl = null;
        },
    },
    computed: {
        showModal() {
            return this.$store.state.showModal;
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