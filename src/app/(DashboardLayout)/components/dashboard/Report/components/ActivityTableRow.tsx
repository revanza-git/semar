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
import { downloadSemarFile } from "../api/semar";
import { formatDate } from "../../../../../../utils/formatDate";
import { useSession } from "next-auth/react";

const ActivityTableRow = React.memo(
  ({
    activity,
    index,
    router,
    handleDeleteSemarActivity,
    semarTypes,
    departments,
  }: {
    activity: any;
    index: number;
    router: any;
    handleDeleteSemarActivity(id: string): void;
    semarTypes: any[];
    departments: any[];
  }) => {
    const { data: session } = useSession();
    const [anchorEl, setAnchorEl] = useState<null | Element>(null);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [deleteActivityId, setDeleteActivityId] = useState<string | null>(
      null
    );

    const handleMenuClick = (id: string) => (event: React.MouseEvent) => {
      setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
      setAnchorEl(null);
    };

    const handleDownloadFile = async (semarID: string) => {
      try {
        const blob = await downloadSemarFile(semarID);
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${activity.fileName}`;
        document.body.appendChild(a);
        a.click();
        a.remove();
        setAnchorEl(null);
      } catch (error) {
        if (error instanceof Error) {
          console.error("Error downloading file:", error.message);
          alert(error.message);
        } else {
          console.error("Unexpected error", error);
          alert("An unexpected error occurred");
        }
      }
    };

    const handleOpenDialog = (id: string) => {
      setDeleteActivityId(id);
      setDialogOpen(true);
    };

    const handleDeleteSemar = () => {
      if (deleteActivityId) {
        handleDeleteSemarActivity(deleteActivityId);
        console.log(`Deleting activity with id: ${deleteActivityId}`);
        setDialogOpen(false);
        setDeleteActivityId(null);
      }
    };

    const semarType = semarTypes.find(
      (type) => type.semarTypeID === activity.type
    );

    const department = departments.find(
      (dept) => dept.departmentID === activity.owner
    );

    const formattedPublishDate = formatDate(activity.publishDate);
    const formattedExpiredDate = formatDate(activity.expiredDate);

    return (
      <>
        <TableRow
          key={activity.semarID}
          sx={{ backgroundColor: index % 2 !== 0 ? "white" : "#f5f5f5" }}
        >
          <TableCell sx={{ border: "1px solid rgba(224, 224, 224, 1)" }}>
            <Typography color="textSecondary" fontSize="12px">
              {activity.semarID}
            </Typography>
          </TableCell>
          <TableCell sx={{ border: "1px solid rgba(224, 224, 224, 1)" }}>
            <Box display="flex" alignItems="center">
              <Typography fontSize="12px" fontWeight={600}>
                {semarType ? semarType.deskripsi : activity.type}
              </Typography>
            </Box>
          </TableCell>
          <TableCell sx={{ border: "1px solid rgba(224, 224, 224, 1)" }}>
            <Typography color="textSecondary" fontSize="12px">
              {department ? department.deskripsi : activity.owner}
            </Typography>
          </TableCell>
          <TableCell sx={{ border: "1px solid rgba(224, 224, 224, 1)" }}>
            <Typography fontSize="12px">{activity.noDocument}</Typography>
          </TableCell>
          <TableCell sx={{ border: "1px solid rgba(224, 224, 224, 1)" }}>
            <Typography fontSize="12px">{activity.revision}</Typography>
          </TableCell>
          <TableCell
            align="left"
            sx={{
              width: "100%",
              border: "1px solid rgba(224, 224, 224, 1)",
            }}
          >
            <Typography fontSize="12px">{activity.title}</Typography>
          </TableCell>
          <TableCell sx={{ border: "1px solid rgba(224, 224, 224, 1)" }}>
            <Typography fontSize="12px">{formattedPublishDate}</Typography>
          </TableCell>
          <TableCell sx={{ border: "1px solid rgba(224, 224, 224, 1)" }}>
            <Typography fontSize="12px">{formattedExpiredDate}</Typography>
          </TableCell>
          <TableCell
            align="left"
            sx={{
              width: "100%",
              border: "1px solid rgba(224, 224, 224, 1)",
            }}
          >
            <Typography fontSize="12px">{activity.description}</Typography>
          </TableCell>
          <TableCell sx={{ border: "1px solid rgba(224, 224, 224, 1)" }}>
            <Box display="flex" alignItems="center" justifyContent="center">
              <Box
                sx={{
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  backgroundColor:
                    activity.status === 1
                      ? "green"
                      : activity.status === 2
                      ? "red"
                      : "transparent",
                  mr: 1,
                }}
              />
            </Box>
          </TableCell>
          <TableCell sx={{ border: "1px solid rgba(224, 224, 224, 1)" }}>
            <IconButton onClick={handleMenuClick(activity.semarID)}>
              <MoreVertIcon />
            </IconButton>
            <Menu
              id="item-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem
                onClick={() => router.push(`/details?id=${activity.semarID}`)}
              >
                View
              </MenuItem>
              {(session?.role === "AdminQM" ||
                session?.department === activity.owner) && (
                <MenuItem onClick={() => handleOpenDialog(activity.semarID)}>
                  Delete
                </MenuItem>
              )}
              <MenuItem onClick={() => handleDownloadFile(activity.semarID)}>
                Download File
              </MenuItem>
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
            <Button onClick={handleDeleteSemar} autoFocus>
              Yes
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  }
);

// Explicitly setting the display name for the component
ActivityTableRow.displayName = "ActivityTableRow";

export default ActivityTableRow;
