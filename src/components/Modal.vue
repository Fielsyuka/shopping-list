<template>
  <div class="c-modal">
    <div class="c-modal_overlay" @click="closeModal"></div>
    <div class="c-modal_content">
      <div v-if="isLogin">
        <h4 class="mb-5">My Account</h4>
        <div class="account_img">
          <!-- <input type="file" class="c-fileinput" name="photo" @change="updatePhoto"  accept="image/*" /> -->
          <!-- <img :src="user.photoURL" alt=""> -->
          <div class="circle"></div>
        </div>
        <div class="account_name">
          <p>{{ username }}</p>
          <span v-b-toggle.collapse-edit size="sm" variant="outline-dark" id="btn-edit" class="account_name_edit">[Edit]</span>
        </div>
        <b-collapse id="collapse-edit" class="mt-2">
          <b-card>
            <b-form @submit.prevent="updateName">
              <b-input-group>
                <b-form-input
                  id="name"
                  class="c-textinput"
                  v-model="form.name"
                  type="text"
                  required
                  placeholder="Enter user name"
                  autocomplete="new-password"
                >
                </b-form-input>
                <b-input-group-append>
                  <b-button type="submit" variant="outline-dark" size="sm">OK</b-button>
                </b-input-group-append>
              </b-input-group>
            </b-form>
          </b-card>
        </b-collapse>
        <b-button size="sm" variant="outline-dark" @click="signOut" class="mt-5">Signout</b-button>
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
      username: this.user.displayName,
      form: {
        email: '',
        password: '',
        name: '',
        image: ''
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
    updateName() {
      document.getElementById("btn-edit").click();
      let _this = this;
      let newName = this.form.name;

      firebase.auth().currentUser.updateProfile({
        displayName: newName
      }).then(function() {
        let user = firebase.auth().currentUser.providerData[0];
        _this.$emit('update-name', user);
        _this.username = newName;
        _this.form.name = "";
      }).catch(function(error) {
        console.log(error);
      });      
    },
    // updatePhoto(e) {
    //   const reader = new FileReader();
    //   reader.onload = e => {
    //     this.form.image = e.target.result;
    //   };
    //   reader.readAsDataURL(e.target.files[0]);

    //   let _this = this;
    //   let newPhoto = this.form.image;

    //   firebase.auth().currentUser.updateProfile({
    //     photoURL: newPhoto
    //   }).then(function() {
    //     let user = firebase.auth().currentUser.providerData[0];
    //     _this.$emit('update-photo', user);
    //   }).catch(function(error) {
    //     console.log(error);
    //   });      
    // },
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
.account_img {
  position: relative;
  }
.account_img > img {
  width: 20px;
  max-width: 100%;
  height: auto;
  margin: 0 auto;
}
.circle {
  width: 50px;
  height: 50px;
  margin-right: auto;
  margin-left: auto;
  border-radius: 50%;
  background-color: pink;
}
/*.c-fileinput {
  opacity: 0;
  cursor: pointer;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 10;
}*/
.account_name {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 14px;
  text-align: center;
}
.account_name > p {
  margin-bottom: 0;
  font-size: 18px;
}
.account_name_edit {
  margin-left: 4px;
  font-size: 12px;
}
.account_name_edit:hover {
  text-decoration: underline;
}
.buttons {
  margin-top: 14px;
}
.signout {
  cursor: pointer;
  margin-bottom: 0;
  text-decoration: underline;
}
.signout:hover {
  opacity: .8;
  text-decoration: none;
}

</style>