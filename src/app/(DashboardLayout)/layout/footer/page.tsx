"use client";
import React from "react";
import { Box, Typography } from "@mui/material";
import Link from "next/link";

const Footer = () => {
  return (
    <Box sx={{ pt: 6, textAlign: "center" }}>
      <Typography>
        © {new Date().getFullYear()} All rights reserved | Semar Version 2.0.0
      </Typography>
    </Box>
  );
};

export default Footer;
