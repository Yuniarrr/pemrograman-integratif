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
          <FormField label="Other Social Media">
            <FormControl :options="MAIN.category" />
            <FormControl
              v-model="MAIN.input.email"
              type="email"
              :icon="mdiAccountMultiplePlus"
              placeholder="Your social media"
            />
          </FormField>
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

    <!-- <SectionTitle>Custom elements</SectionTitle>

    <SectionMain>
      <CardBox>
        <FormField label="Checkbox">
          <FormCheckRadioGroup
            v-model="customElementsForm.checkbox"
            name="sample-checkbox"
            :options="{ lorem: 'Lorem', ipsum: 'Ipsum', dolore: 'Dolore' }"
          />
        </FormField>

        <BaseDivider />

        <FormField label="Radio">
          <FormCheckRadioGroup
            v-model="customElementsForm.radio"
            name="sample-radio"
            type="radio"
            :options="{ one: 'One', two: 'Two' }"
          />
        </FormField>

        <BaseDivider />

        <FormField label="Switch">
          <FormCheckRadioGroup
            v-model="customElementsForm.switch"
            name="sample-switch"
            type="switch"
            :options="{ one: 'One', two: 'Two' }"
          />
        </FormField>

        <BaseDivider />

        <FormFilePicker v-model="customElementsForm.file" label="Upload" />
      </CardBox>
    </SectionMain> -->
  </LayoutAuthenticated>
</template>
