<template>
    <div class="container">
        <Nav></Nav>
        <h1>Login</h1>

        <div>
            <!-- import input component -->
            <!-- <Input label="Email" type="email" id="email"></Input> -->
            <!-- <Input label="Password" type="password" id="password"></Input> -->
            <input type="email" v-model="email">
            <input type="password" v-model="password">
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
        email: "",
        password: "",
    }),
    methods: {
        // setup firebase login function
        async login() {
            // dispatch login action
            this.$store.dispatch("login", { email: this.email, password: this.password });
        },
    },
    mounted:
        function () {
            console.log("mounted")
            this.$fire.auth.onAuthStateChanged((user) => {
                if (user) {
                    console.log("user logged in");

                    // this.$router.push("/");
                } else {
                    console.log("user logged out");
                }
            });
        }
}

</script>