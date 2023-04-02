<script setup>
import { useRouter } from "vue-router";
import { mdiAccount, mdiAsterisk, mdiMail } from "@mdi/js";
import SectionFullScreen from "@/components/SectionFullScreen.vue";
import CardBox from "@/components/CardBox.vue";
import FormField from "@/components/FormField.vue";
import FormControl from "@/components/FormControl.vue";
import BaseButton from "@/components/BaseButton.vue";
import BaseButtons from "@/components/BaseButtons.vue";
import LayoutGuest from "@/layouts/LayoutGuest.vue";

import { useMainStore } from "@/stores/main.js";
const mainStore = useMainStore();

const router = useRouter();

const submit = () => {
  router.push("/");
};
</script>

<template>
  <LayoutGuest>
    <SectionFullScreen v-slot="{ cardClass }" bg="purplePink">
      <CardBox :class="cardClass" is-form @submit.prevent="submit">
        <FormField label="Username" help="Please enter your username">
          <FormControl
            v-model="mainStore.user.name"
            :icon="mdiAccount"
            name="login"
            autocomplete="username"
            placeholder="name"
          />
        </FormField>

        <FormField label="Username" help="Please enter your email">
          <FormControl
            v-model="mainStore.user.email"
            :icon="mdiMail"
            name="login"
            autocomplete="username"
            placeholder="name"
          />
        </FormField>

        <FormField label="Password" help="Please enter your password">
          <FormControl
            v-model="mainStore.user.password"
            :icon="mdiAsterisk"
            type="password"
            name="password"
            autocomplete="current-password"
            placeholder="********"
          />
        </FormField>

        <FormField label="Confirm Password" help="Please enter your password">
          <FormControl
            v-model="mainStore.user.confirm"
            :icon="mdiAsterisk"
            type="password"
            name="password"
            autocomplete="current-password"
            placeholder="********"
          />
        </FormField>

        <template #footer>
          <BaseButtons class="flex justify-center">
            <BaseButton type="submit" color="info" label="Register" />
            <BaseButton to="/" color="info" outline label="Back" />
          </BaseButtons>
        </template>
      </CardBox>
    </SectionFullScreen>
  </LayoutGuest>
</template>
