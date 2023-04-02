import { defineStore } from "pinia";
import axios from "axios";
import jwt_decode from "jwt-decode";

const url = "http://localhost:5000";

export const useMainStore = defineStore("main", {
  state: () => ({
    /* User */
    userName: null,
    userEmail: null,
    userAvatar: null,

    /* Field focus with ctrl+k (to register only once) */
    isFieldFocusRegistered: false,

    /* Sample data (commonly used) */
    clients: [],
    history: [],
    loading: false,
    input: {
      nama: "",
      email: "",
      phone: "",
      category: "none",
      description: "",
    },
    user: {
      nama: "",
      email: "",
      password: "",
    },
    category: ["none", "Family", "Work", "School"],
    contacts: [],
    contact: {},
    user_id: "",
    notification: false,
    is_edit: false,
    is_delete: false,
  }),
  actions: {
    setUser(payload) {
      if (payload.name) {
        this.userName = payload.name;
      }
      if (payload.email) {
        this.userEmail = payload.email;
      }
      if (payload.avatar) {
        this.userAvatar = payload.avatar;
      }
    },
    fetch(sampleDataKey) {
      axios
        .get(`data-sources/${sampleDataKey}.json`)
        .then((r) => {
          if (r.data && r.data.data) {
            this[sampleDataKey] = r.data.data;
          }
        })
        .catch((error) => {
          alert(error.message);
        });
    },
    resetInput() {
      this.input = {
        nama: "",
        email: "",
        phone: "",
        category: "None",
        description: "",
      };
      this.user = {
        nama: "",
        email: "",
        password: "",
      };
    },
    async getContacts() {
      this.decodeToken();
      this.loading = true;
      this.contacts = [];
      try {
        await axios
          .post(`${url}/contacts`, {
            user_id: this.user_id,
          })
          .then((res) => {
            this.contacts = [...res.data.data];
            this.contacts.map((item) => {
              item,
                (item.avatar =
                  "https://avatars.dicebear.com/v2/gridy/Howell-Hand.svg");
            });
            this.loading = false;
          })
          .catch((err) => {
            console.log(err);
          });
      } catch (error) {
        console.log(error);
      }
    },
    async addContact() {
      this.decodeToken();
      this.loading = true;
      try {
        await axios
          .put(`${url}/contact`, {
            nama: this.input.nama,
            email: this.input.email,
            phone: this.input.phone,
            category: this.input.category,
            description: this.input.description,
            user_id: this.user_id,
          })
          .then((res) => {
            this.resetInput();
            this.getContacts();
            this.router.push("/");
            this.notification = true;
            setTimeout(() => {
              this.notification = false;
            }, 2000);
            this.loading = false;
          })
          .catch((err) => {
            console.log(err);
          });
      } catch (error) {
        console.log(error);
      }
    },
    async updateContact(id) {
      this.decodeToken();
      this.loading = true;
      try {
        await axios
          .patch(`${url}/contact`, {
            _id: id,
            user_id: this.user_id,
            nama: this.input.nama,
            email: this.input.email,
            phone: this.input.phone,
            category: this.input.category,
            description: this.input.description,
          })
          .then((res) => {
            this.resetInput();
            this.getContacts();
            this.is_edit = true;
            setTimeout(() => {
              this.is_edit = false;
            }, 2000);
            console.log(res);
            this.loading = false;
          })
          .catch((err) => {
            console.log(err);
          });
      } catch (error) {
        console.log(error);
      }
    },
    async getContact(id) {
      this.decodeToken();
      this.loading = true;
      try {
        await axios
          .post(`${url}/contact`, {
            _id: id,
            user_id: this.user_id,
          })
          .then((res) => {
            this.input = res.data.data;
            this.loading = false;
          })
          .catch((err) => {
            console.log(err);
          });
      } catch (error) {
        console.log(error);
      }
    },
    async deleteContact(id) {
      this.decodeToken();
      this.loading = true;
      try {
        await axios
          .delete(`${url}/contact`, {
            data: {
              _id: id,
              user_id: this.user_id,
            },
          })
          .then((res) => {
            this.resetInput();
            this.getContacts();
            this.is_delete = true;
            setTimeout(() => {
              this.is_delete = false;
            }, 2000);
            this.loading = false;
          })
          .catch((err) => {
            console.log(err);
          });
      } catch (err) {
        console.log(err);
      }
    },
    async register() {
      this.loading = true;
      try {
        await axios
          .post(`${url}/register`, {
            name: this.user.nama,
            email: this.user.email,
            password: this.user.password,
          })
          .then((res) => {
            this.resetInput();
            this.loading = false;
            this.router.push("/login");
          })
          .catch((err) => {
            console.log(err);
          });
      } catch (error) {
        console.log(error);
      }
    },
    async login() {
      this.loading = true;
      try {
        await axios
          .post(`${url}/login`, {
            email: this.user.email,
            password: this.user.password,
          })
          .then((res) => {
            this.loading = false;
            localStorage.setItem("token", res.data.data.token);
            this.router.push("/");
          })
          .catch((err) => {
            console.log(err);
          });
      } catch (error) {
        console.log(error);
      }
    },
    async logout() {
      localStorage.removeItem("token");
      this.router.push("/login");
    },
    decodeToken() {
      const token = localStorage.getItem("token");
      if (token) {
        const decoded = jwt_decode(token);
        this.user_id = decoded._id;
      }
    },
  },
});
