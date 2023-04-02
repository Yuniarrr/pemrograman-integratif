<script setup>
import { computed, ref } from "vue";
import { useMainStore } from "@/stores/main";
import { mdiEye, mdiTrashCan, mdiBookEdit } from "@mdi/js";
import CardBoxModal from "@/components/CardBoxModal.vue";
import TableCheckboxCell from "@/components/TableCheckboxCell.vue";
import BaseLevel from "@/components/BaseLevel.vue";
import BaseButtons from "@/components/BaseButtons.vue";
import BaseButton from "@/components/BaseButton.vue";
import UserAvatar from "@/components/UserAvatar.vue";
import FormControl from "@/components/FormControl.vue";
import FormField from "@/components/FormField.vue";

defineProps({
  checkable: Boolean,
  nopaginate: Boolean,
});

const mainStore = useMainStore();

const items = computed(() => mainStore.contacts);
const contact = computed(() => mainStore.input);

const isReadActive = ref(false);
const isEditActive = ref(false);
const isDeleteActive = ref(false);

const perPage = ref(5);

const currentPage = ref(0);

const checkedRows = ref([]);

const itemsPaginated = computed(() =>
  items.value.slice(
    perPage.value * currentPage.value,
    perPage.value * (currentPage.value + 1)
  )
);

const numPages = computed(() => Math.ceil(items.value.length / perPage.value));

const currentPageHuman = computed(() => currentPage.value + 1);

const pagesList = computed(() => {
  const pagesList = [];
  for (let i = 0; i < numPages.value; i++) {
    pagesList.push(i);
  }
  return pagesList;
});

const remove = (arr, cb) => {
  const newArr = [];

  arr.forEach((item) => {
    if (!cb(item)) {
      newArr.push(item);
    }
  });

  return newArr;
};

const checked = (isChecked, client) => {
  if (isChecked) {
    checkedRows.value.push(client);
  } else {
    checkedRows.value = remove(
      checkedRows.value,
      (row) => row.id === client.id
    );
  }
};
</script>

