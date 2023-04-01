<script setup>
import { mdiTableBorder, mdiAccountMultiple } from "@mdi/js";
import SectionMain from "@/components/SectionMain.vue";
import NotificationBar from "@/components/NotificationBar.vue";
import TableSampleClients from "@/components/TableSampleClients.vue";
import CardBox from "@/components/CardBox.vue";
import LayoutAuthenticated from "@/layouts/LayoutAuthenticated.vue";
import SectionTitleLineWithButton from "@/components/SectionTitleLineWithButton.vue";
</script>

<template>
  <LayoutAuthenticated>
    <SectionMain>
      <SectionTitleLineWithButton
        :icon="mdiTableBorder"
        title="All Contacts"
        main
      >
      </SectionTitleLineWithButton>
      <NotificationBar color="info" :icon="mdiAccountMultiple">
        <b>Success Edit</b>
      </NotificationBar>
      <NotificationBar color="danger" :icon="mdiAccountMultiple">
        <b>Success Delete</b>
      </NotificationBar>

      <CardBox class="mb-6" has-table>
        <TableSampleClients checkable nopaginate />
      </CardBox>
    </SectionMain>
  </LayoutAuthenticated>
</template>
