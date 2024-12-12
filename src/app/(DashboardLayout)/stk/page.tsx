"use client";

// Report/Page.tsx
import React, { useState } from "react";
import {
  Alert,
  IconButton,
  Box,
  TextField,
  Button,
  Grid,
  Breadcrumbs,
  Link,
  Typography,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import BaseCard from "../components/shared/DashboardCard";
import ActivityTable from "../components/dashboard/Report/components/ActivityTable";
import useSemarData from "../components/dashboard/Report/hooks/useSemarData";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();
  const [open, setOpen] = useState(true);

  const {
    stkData,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    fetchDataSTK,
    handleDeleteSemarActivity,
    semarTypes,
    departments,
    noDocument,
    setNoDocument,
    title,
    setTitle,
    semarLevel,
    setSemarLevel,
    owner,
    setOwner,
    status,
    setStatus,
    currentPageSTK,
    setCurrentPageSTK,
    totalCountSTK,
  } = useSemarData();

  const pageSize = 5; // Limit data to only 10 items per page
  const handleAddNewDocument = () => {
    router.push("/create"); // Navigate to the create page
  };

  return (
    <BaseCard>
      <>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
        >
          <Breadcrumbs aria-label="breadcrumb">
            <Link color="inherit" onClick={() => router.push("/")}>
              Home
            </Link>
            <Typography color="textPrimary">STK</Typography>
          </Breadcrumbs>
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddNewDocument}
          >
            Tambah Dokumen Baru
          </Button>
        </Box>
        <Grid container spacing={2} mt={2}>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <TextField
              label="Start Date"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={startDate ? startDate.toISOString().split("T")[0] : ""}
              onChange={(e) =>
                setStartDate(e.target.value ? new Date(e.target.value) : null)
              }
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <TextField
              label="End Date"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={endDate ? endDate.toISOString().split("T")[0] : ""}
              onChange={(e) =>
                setEndDate(e.target.value ? new Date(e.target.value) : null)
              }
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <TextField
              label="No Document"
              InputLabelProps={{ shrink: true }}
              value={noDocument}
              onChange={(e) => setNoDocument(e.target.value)}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <TextField
              label="Title"
              InputLabelProps={{ shrink: true }}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <FormControl fullWidth>
              <InputLabel>Fungsi</InputLabel>

              <Select
                value={owner || ""}
                onChange={(e) => setOwner(e.target.value)}
                label="Owner"
              >
                <MenuItem value="">
                  <em>Semua</em>
                </MenuItem>
                {departments.map((department) => (
                  <MenuItem
                    key={department.departmentID}
                    value={department.departmentID}
                  >
                    {department.deskripsi}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select
                value={status || ""}
                onChange={(e) => setStatus(e.target.value)}
                label="Status"
              >
                <MenuItem value="">
                  <em>Semua</em>
                </MenuItem>
                <MenuItem value={1}>Aktif</MenuItem>
                <MenuItem value={2}>Tidak Aktif</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Box mt={4}>
          <ActivityTable
            title="Sistem Tata Kerja"
            semarData={stkData} // Use skData
            router={router}
            handleDeleteSemarActivity={handleDeleteSemarActivity}
            open={open}
            setOpen={setOpen}
            semarTypes={semarTypes}
            departments={departments}
            pageSize={pageSize} // Set pageSize to 10
            currentPage={currentPageSTK}
            setCurrentPage={setCurrentPageSTK}
            totalCount={totalCountSTK}
            fetchData={fetchDataSTK}
            dataLimit={totalCountSTK} // Set dataLimit to 10
          />
        </Box>
      </>
    </BaseCard>
  );
};

export default Page;
