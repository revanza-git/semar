"use client";
import React, { useState, useEffect } from "react";
import {
  Box,
  Breadcrumbs,
  Link,
  Typography,
  Button,
} from "@mui/material";
import BaseCard from "../../components/shared/DashboardCard";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import useTypeData from "./hooks/useTypeData";
import TypeTable from "./components/TypeTable";

const Page = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const loading = status === "loading";

  const {
    fetchData,
    typeData,
    totalCount,
    type,
    setType,
    currentPage,
    setCurrentPage,
    pageSize,
    setPageSize,
    dataLimit,
    setDataLimit,
    handleDeleteType,
  } = useTypeData();

  const handleAddNewType = () => {
    router.push("/settings/type/create/type");
  };
  const handleAddNewCategory = () => {
    router.push("/settings/type/create/category");
  };

  useEffect(() => {
    setPageSize(5);
  }, [setPageSize, setDataLimit]);

  return (
    <BaseCard>
      <Box>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Breadcrumbs aria-label="breadcrumb">
            <Link color="inherit" onClick={() => router.push("/")}>
              Home
            </Link>
            <Typography color="textPrimary">Settings</Typography>
            <Typography color="textPrimary">Type</Typography>
          </Breadcrumbs>

          {!loading && session?.role === "AdminQM" && (
            <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleAddNewType}
              >
                Tambah Tipe Baru
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleAddNewCategory}
              >
                Tambah Category Baru
              </Button>
            </Box>
          )}
        </Box>

        <Box mt={4}>
          <TypeTable
            title="Type Notifikasi"
            fetchData={fetchData}
            totalCount={totalCount}
            router={router}
            typeData={typeData}
            handleDeleteType={handleDeleteType}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            pageSize={pageSize}
            dataLimit={dataLimit}
          />
        </Box>
      </Box>
    </BaseCard>
  );
};

export default Page;