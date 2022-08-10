<template>
    <Modal v-if="showModal">
        <template #header>
            <h2>
                Add A New Team
            </h2>
        </template>
        <template #body>
            <ValidationObserver>
                <form>
                    <validation-provider
                    v-slot="{ errors }"
                    name="Username"
                    rules="required">
                        <label for="name">Team Name:</label>
                        <input type="text" id="name" v-model="newTeam.name" placeholder="Enter team title">
                        <span class="input-invalid-message">
                            {{ errors[0] }}
                        </span>
                    </validation-provider>
                    
                    <label for="storageRef">Team Logo</label>
                    <img v-if="newTeam.imageData" id="img-preview" alt="Team Logo">
                    <button v-if="!newTeam.storageRef" @click="launchImageFile" :disabled="newTeam.isUploadingImage"
                        type="button">
                        {{ newTeam.isUploadingImage ? 'Uploading...' : 'Upload' }}
                    </button>
                    <input ref="imageFile" @change.prevent="uploadImageFile($event.target.files)" type="file"
                        accept="image/png, image/jpeg" class="hidden">

                    <label for="player1">Player 1:</label>
                    <input type="text" id="player1" v-model="newTeam.player1" placeholder="Enter a name">
                    <label for="player2">Player 2:</label>
                    <input type="text" id="player2" v-model="newTeam.player2" placeholder="Enter a name">
                    <div class="submit-btn" @click="addTeam">
                        <Button class="submit-team">Submit</Button>
                    </div>
                </form>
            </ValidationObserver>
        </template>
    </Modal>
</template>

<script>
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { ValidationObserver, ValidationProvider } from "vee-validate";

export default {
    components: {
        ValidationObserver: ValidationObserver,
        ValidationProvider: ValidationProvider
    },
    data() {
        return {
            teams: [],
            newTeam: {
                name: "",
                player1: "",
                player2: "",
                imageUrl: "",
                createdAt: "",
                isUploadingImage: false,
                imageData: false,
                imgUrl: null,
            },
        };
    },
    methods: {
        toggleModal() {
            this.$store.commit("toggleModal");
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
        // add a new team to firestore database
        async addTeam(e) {
            e.preventDefault();

            console.log('submitted')
            const newTeam = {
                name: this.newTeam.name,
                imageUrl: this.newTeam.imgUrl,
                player1: this.newTeam.player1,
                player2: this.newTeam.player2,
                createdAt: new Date(),
            }
            this.newTeam.createdAt = new Date();
            this.$store.dispatch("addTeam", newTeam);
            this.newTeam.name = "";
            this.newTeam.player1 = "";
            this.newTeam.player2 = "";
            this.newTeam.createdAt = "";
            this.newTeam.imgUrl = null;
        },
    },
    computed: {
        showModal() {
            return this.$store.state.showModal;
        }
    },
    mounted() {
        console.log('mounted')
        // console.log($errors)

    }
}
</script>

<style scoped lang="scss">
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