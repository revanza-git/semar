import React, { useState } from "react";
import { usePathname } from "next/navigation";
import { Box, List, Collapse } from "@mui/material";
import Menuitems from "./MenuItems";
import NavItem from "./NavItem";

const SidebarItems = ({ toggleMobileSidebar }: any) => {
  const pathname = usePathname();
  const pathDirect = pathname;
  const [open, setOpen] = useState<string | null>(null);

  const handleClick = (id: string) => {
    setOpen(open === id ? null : id);
  };

  return (
    <Box sx={{ px: 2 }}>
      <List sx={{ pt: 0 }} className="sidebarNav" component="div">
        {Menuitems.map((item) => (
          <React.Fragment key={item.id}>
            <NavItem
              item={item}
              pathDirect={pathDirect || ""}
              onClick={
                item.subItems ? () => handleClick(item.id) : toggleMobileSidebar
              }
              isOpen={open === item.id}
            />
            {item.subItems && (
              <Collapse in={open === item.id} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {item.subItems.map((subItem) => (
                    <NavItem
                      item={subItem}
                      key={subItem.id}
                      pathDirect={pathDirect || ""}
                      onClick={toggleMobileSidebar}
                      sx={{ pl: 4 }}
                    />
                  ))}
                </List>
              </Collapse>
            )}
          </React.Fragment>
        ))}
      </List>
    </Box>
  );
};

export default SidebarItems;