<template>
  <CardBoxModal v-model="isReadActive" title="Contact">
    <div class="flex flex-col -mb-5 flex-wrap gap-y-1">
      <div class="flex flex-row -mb-6">
        <span class="w-1/3">Nama</span>
        <span class="w-2/3">{{ contact.nama }}</span>
      </div>
      <div class="flex flex-row">
        <span class="w-1/3">Phone</span>
        <span class="w-2/3">{{ contact.phone }}</span>
      </div>
      <div class="flex flex-row">
        <span class="w-1/3">Email</span>
        <span class="w-2/3">{{ contact.email }}</span>
      </div>
      <div class="flex flex-row">
        <span class="w-1/3">Category</span>
        <span class="w-2/3">{{ contact.category }}</span>
      </div>
      <div class="flex flex-row">
        <span class="w-1/3">Description</span>
        <span class="w-2/3">{{
          contact.description == "" ? `None` : contact.description
        }}</span>
      </div>
    </div>
  </CardBoxModal>

  <CardBoxModal
    :id="mainStore.input._id"
    v-model="isEditActive"
    title="Edit Contact"
    has-cancel
    :is-edit="true"
  >
    <div class="flex flex-col -mb-5 flex-wrap gap-y-5">
      <div class="flex flex-row items-center">
        <span class="w-1/3 text-lg">Nama</span>
        <FormControl
          v-model="mainStore.input.nama"
          type="email"
          :icon="mdiMail"
          placeholder="Your phone email"
          class="w-2/3"
        />
      </div>
      <div class="flex flex-row items-center">
        <span class="w-1/3 text-lg">Phone</span>
        <FormControl
          v-model="mainStore.input.phone"
          type="email"
          :icon="mdiMail"
          placeholder="Your phone email"
          class="w-2/3"
        />
      </div>
      <div class="flex flex-row items-center">
        <span class="w-1/3 text-lg">Email</span>
        <FormControl
          v-model="mainStore.input.email"
          type="email"
          :icon="mdiMail"
          placeholder="Your phone email"
          class="w-2/3"
        />
      </div>
      <div class="flex flex-row items-center">
        <span class="w-1/3 text-lg">Category</span>
        <!-- <FormField> -->
        <FormControl
          v-model="mainStore.input.category"
          :options="mainStore.category"
        />
        <!-- </FormField> -->
      </div>
      <div class="flex flex-row items-center">
        <span class="w-1/3 text-lg">Description</span>
        <FormControl
          v-model="mainStore.input.description"
          type="email"
          :icon="mdiMail"
          placeholder="Your phone description"
          class="w-2/3"
        />
      </div>
    </div>
  </CardBoxModal>

  <CardBoxModal
    :id="mainStore.input._id"
    v-model="isDeleteActive"
    title="Please confirm"
    button="danger"
    has-cancel
    :is-delete="true"
  >
    <p>
      Delete contact <b>{{ mainStore.input.nama }}</b
      >?
    </p>
    <p>{{ mainStore.input._id }}</p>
  </CardBoxModal>

  <div v-if="checkedRows.length" class="p-3 bg-gray-100/50 dark:bg-slate-800">
    <span
      v-for="checkedRow in checkedRows"
      :key="checkedRow.id"
      class="inline-block px-2 py-1 rounded-sm mr-2 text-sm bg-gray-100 dark:bg-slate-700"
    >
      {{ checkedRow.name }}
    </span>
  </div>

  <table v-if="nopaginate">
    <thead>
      <tr>
        <th />
        <th>Name</th>
        <th>Phone</th>
        <th>Email</th>
        <th>Category</th>
        <th />
      </tr>
    </thead>
    <tbody>
      <tr v-for="client in items" :key="client.id">
        <td class="border-b-0 lg:w-6 before:hidden">
          <UserAvatar
            :username="client.nama"
            :avatar="client.avatar"
            class="w-24 h-24 mx-auto lg:w-6 lg:h-6"
          />
        </td>
        <td data-label="Name">
          {{ client.nama }}
        </td>
        <td data-label="Phone">
          {{ client.phone }}
        </td>
        <td data-label="Email">
          {{ client.email }}
        </td>
        <td data-label="Created" class="lg:w-1 whitespace-nowrap">
          <small
            class="text-gray-500 dark:text-slate-400"
            :title="client.category"
            >{{ client.category }}</small
          >
        </td>
        <td class="before:hidden lg:w-1 whitespace-nowrap">
          <BaseButtons type="justify-start lg:justify-end" no-wrap>
            <BaseButton
              color="info"
              :icon="mdiEye"
              small
              @click="(isReadActive = true), mainStore.getContact(client._id)"
            />
            <BaseButton
              color="success"
              :icon="mdiBookEdit"
              small
              @click="(isEditActive = true), mainStore.getContact(client._id)"
            />
            <BaseButton
              color="danger"
              :icon="mdiTrashCan"
              small
              @click="(isDeleteActive = true), mainStore.getContact(client._id)"
            />
          </BaseButtons>
        </td>
      </tr>
    </tbody>
  </table>

  <table v-else>
    <thead>
      <tr>
        <th v-if="checkable" />
        <th />
        <th>Name</th>
        <th>Phone</th>
        <th>Email</th>
        <th>Category</th>
        <th />
      </tr>
    </thead>
    <tbody>
      <tr v-for="client in itemsPaginated" :key="client.id">
        <TableCheckboxCell
          v-if="checkable"
          @checked="checked($event, client)"
        />
        <td class="border-b-0 lg:w-6 before:hidden">
          <UserAvatar
            :username="client.nama"
            :avatar="client.avatar"
            class="w-24 h-24 mx-auto lg:w-6 lg:h-6"
          />
        </td>
        <td data-label="Name">
          {{ client.nama }}
        </td>
        <td data-label="Phone">
          {{ client.phone }}
        </td>
        <td data-label="Email">
          {{ client.email }}
        </td>
        <td data-label="Created" class="lg:w-1 whitespace-nowrap">
          <small
            class="text-gray-500 dark:text-slate-400"
            :title="client.category"
            >{{ client.category }}</small
          >
        </td>
        <td class="before:hidden lg:w-1 whitespace-nowrap">
          <BaseButtons type="justify-start lg:justify-end" no-wrap>
            <BaseButton
              color="info"
              :icon="mdiEye"
              small
              @click="(isReadActive = true), mainStore.getContact(client._id)"
            />
            <BaseButton
              color="success"
              :icon="mdiBookEdit"
              small
              @click="(isEditActive = true), mainStore.getContact(client._id)"
            />
            <BaseButton
              color="danger"
              :icon="mdiTrashCan"
              small
              @click="(isDeleteActive = true), mainStore.getContact(client._id)"
            />
          </BaseButtons>
        </td>
      </tr>
    </tbody>
  </table>
  <div
    v-if="!nopaginate"
    class="p-3 lg:px-6 border-t border-gray-100 dark:border-slate-800"
  >
    <BaseLevel>
      <BaseButtons>
        <BaseButton
          v-for="page in pagesList"
          :key="page"
          :active="page === currentPage"
          :label="page + 1"
          :color="page === currentPage ? 'lightDark' : 'whiteDark'"
          small
          @click="currentPage = page"
        />
      </BaseButtons>
      <small>Page {{ currentPageHuman }} of {{ numPages }}</small>
    </BaseLevel>
  </div>
</template>
