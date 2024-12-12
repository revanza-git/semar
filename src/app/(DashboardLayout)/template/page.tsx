"use client";
// Template/Page.tsx
import React, { useState, useEffect } from "react";
import {
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
import BaseCard from "../components/shared/DashboardCard";
import TemplateTable from "./components/TemplateTable";
import useTemplateData from "./hook/useTemplateData"; // Adjust the import path as needed
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();
  const [open, setOpen] = useState(true);

  const {
    templateData,
    tipeDokumen,
    setTipeDokumen,
    setNamaTemplate,
    year,
    setYear,
    fetchData,
    status,
    setStatus,
    currentPage,
    setCurrentPage,
    totalCount,
    dataLimit,
    setDataLimit,
    pageSize,
    setPageSize,
    namaTemplate,
    semarTypes,
    handleDeleteSemarTemplate,
  } = useTemplateData();

  const handleAddNewTemplate = () => {
    router.push("/create-template"); // Navigate to the create page
  };

  useEffect(() => {
    setPageSize(5);
  }, [setPageSize, setDataLimit]);

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
            <Typography color="textPrimary">Template</Typography>
          </Breadcrumbs>
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddNewTemplate}
          >
            Tambah Template Baru
          </Button>
        </Box>
        <Grid container spacing={2} mt={2}>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              label="Nama"
              value={namaTemplate}
              onChange={(e) => setNamaTemplate(e.target.value)}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <FormControl fullWidth>
              <InputLabel>Tipe Dokumen</InputLabel>

              <Select
                value={tipeDokumen || ""}
                onChange={(e) => setTipeDokumen(e.target.value)}
                label="Tipe Dokumen"
              >
                <MenuItem value="">
                  <em>Semua</em>
                </MenuItem>
                {semarTypes.map((semarTypes) => (
                  <MenuItem
                    key={semarTypes.semarTypeID}
                    value={semarTypes.semarTypeID}
                  >
                    {semarTypes.deskripsi}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              label="Tahun"
              type="number"
              value={year !== undefined && year !== 0 ? year : ""}
              onChange={(e) => {
                const value = Number(e.target.value);
                setYear(value !== 0 ? value : undefined);
              }}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
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
          <TemplateTable
            title="Template STK &SK"
            fetchData={fetchData}
            semarTypes={semarTypes}
            router={router}
            handleDeleteSemarTemplate={handleDeleteSemarTemplate}
            totalCount={totalCount}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            templateData={templateData} // Use skNewData
            pageSize={pageSize} // Set pageSize to 10
            dataLimit={dataLimit} // Set dataLimit to 10
          />
        </Box>
      </>
    </BaseCard>
  );
};

export default Page;
