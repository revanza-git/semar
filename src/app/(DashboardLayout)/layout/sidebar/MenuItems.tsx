import {
  IconHome,
  IconFiles,
  IconUser,
  IconSettingsFilled,
} from "@tabler/icons-react";

import { uniqueId } from "lodash";

const Menuitems = [
  {
    id: uniqueId(),
    title: "Home",
    icon: IconHome,
    href: "/",
  },
  {
    id: uniqueId(),
    title: "Surat Keputusan",
    icon: IconFiles,
    href: "/sk",
  },
  {
    id: uniqueId(),
    title: "Sistem Tata Kerja",
    icon: IconFiles,
    href: "/stk",
  },
  {
    id: uniqueId(),
    title: "Template",
    icon: IconFiles,
    href: "/template",
  },
  {
    id: uniqueId(),
    title: "Settings",
    icon: IconSettingsFilled,
    href: "#",
    subItems: [
      {
        id: uniqueId(),
        title: "PIC",
        icon: IconUser,
        href: "/settings/pic",
      },
    ],
  },
];

export default Menuitems;
