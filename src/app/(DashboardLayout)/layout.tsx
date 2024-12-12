"use client";
import {
  styled,
  Container,
  Box,
  useTheme,
  Alert,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import React, { useEffect, useState } from "react";
import Header from "@/app/(DashboardLayout)/layout/header/Header";
import Sidebar from "@/app/(DashboardLayout)/layout/sidebar/Sidebar";
import Footer from "./layout/footer/page";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const MainWrapper = styled("div")(() => ({
  // display: "flex",
  // minHeight: "100vh",
  // width: "100%",
}));

const PageWrapper = styled("div")(() => ({
  display: "flex",
  flexGrow: 1,
  paddingBottom: "60px",
  flexDirection: "column",
  zIndex: 1,
  backgroundColor: "transparent",
}));

interface Props {
  children: React.ReactNode;
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [isAlertOpen, setAlertOpen] = useState(true);
  const theme = useTheme();
  const { data: session, status } = useSession();

  const router = useRouter();

  useEffect(() => {
    if (status !== "loading" && !session) {
      router.push("/login"); // redirect to login if user is not authenticated
    }
  }, [session, status, router]);

  if (status === "loading") return <div>Loading...</div>;
  // If user is not authenticated, don't render the MainWrapper
  if (!session) return null; // Loading state

  return (
    <MainWrapper className="mainwrapper">
      {/* ------------------------------------------- */}
      {/* Header */}
      {/* ------------------------------------------- */}
      <Header toggleMobileSidebar={() => setMobileSidebarOpen(true)} />

      {/* ------------------------------------------- */}
      {/* page Wrapper */}
      {/* ------------------------------------------- */}
      <PageWrapper
        className="page-wrapper"
        sx={{
          [theme.breakpoints.up("lg")]: {
            ml: `200px`,
          },
        }}
      >
        {/* ------------------------------------------- */}
        {/* Sidebar */}
        {/* ------------------------------------------- */}
        <Sidebar
          isSidebarOpen={isSidebarOpen}
          isMobileSidebarOpen={isMobileSidebarOpen}
          onSidebarClose={() => setMobileSidebarOpen(false)}
        />

        {/* ------------------------------------------- */}
        {/* PageContent */}
        {/* ------------------------------------------- */}
        <Container
          sx={{
            paddingTop: "20px",
            maxWidth: "1200px",
          }}
        >
          {/* ------------------------------------------- */}
          {/* Page Route */}
          {/* ------------------------------------------- */}
          <Box mt={2} sx={{ minHeight: "calc(100vh - 170px)" }}>
            {isAlertOpen && (
              <Alert
                severity="info"
                action={
                  <IconButton
                    aria-label="close"
                    color="inherit"
                    size="small"
                    onClick={() => setAlertOpen(false)}
                  >
                    <CloseIcon fontSize="inherit" />
                  </IconButton>
                }
                sx={{ marginBottom: 2 }} // Add margin bottom
              >
                Pemberitahuan! Seluruh dokumen di dalam Portal merupakan dokumen
                terkendali. dokumen yang diunduh dan atau dicetak dari media
                intranet/Portal Peraturan Internal & Eksternal menjadi dokumen
                tidak terkendali.
              </Alert>
            )}
            {children}
          </Box>
          {/* ------------------------------------------- */}
          {/* End Page */}
          {/* ------------------------------------------- */}

          {/* ------------------------------------------- */}
          {/* Footer */}
          {/* ------------------------------------------- */}
          <Footer />
        </Container>
      </PageWrapper>
    </MainWrapper>
  );
}
