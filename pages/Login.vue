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
        login() {
            const auth = getAuth();
            setPersistence(auth, browserSessionPersistence)
                .then(() => {
                    console.log("Persistence set:", auth);

                    // dispatch actions onAuthStateChangedAction
                    // this.$store.dispatch("onAuthStateChangedAction", auth);

                    return signInWithEmailAndPassword(auth, this.email, this.password)
                        .then((userCredential) => {
                            // Signed in
                            alert("Login Success");
                            const user = userCredential.user;
                            console.log('user', user)
                            // this.$store.dispatch("onAuthStateChangedAction", user.auth, user.accessToken);
                            // dispatch onAuthStateChangedAction
                            // redirect to home page
                        })
                        .catch((error) => {
                            alert("Login Failed");
                            const errorCode = error.code;
                            const errorMessage = error.message;
                        });
                })
                .catch((error) => {
                    // Handle Errors here.
                    const errorCode = error.code;
                    const errorMessage = error.message;
                });
        },
}
    }

</script>