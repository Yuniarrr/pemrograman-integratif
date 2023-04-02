import { defineStore } from "pinia";
import axios from "axios";

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
      name: "",
      email: "",
      password: "",
      confirm: "",
    },
    category: ["None", "Family", "Work", "School"],
    contacts: [],
    contact: {},
    user_id: "64291b7ca36fb25f6b03c51a",
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
    },
    async getContacts() {
      this.loading = true;
      this.contacts = [];
      try {
        await axios
          .post(`${url}/contacts`, {
            user_id: "64291b7ca36fb25f6b03c51a",
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
      console.log(`id: ${id}`);
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
  },
});
