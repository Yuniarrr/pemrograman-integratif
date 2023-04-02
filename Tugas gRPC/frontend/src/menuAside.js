import {
  mdiMonitor,
  mdiSquareEditOutline,
  mdiTable,
} from "@mdi/js";

export default [
  {
    to: "/",
    icon: mdiMonitor,
    label: "Dashboard",
  },
  {
    to: "/tables",
    label: "All Contacts",
    icon: mdiTable,
  },
  {
    to: "/forms",
    label: "Add Contact",
    icon: mdiSquareEditOutline,
  },
];
