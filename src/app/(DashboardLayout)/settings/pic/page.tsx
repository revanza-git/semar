"use client";
// Template/Page.tsx
import React, { useState, useEffect } from "react";
import { Box, Grid, Breadcrumbs, Link, Typography } from "@mui/material";
import BaseCard from "../../components/shared/DashboardCard";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const Page = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const loading = status === "loading";

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
        </Box>
        <Grid container spacing={2} mt={2}></Grid>
        <Box mt={4}>tes</Box>
      </>
    </BaseCard>
  );
};

export default Page;
