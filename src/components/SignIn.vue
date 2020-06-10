<template>
  <div id="modalSignIn" class="c-modal_content">
    <h3 class="mb-4">ログイン</h3>
    <b-form @submit.prevent="signIn" @reset.prevent="onReset">
      <b-form-group
        id="input-email"
        class="text-left"
        label="メールアドレス:"
        label-for="email"
      >
        <b-form-input
          id="email"
          class="c-textinput"
          v-model="form.email"
          type="email"
          required
          placeholder="Enter email"
          autocomplete="new-password"
        ></b-form-input>
      </b-form-group>
      <b-form-group
        id="input-password"
        class="text-left"
        label="パスワード:"
        label-for="password"
      >
        <b-form-input
          id="password"
          class="mb-5 c-textinput"
          v-model="form.password"
          type="password"
          required
          placeholder="Enter password"
          autocomplete="new-password"
        ></b-form-input>
      </b-form-group>

      <b-button type="submit" class="mr-3" variant="primary">Submit</b-button>
      <b-button type="reset" variant="secondary">Reset</b-button>
    </b-form>
  </div>
</template>

<script>
import firebase from "firebase/app"
import 'firebase/app'
import 'firebase/auth';
export default {
  name: 'LogIn',
  data () {
    return {
      form: {
        email: '',
        password: '',
      }
    }
  },
  methods: {
    closeModal() {
      this.$emit('close-modal');
    },
    authUser(user) {
      this.$emit('auth-user', user);
    },
    signIn() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.form.email, this.form.password)
        .then( (user) => {
          this.authUser(user);
        })
        .catch(error => {
          // ログインに失敗した場合
          alert(error.message);
        });
    },
    onReset() {
      this.form.email = ''
      this.form.password = ''
    }
  }
}
</script>

<style lang="css" scoped>
.c-modal {
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 9999;
}
.c-modal_overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,.6);
  z-index: 9000;
}
.c-modal_content {
  overflow: auto; 
  width: 90%;
  height: auto;
  max-width: 380px;
  max-height: calc(100% - 50px);
  padding: 40px 30px;
  background-color: #fff;
  z-index: 9000;
}
.c-textinput {
  background-color: #fff8f2;
}

</style>