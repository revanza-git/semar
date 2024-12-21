import React from "react";
// mui imports
import {
  ListItemIcon,
  ListItem,
  List,
  styled,
  ListItemText,
  useTheme,
  ListItemButton,
  SxProps,
} from "@mui/material";
import Link from "next/link";
import { ExpandLess, ExpandMore } from "@mui/icons-material";

type NavGroup = {
  [x: string]: any;
  id?: string;
  navlabel?: boolean;
  subheader?: string;
  title?: string;
  icon?: any;
  href?: any;
  subItems?: NavGroup[];
  onClick?: React.MouseEvent<HTMLButtonElement, MouseEvent>;
};

interface ItemType {
  item: NavGroup;
  onClick: (event: React.MouseEvent<HTMLElement>) => void;
  hideMenu?: any;
  level?: number | any;
  pathDirect: string;
  sx?: SxProps;
  isOpen?: boolean;
}

const NavItem = ({
  item,
  level,
  pathDirect,
  onClick,
  sx,
  isOpen,
}: ItemType) => {
  const Icon = item.icon;
  const theme = useTheme();
  const itemIcon = Icon ? <Icon stroke={1.5} size="1.3rem" /> : null;

  const ListItemStyled = styled(ListItem)(() => ({
    padding: 0,
    ".MuiButtonBase-root": {
      whiteSpace: "nowrap",
      marginBottom: "8px",
      padding: "8px 10px",
      borderRadius: "8px",
      backgroundColor: level > 1 ? "transparent !important" : "inherit",
      color: theme.palette.text.secondary,
      paddingLeft: "10px",
      "&:hover": {
        backgroundColor: theme.palette.secondary.light,
        color: theme.palette.secondary.main,
      },
      "&.Mui-selected": {
        color: "white",
        backgroundColor: theme.palette.secondary.main,
        "&:hover": {
          backgroundColor: theme.palette.secondary.main,
          color: "white",
        },
      },
    },
  }));

  return (
    <List component="div" disablePadding key={item.id}>
      <ListItemStyled>
        <ListItemButton
          component={Link}
          href={item.href}
          disabled={item.disabled}
          selected={pathDirect === item.href}
          target={item.external ? "_blank" : ""}
          onClick={onClick}
          sx={sx}
        >
          <ListItemIcon
            sx={{
              minWidth: "36px",
              p: "3px 0",
              color: "inherit",
            }}
          >
            {itemIcon}
          </ListItemIcon>
          <ListItemText>
            <>{item.title}</>
          </ListItemText>
          {item.subItems ? isOpen ? <ExpandLess /> : <ExpandMore /> : null}
        </ListItemButton>
      </ListItemStyled>
    </List>
  );
};

export default NavItem;
