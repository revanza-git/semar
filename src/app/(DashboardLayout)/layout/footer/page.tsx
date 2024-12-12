"use client";
import React from "react";
import { Box, Typography } from "@mui/material";
import Link from "next/link";

const Footer = () => {
  return (
    <Box sx={{ pt: 6, textAlign: "center" }}>
      <Typography>
        © {new Date().getFullYear()} All rights reserved by{" "}
        <Link
          href="http://nregas.pertamina.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Nusantara Regas
        </Link>{" "}
        | Semar Version 2
      </Typography>
    </Box>
  );
};

export default Footer;
