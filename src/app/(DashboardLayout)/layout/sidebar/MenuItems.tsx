import {
  IconBoxMultiple,
  IconCircleDot,
  IconHome,
  IconFiles,
  IconInfoCircle,
  IconLayout,
  IconLayoutGrid,
  IconPhoto,
  IconPoint,
  IconStar,
  IconTable,
  IconUser,
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
];

export default Menuitems;
