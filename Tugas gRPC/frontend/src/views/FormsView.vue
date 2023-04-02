<script setup>
import { reactive, ref } from "vue";
import {
  mdiBallotOutline,
  mdiAccount,
  mdiMail,
  mdiAccountMultiplePlus,
} from "@mdi/js";
import SectionMain from "@/components/SectionMain.vue";
import CardBox from "@/components/CardBox.vue";
// import FormCheckRadioGroup from "@/components/FormCheckRadioGroup.vue";
// import FormFilePicker from "@/components/FormFilePicker.vue";
import FormField from "@/components/FormField.vue";
import FormControl from "@/components/FormControl.vue";
import BaseDivider from "@/components/BaseDivider.vue";
import BaseButton from "@/components/BaseButton.vue";
import BaseButtons from "@/components/BaseButtons.vue";
// import SectionTitle from "@/components/SectionTitle.vue";
import LayoutAuthenticated from "@/layouts/LayoutAuthenticated.vue";
import SectionTitleLineWithButton from "@/components/SectionTitleLineWithButton.vue";
import { useMainStore } from "@/stores/main.js";

const MAIN = useMainStore();
MAIN.resetInput();

// const customElementsForm = reactive({
//   checkbox: ["lorem"],
//   radio: "one",
//   switch: ["one"],
//   file: null,
// });

const submit = () => {
  //
};

let details = ref(false);

const addDetails = () => {
  details.value = !details.value;
};
</script>

<template>
  <LayoutAuthenticated>
    <SectionMain>
      <SectionTitleLineWithButton :icon="mdiBallotOutline" title="Forms" main>
      </SectionTitleLineWithButton>
      <CardBox form @submit.prevent="submit">
        <FormField label="Grouped with icons">
          <FormControl
            v-model="MAIN.input.name"
            :icon="mdiAccount"
            placeholder="Your phone name"
          />
          <FormControl
            v-model="MAIN.input.email"
            type="email"
            :icon="mdiMail"
            placeholder="Your email"
          />
        </FormField>

        <FormField label="Phone Number">
          <FormControl
            v-model="MAIN.input.phone"
            type="tel"
            placeholder="Your phone number"
          />
        </FormField>

        <FormField label="Category">
          <FormControl v-model="MAIN.input.category" :options="MAIN.category" />
        </FormField>

        <BaseDivider />
        <span class="text-lg font-bold cursor-pointer" @click="addDetails"
          >{{ details ? "Hide" : "Show" }} details
        </span>

        <div class="mt-5" :class="{ hidden: !details }">
          <FormField
            label="Description"
            help="Your description. Max 255 characters"
          >
            <FormControl
              v-model="MAIN.input.description"
              type="textarea"
              placeholder="Description..."
            />
          </FormField>
        </div>

        <template #footer>
          <BaseButtons class="-mt-7">
            <BaseButton label="Submit" color="info" @click="MAIN.addContact" />
            <BaseButton
              color="info"
              outline
              label="Reset"
              @click="MAIN.resetInput"
            />
          </BaseButtons>
        </template>
      </CardBox>
    </SectionMain>
  </LayoutAuthenticated>
</template>
