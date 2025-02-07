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

const TypeTableRow = React.memo(
  ({
    rowKey,
    type,
    index,
    router,
    handleDeleteType,
  }: {
    rowKey: any;
    type: any;
    index: number;
    router: any;
    handleDeleteType: (id: any) => void;
  }) => {
    const { data: session } = useSession();
    const [anchorEl, setAnchorEl] = useState<null | Element>(null);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [deleteTypeId, setDeleteTypeId] = useState<string | null>(null);

    const handleMenuClick = (id: string) => (event: React.MouseEvent) => {
      setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
      setAnchorEl(null);
    };

    const handleOpenDialog = (id: string) => {
      setDeleteTypeId(id);
      setDialogOpen(true);
    };

    const handleDeleteTypeAction = () => {
      if (deleteTypeId) {
        handleDeleteType(deleteTypeId);
        console.log(`Deleting Type with id: ${deleteTypeId}`);
        setDialogOpen(false);
        setDeleteTypeId(null);
      }
    };

    return (
      <>
        <TableRow
          key={rowKey}
          sx={{ backgroundColor: index % 2 !== 0 ? "white" : "#f5f5f5" }}
        >
          <TableCell sx={{ border: "1px solid rgba(224, 224, 224, 1)" }}>
            <Typography color="textSecondary" fontSize="12px">
              {type.semarTypeID}
            </Typography>
          </TableCell>
          <TableCell sx={{ border: "1px solid rgba(224, 224, 224, 1)" }}>
            <Typography color="textSecondary" fontSize="12px">
              {type.deskripsi}
            </Typography>
          </TableCell>
          <TableCell sx={{ border: "1px solid rgba(224, 224, 224, 1)" }}>
            <Typography color="textSecondary" fontSize="12px">
              {type.type}
            </Typography>
          </TableCell>
          <TableCell sx={{ border: "1px solid rgba(224, 224, 224, 1)" }}>
            <IconButton onClick={handleMenuClick(rowKey)}>
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
                  <MenuItem onClick={() => handleOpenDialog(type.semarTypeID)}>
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
              Are you sure you want to delete this semar type?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleDeleteTypeAction} autoFocus>
              Yes
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  }
);

// Explicitly setting the display name for the component
TypeTableRow.displayName = "TypeTableRow";

export default TypeTableRow;
