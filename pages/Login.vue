<template>
    <div class="container">
        <Nav></Nav>
        <h1>Login</h1>

        <div>
            <!-- import input component -->
            <!-- <Input label="Email" type="email" id="email"></Input> -->
            <!-- <Input label="Password" type="password" id="password"></Input> -->
            <input type="email" v-model="data.email">
            <input type="password" v-model="data.password">
            <!-- add Button component -->
            <button @click="login">Login</button>
        </div>
    </div>
</template>

<script>
import { auth } from "~/plugins/firebase.js";
import { getAuth, setPersistence, signInWithEmailAndPassword, browserSessionPersistence } from "firebase/auth";

export default {
    data: () => ({
        data: {
            email: "",
            password: "",
        }
    }),
    methods: {
        // setup firebase login function
        async login() {
            const data = {};
            data['email'] = this.email;
            data['password'] = this.password;
            try {
                await this.$fire.auth.signInWithEmailAndPassword(
                    data.email,
                    data.password
                );
                // set mutation setAuthenticatedUser to true
                this.$store.commit('setAuthenticatedUser', true);
                this.$router.push("/");
            } catch (e) {
                handleError(e);
            }
        },
    },
}

</script>