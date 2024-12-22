import React, { useState } from "react";
import {
  TableCell,
  TableRow,
  Typography,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useSession } from "next-auth/react";

const PICTableRow = React.memo(
  ({
    key,
    pic,
    index,
    router,
    departments,
    users,
    handleDeletePIC,
  }: {
    key: any;
    pic: any;
    index: number;
    router: any;
    departments: any[];
    users: any[];
    handleDeletePIC: (id: any) => void;
  }) => {
    const { data: session } = useSession();
    const [anchorEl, setAnchorEl] = useState<null | Element>(null);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [deletePICId, setDeletePICId] = useState<string | null>(null);

    const handleMenuClick = (id: string) => (event: React.MouseEvent) => {
      setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
      setAnchorEl(null);
    };

    const handleOpenDialog = (id: string) => {
      setDeletePICId(id);
      setDialogOpen(true);
    };

    const handleDeletePICAction = () => {
      if (deletePICId) {
        handleDeletePIC(deletePICId);
        console.log(`Deleting PIC with id: ${deletePICId}`);
        setDialogOpen(false);
        setDeletePICId(null);
      }
    };

    const user = users.find((user) => user.userName === pic.usernamePIC);

    const department = departments.find(
      (dept) => dept.departmentID === pic.departmentPIC
    );

    return (
      <>
        <TableRow
          key={key}
          sx={{ backgroundColor: index % 2 !== 0 ? "white" : "#f5f5f5" }}
        >
          <TableCell sx={{ border: "1px solid rgba(224, 224, 224, 1)" }}>
            <Typography color="textSecondary" fontSize="12px">
              {pic.id}
            </Typography>
          </TableCell>
          <TableCell sx={{ border: "1px solid rgba(224, 224, 224, 1)" }}>
            <Typography color="textSecondary" fontSize="12px">
              {user ? user.name : pic.usernamePIC}
            </Typography>
          </TableCell>
          <TableCell sx={{ border: "1px solid rgba(224, 224, 224, 1)" }}>
            <Typography color="textSecondary" fontSize="12px">
              {user ? user.email : pic.usernamePIC}
            </Typography>
          </TableCell>
          <TableCell sx={{ border: "1px solid rgba(224, 224, 224, 1)" }}>
            <Typography color="textSecondary" fontSize="12px">
              {department ? department.deskripsi : pic.departmentPIC}
            </Typography>
          </TableCell>
          <TableCell sx={{ border: "1px solid rgba(224, 224, 224, 1)" }}>
            <IconButton onClick={handleMenuClick(pic.id)}>
              <MoreVertIcon />
            </IconButton>
            <Menu
              id="item-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              {session?.role === "AdminQM" && (
                <>
                  <MenuItem onClick={() => handleOpenDialog(pic.id)}>
                    Delete
                  </MenuItem>
                </>
              )}
            </Menu>
          </TableCell>
        </TableRow>

        <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
          <DialogTitle>{"Confirm Delete"}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to delete this semar activity?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleDeletePICAction} autoFocus>
              Yes
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  }
);

// Explicitly setting the display name for the component
PICTableRow.displayName = "PICTableRow";

export default PICTableRow;
