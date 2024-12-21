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
import { downloadTemplateFile } from "../api/template";
import { useSession } from "next-auth/react";

const TemplateTableRow = React.memo(
  ({
    template,
    semarTypes,
    index,
    router,
    handleDeleteSemarTemplate,
  }: {
    template: any;
    semarTypes: any[];
    index: number;
    router: any;
    handleDeleteSemarTemplate(id: string): void;
  }) => {
    const { data: session } = useSession();
    const [anchorEl, setAnchorEl] = useState<null | Element>(null);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [deleteTemplateId, setDeleteTemplateId] = useState<string | null>(
      null
    );

    const handleMenuClick = (id: string) => (event: React.MouseEvent) => {
      setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
      setAnchorEl(null);
    };

    const handleDownloadFile = async (semarTemplateCode: string) => {
      try {
        const blob = await downloadTemplateFile(semarTemplateCode);
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${template.fileName}`;
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
      setDeleteTemplateId(id);
      setDialogOpen(true);
    };

    const handleDeleteSemar = () => {
      if (deleteTemplateId) {
        handleDeleteSemarTemplate(deleteTemplateId);
        console.log(`Deleting template with id: ${deleteTemplateId}`);
        setDialogOpen(false);
        setDeleteTemplateId(null);
      }
    };

    const semarType = semarTypes.find(
      (type) => type.semarTypeID === template.tipeDokumen
    );

    return (
      <>
        <TableRow
          key={template.semarTemplateCode}
          sx={{ backgroundColor: index % 2 !== 0 ? "white" : "#f5f5f5" }}
        >
          <TableCell sx={{ border: "1px solid rgba(224, 224, 224, 1)" }}>
            <Typography color="textSecondary" fontSize="12px">
              {template.semarTemplateCode}
            </Typography>
          </TableCell>
          <TableCell sx={{ border: "1px solid rgba(224, 224, 224, 1)" }}>
            <Box display="flex" alignItems="center">
              <Typography fontSize="12px" fontWeight={600}>
                {semarType ? semarType.deskripsi : template.type}
              </Typography>
            </Box>
          </TableCell>
          <TableCell sx={{ border: "1px solid rgba(224, 224, 224, 1)" }}>
            <Typography color="textSecondary" fontSize="12px">
              {template.namaTemplate}
            </Typography>
          </TableCell>
          <TableCell sx={{ border: "1px solid rgba(224, 224, 224, 1)" }}>
            <Typography fontSize="12px">{template.tahun}</Typography>
          </TableCell>
          <TableCell sx={{ border: "1px solid rgba(224, 224, 224, 1)" }}>
            <Typography fontSize="12px">{template.revisi}</Typography>
          </TableCell>
          <TableCell sx={{ border: "1px solid rgba(224, 224, 224, 1)" }}>
            <Box display="flex" alignItems="center" justifyContent="center">
              <Box
                sx={{
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  backgroundColor:
                    template.status === 1
                      ? "green"
                      : template.status === 2
                      ? "red"
                      : "transparent",
                  mr: 1,
                }}
              />
            </Box>
          </TableCell>
          <TableCell sx={{ border: "1px solid rgba(224, 224, 224, 1)" }}>
            <IconButton onClick={handleMenuClick(template.semarTemplateCode)}>
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
                  <MenuItem
                    onClick={() =>
                      router.push(
                        `/detail-template?id=${template.semarTemplateCode}`
                      )
                    }
                  >
                    Edit
                  </MenuItem>
                  <MenuItem
                    onClick={() => handleOpenDialog(template.semarTemplateCode)}
                  >
                    Delete
                  </MenuItem>
                </>
              )}
              <MenuItem
                onClick={() => handleDownloadFile(template.semarTemplateCode)}
              >
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
TemplateTableRow.displayName = "TemplateTableRow";

export default TemplateTableRow;
