<script setup>
import { computed, ref, onMounted } from "vue";
import { useMainStore } from "@/stores/main";
import {
  mdiAccountMultiple,
  mdiChartTimelineVariant,
  mdiContacts,
} from "@mdi/js";
import * as chartConfig from "@/components/Charts/chart.config.js";
import SectionMain from "@/components/SectionMain.vue";
import CardBoxWidget from "@/components/CardBoxWidget.vue";
import CardBox from "@/components/CardBox.vue";
import TableSampleClients from "@/components/TableSampleClients.vue";
import NotificationBar from "@/components/NotificationBar.vue";
import CardBoxClient from "@/components/CardBoxClient.vue";
import LayoutAuthenticated from "@/layouts/LayoutAuthenticated.vue";
import SectionTitleLineWithButton from "@/components/SectionTitleLineWithButton.vue";

const chartData = ref(null);

const fillChartData = () => {
  chartData.value = chartConfig.sampleChartData();
};

onMounted(() => {
  fillChartData();
});

const family = computed(() => {
  return mainStore.contacts.filter((item) => item.category == "Family");
});

const none = computed(() => {
  return mainStore.contacts.filter((item) => item.category == "none");
});

const mainStore = useMainStore();

const clientBarItems = computed(() => mainStore.contacts.slice(0, 4));

const clientBarItems2 = computed(() => mainStore.contacts.slice(4, 8));
</script>

<template>
  <LayoutAuthenticated>
    <SectionMain>
      <NotificationBar
        v-if="mainStore.notification"
        color="info"
        :icon="mdiAccountMultiple"
      >
        <b>Success Add Contact</b>
      </NotificationBar>

      <SectionTitleLineWithButton
        :icon="mdiChartTimelineVariant"
        title="Contacts"
        main
      >
      </SectionTitleLineWithButton>

      <div class="grid grid-cols-1 gap-6 lg:grid-cols-3 mb-6">
        <CardBoxWidget
          trend="12%"
          trend-type="up"
          color="text-emerald-500"
          :icon="mdiAccountMultiple"
          :number="mainStore.contacts.length"
          label="All Contacts"
        />
        <CardBoxWidget
          trend="12%"
          trend-type="down"
          color="text-blue-500"
          :icon="mdiContacts"
          :number="family.length"
          label="Category: Family"
        />
        <CardBoxWidget
          trend="Overflow"
          trend-type="alert"
          color="text-red-500"
          :icon="mdiContacts"
          :number="none.length"
          label="Category: None"
        />
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div class="flex flex-col justify-between">
          <CardBoxClient
            v-for="client in clientBarItems"
            :key="client._id"
            :name="client.nama"
            :login="client.phone"
            :date="client.email"
            :avatar="client.avatar"
          />
        </div>
        <div class="flex flex-col justify-between">
          <CardBoxClient
            v-for="client in clientBarItems2"
            :key="client._id"
            :name="client.nama"
            :login="client.phone"
            :date="client.email"
            :avatar="client.avatar"
          />
        </div>
      </div>

      <SectionTitleLineWithButton
        :icon="mdiAccountMultiple"
        title="All Contacts"
      />

      <CardBox has-table>
        <TableSampleClients />
      </CardBox>
    </SectionMain>
  </LayoutAuthenticated>
</template>
