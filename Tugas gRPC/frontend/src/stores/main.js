import { defineStore } from "pinia";
import axios from "axios";
// import { ContactServiceClient } from "../protos/contacts_grpc_web_pb.d.ts";
import { Client } from "grpc-web";

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
    input: {
      name: "",
      email: "",
      phone: "",
      category: "None",
      description: "",
    },
    contacts: [],
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
        name: "",
        email: "",
        phone: "",
        category: "None",
        description: "",
      };
    },
    addContact() {
      // let contact = new Contacts({
      //   nama: this.input.name,
      //   email: this.input.email,
      //   phone: this.input.phone,
      //   category: this.input.category,
      //   description: this.input.description,
      // });
      // const client = new ContactServiceClient("http://localhost:50051");
      // client.addContact(contact, {}, (err, response) => {
      //   if (err) {
      //     console.log(err);
      //     return;
      //   }
      //   console.log(response);
      // });
    },
  },
});
