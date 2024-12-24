"use client";
import {
  styled,
  Container,
  Box,
  useTheme,
  Alert,
  IconButton,
  CircularProgress,
  Backdrop,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import React, { useEffect, useState } from "react";
import Header from "@/app/(DashboardLayout)/layout/header/Header";
import Sidebar from "@/app/(DashboardLayout)/layout/sidebar/Sidebar";
import Footer from "./layout/footer/page";
import { useSession } from "next-auth/react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

const MainWrapper = styled("div")(() => ({}));

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
  const [loading, setLoading] = useState(false);
  const theme = useTheme();
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (status !== "loading" && !session) {
      router.push("/login"); // redirect to login if user is not authenticated
    }
  }, [session, status, router]);

  useEffect(() => {
    const handleStart = () => setLoading(true);
    const handleComplete = () => setLoading(false);

    handleStart();
    handleComplete();

    return () => setLoading(false);
  }, [pathname, searchParams]);

  if (status === "loading") return <div>Loading...</div>;
  if (!session) return null; // Loading state for unauthenticated users

  return (
    <MainWrapper className="mainwrapper">
      {/* Loading Indicator */}
      <Backdrop
        sx={{ color: "#fff", zIndex: theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      {/* Header */}
      <Header toggleMobileSidebar={() => setMobileSidebarOpen(true)} />

      {/* Page Wrapper */}
      <PageWrapper
        className="page-wrapper"
        sx={{
          [theme.breakpoints.up("lg")]: {
            ml: `200px`,
          },
        }}
      >
        {/* Sidebar */}
        <Sidebar
          isSidebarOpen={isSidebarOpen}
          isMobileSidebarOpen={isMobileSidebarOpen}
          onSidebarClose={() => setMobileSidebarOpen(false)}
        />

        {/* Page Content */}
        <Container
          sx={{
            paddingTop: "20px",
            maxWidth: "1200px",
          }}
        >
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
                sx={{ marginBottom: 2 }}
              >
                Pemberitahuan! Seluruh dokumen di dalam Portal merupakan dokumen
                terkendali. dokumen yang diunduh dan atau dicetak dari media
                intranet/Portal Peraturan Internal & Eksternal menjadi dokumen
                tidak terkendali.
              </Alert>
            )}
            {children}
          </Box>

          {/* Footer */}
          <Footer />
        </Container>
      </PageWrapper>
    </MainWrapper>
  );
}
