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
                <button v-if="!newTeam.storageRef" @click="launchImageFile" :disabled="isUploadingImage" type="button">
                    {{ isUploadingImage ? 'Uploading...' : 'Upload' }}
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
import { getStorage, ref, uploadBytes } from "firebase/storage";

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
                createdAt: ""
            },
            isUploadingImage: false
        };
    },
    methods: {
        toggleModal() {
            this.$store.commit("toggleModal");
        },
        launchImageFile() {
            // Trigger the file input click event.
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

            const metadata = {
                contentType: file.type
            }

            this.isUploadingImage = true

            // Create a reference to the destination where we're uploading
            // the file.
            const storage = getStorage();
            const storageRef = ref(storage, `images/${file.name}`);

            // 'file' comes from the Blob or File API
            uploadBytes(storageRef, file).then((snapshot) => {
                console.log('Uploaded a blob or file!');
            });

            // const uploadTask = storageRef.put(file, metadata).then((snapshot) => {
            //     // Once the image is uploaded, obtain the download URL, which
            //     // is the publicly accessible URL of the image.
            //     return snapshot.ref.getDownloadURL().then((url) => {
            //         return url
            //     })
            // }).catch((error) => {
            //     console.error('Error uploading image', error)
            // })

            // When the upload ends, set the value of the team image URL
            // and signal that uploading is done.
            // uploadTask.then((url) => {
            //     this.newTeam.imageUrl = url
            //     this.isUploadingImage = false
            // })
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