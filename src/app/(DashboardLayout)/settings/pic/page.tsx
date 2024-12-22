"use client";
// Template/Page.tsx
import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Breadcrumbs,
  Link,
  Typography,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Button,
} from "@mui/material";
import BaseCard from "../../components/shared/DashboardCard";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import usePICData from "./hooks/usePICdata";
import PICTable from "./components/PICTable";

const Page = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const loading = status === "loading";

  const {
    fetchData,
    picData,
    totalCount,
    departmentPIC,
    setDepartmentPIC,
    currentPage,
    setCurrentPage,
    pageSize,
    setPageSize,
    dataLimit,
    setDataLimit,
    departments,
    users,
    handleDeletePIC,
  } = usePICData();

  const handleAddNewPIC = () => {
    router.push("pic/create"); // Navigate to the create page
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
            <Typography color="textPrimary">Settings</Typography>
            <Typography color="textPrimary">PIC</Typography>
          </Breadcrumbs>

          {!loading && session?.role === "AdminQM" && (
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddNewPIC}
            >
              Tambah PIC Baru
            </Button>
          )}
        </Box>

        <Grid container spacing={2} mt={2}>
          <Grid item xs={12} sm={6} md={4}>
            <FormControl fullWidth>
              <InputLabel>Fungsi</InputLabel>
              <Select
                value={departmentPIC || ""}
                onChange={(e) => setDepartmentPIC(e.target.value)}
                label="Fungsi"
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
        </Grid>
        <Box mt={4}>
          <PICTable
            title="PIC Notifikasi"
            fetchData={fetchData}
            totalCount={totalCount}
            router={router}
            PICData={picData}
            departments={departments}
            users={users}
            handleDeletePIC={handleDeletePIC}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            pageSize={pageSize} // Set pageSize to 10
            dataLimit={dataLimit} // Set dataLimit to 10
          />
        </Box>
      </>
    </BaseCard>
  );
};

export default Page;
