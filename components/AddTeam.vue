<template>
    <Modal v-if="showModal">
        <template #header>
            <h2>
                Add A New Team
            </h2>
        </template>
        <template #body>
            <form>
                <label for="name">Team Name:</label>
                <input type="text" id="name" v-model="newTeam.name" placeholder="Enter team title">

                <label for="storageRef">Team Logo</label>
                <!-- preview image here -->
                <div class="img-preview" v-if="newTeam.imageData">
                    <img id="img-preview" :src="newTeam.imageUrl" alt="Team Logo">
                </div>
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
                <Button class="submit-team" @click="addTeam, fetchTeams">Submit</Button>
            </form>
        </template>
    </Modal>
</template>

<script>
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

export default {
    data() {
        return {
            teams: [],
            newTeam: {
                name: "",
                imageUrl: "",
                player1: "",
                player2: "",
                score: "",
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
            // this.newTeam.imageData = event.target.files[0];
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

            const metadata = {
                contentType: file.type
            }

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
                        this.newTeam.isUploadingImage = false
                        this.newTeam.imageData = true;
                        this.newTeam.imgUrl = url
                        const img = document.getElementById('img-preview');
                        img.setAttribute('src', url);
                    })
            })
                .catch((error) => {
                    console.log(error);
                })

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