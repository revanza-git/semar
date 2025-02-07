// Report/Page.tsx
import React, { useState, useEffect } from "react";
import { Box, TextField, Button, Grid, Breadcrumbs, Link } from "@mui/material";
import BaseCard from "../../shared/DashboardCard";
import ActivityTable from "./components/ActivityTable"; // Ensure this path is correct
import useSemarData from "./hooks/useSemarData";
import { useRouter } from "next/navigation"; // Corrected import based on provided context
import { useSession } from "next-auth/react";
const Page = () => {
  const router = useRouter(); // Corrected based on standard Next.js routing
  const [open, setOpen] = useState(true);

  const {
    skNewData,
    stkNewData,
    engineeringNewData,
    lainlainNewData,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    fetchDataSK,
    fetchDataSTK,
    fetchDataEngineering,
    fetchDataLainlain,
    handleDeleteSemarActivity,
    semarTypes,
    departments,
    currentPageSK,
    setCurrentPageSK,
    currentPageSTK,
    setCurrentPageSTK,
    currentPageEngineering,
    setCurrentPageEngineering,
    currentPageLainlain,
    setCurrentPageLainlain,
    dataLimit,
    setDataLimit,
    pageSize,
    setPageSize,
    totalCountNewSK,
    totalCountNewSTK,
    totalCountNewEngineering,
    totalCountNewLainlain,
  } = useSemarData();

  useEffect(() => {
    setPageSize(3);
    setDataLimit(10);
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
          </Breadcrumbs>
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
        </Grid>

        <Box mt={4}>
          <ActivityTable
            title="Surat Keputusan Terbaru"
            semarData={skNewData} // Use skNewData
            router={router}
            handleDeleteSemarActivity={handleDeleteSemarActivity}
            open={open}
            setOpen={setOpen}
            semarTypes={semarTypes}
            departments={departments}
            pageSize={pageSize} // Set pageSize to 10
            currentPage={currentPageSK}
            setCurrentPage={setCurrentPageSK}
            totalCount={totalCountNewSK}
            fetchData={fetchDataSK}
            dataLimit={dataLimit} // Set dataLimit to 10
          />
        </Box>

        <Box mt={4}>
          <ActivityTable
            title="Sistem Tata Kerja Terbaru"
            semarData={stkNewData} // Use stkNewData
            router={router}
            handleDeleteSemarActivity={handleDeleteSemarActivity}
            open={open}
            setOpen={setOpen}
            semarTypes={semarTypes}
            departments={departments}
            pageSize={pageSize} // Set pageSize to 10
            currentPage={currentPageSTK}
            setCurrentPage={setCurrentPageSTK}
            totalCount={totalCountNewSTK}
            fetchData={fetchDataSTK}
            dataLimit={dataLimit} // Set dataLimit to 10
          />
        </Box>

        <Box mt={4}>
          <ActivityTable
            title="Engineering Terbaru"
            semarData={engineeringNewData} // Use stkNewData
            router={router}
            handleDeleteSemarActivity={handleDeleteSemarActivity}
            open={open}
            setOpen={setOpen}
            semarTypes={semarTypes}
            departments={departments}
            pageSize={pageSize} // Set pageSize to 10
            currentPage={currentPageEngineering}
            setCurrentPage={setCurrentPageEngineering}
            totalCount={totalCountNewEngineering}
            fetchData={fetchDataEngineering}
            dataLimit={dataLimit} // Set dataLimit to 10
          />
        </Box>

        <Box mt={4}>
          <ActivityTable
            title="Lain-lain Terbaru"
            semarData={lainlainNewData} // Use stkNewData
            router={router}
            handleDeleteSemarActivity={handleDeleteSemarActivity}
            open={open}
            setOpen={setOpen}
            semarTypes={semarTypes}
            departments={departments}
            pageSize={pageSize} // Set pageSize to 10
            currentPage={currentPageLainlain}
            setCurrentPage={setCurrentPageLainlain}
            totalCount={totalCountNewLainlain}
            fetchData={fetchDataLainlain}
            dataLimit={dataLimit} // Set dataLimit to 10
          />
        </Box>
      </>
    </BaseCard>
  );
};

export default Page;
