<script setup>
import { computed } from "vue";
import { mdiTrendingDown, mdiTrendingUp, mdiTrendingNeutral } from "@mdi/js";
import CardBox from "@/components/CardBox.vue";
import BaseLevel from "@/components/BaseLevel.vue";
import PillTag from "@/components/PillTag.vue";
import UserAvatar from "@/components/UserAvatar.vue";

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  login: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    default: null,
  },
  type: {
    type: String,
    default: null,
  },
});

const pillType = computed(() => {
  if (props.type) {
    return props.type;
  }

  return "info";
});

const pillIcon = computed(() => {
  return {
    success: mdiTrendingUp,
    warning: mdiTrendingNeutral,
    danger: mdiTrendingDown,
    info: null,
  }[pillType.value];
});
</script>

<template>
  <CardBox class="mb-6 last:mb-0" is-hoverable>
    <BaseLevel>
      <BaseLevel type="justify-start">
        <UserAvatar class="w-12 h-12 mr-6" :username="name" />
        <div class="text-center md:text-left overflow-hidden">
          <h4 class="text-xl text-ellipsis">
            {{ name }}
          </h4>
          <p class="text-gray-500 dark:text-slate-400">
            {{ date }} @ {{ login }}
          </p>
        </div>
      </BaseLevel>
    </BaseLevel>
  </CardBox>
</template>
