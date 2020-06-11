<template>
  <div class="c-modal">
    <div class="c-modal_overlay" @click="closeModal"></div>
    <div class="c-modal_content">
      <div v-if="isLogin">
        <h4 class="mb-4">My Account</h4>
        <div class="account_name">
          <p>{{ user.displayName }}</p>
          <b-button v-b-toggle.collapse-name size="sm" variant="outline-dark" id="btn-edit" >Edit</b-button>          
        </div>
        <b-collapse id="collapse-name">
          <b-card>
            <b-form @submit.prevent="updateProfile">
              <b-input-group>
                <b-form-input
                  id="name"
                  class="c-textinput"
                  v-model="form.name"
                  type="text"
                  required
                  placeholder="Enter new user name"
                  autocomplete="new-password"
                >
                </b-form-input>
                <b-input-group-append>
                  <b-button type="submit" variant="outline-success" size="sm">OK</b-button>
                </b-input-group-append>
              </b-input-group>
            </b-form> 
          </b-card>
        </b-collapse>

        <p class="signout" @click="signOut">Signout</p>
      </div>
      <div v-else>
        <h4 class="mb-4">ログイン</h4>
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
    </div>
  </div>
</template>

<script>
import firebase from "firebase/app"
import 'firebase/app'
import 'firebase/auth';
export default {
  name: 'Modal',
  props: {
    isLogin: Boolean,
    user: Object
  },
  data () {
    return {
      form: {
        email: '',
        password: '',
        name: '',
      }
    }
  },
  methods: {
    closeModal() {
      this.$emit('close-modal');
    },
    authUser() {
      this.$emit('auth-user');
    },
    signIn() {
      firebase.auth()
        .signInWithEmailAndPassword(this.form.email, this.form.password)
        .then( () => {
          this.authUser();
        })
        .catch(error => {
          alert(error.message);
        });
    },
    onReset() {
      this.form.email = ''
      this.form.password = ''
    },
    signOut() {
      this.$emit('sign-out');
    },
    updateProfile() {
      document.getElementById("btn-edit").click();
      let newName = this.form.name;
      this.$emit('update-profile', newName);
      this.form.name = "";
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
  background-color: #fff7f3;
}
.account_name {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 14px;
}
.account_name > p {
  margin-bottom: 0;
  font-size: 18px;
}
.signout {
  cursor: pointer;
  margin-top:20px;
  margin-bottom: 0;
  text-decoration: underline;
}
.signout:hover {
  opacity: .8;
  text-decoration: none;
}

</style>