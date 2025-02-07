"use client";

import { useState, useEffect } from "react";
import {
  Button,
  Grid,
  Alert,
  Card,
  CardContent,
  FormControl,
  FormLabel,
  Box,
  CircularProgress,
  Breadcrumbs,
  Link,
  Typography,
  TextField,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useRouter } from "next/navigation";
import { createTypeData } from "../../api/type";
import useTypeData from "../../hooks/useTypeData";

const CreateType = () => {
  const router = useRouter();

  const { categoryData } = useTypeData();

  const [typeData, setTypeData] = useState<any>({
    deskripsi: "",
    type: "",
  });

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleTextFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTypeData({ ...typeData, [name]: value });
  };

  const handleCategoryChange = (e: SelectChangeEvent<string>) => {
    setTypeData({ ...typeData, type: e.target.value });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);

    if (!typeData.deskripsi || !typeData.type) {
      setError("Please fill in all required fields");
      setIsSubmitting(false);
      return;
    }

    try {
      await createTypeData(typeData);
      setSuccess("Data Successfully Saved");
      window.scrollTo({ top: 0, behavior: "smooth" });
      setTimeout(() => router.back(), 1000);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unknown error occurred");
      }
      window.scrollTo({ top: 0, behavior: "smooth" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardContent>
          <Breadcrumbs aria-label="breadcrumb">
            <Link color="inherit" onClick={() => router.push("/")}>
              Home
            </Link>
            <Typography color="textPrimary">Settings</Typography>
            <Link color="inherit" onClick={() => router.push("/settings/type")}>
              Type
            </Link>
            <Typography color="textPrimary">Create</Typography>
          </Breadcrumbs>

          <Grid container spacing={3} mt={2}>
            <Grid item xs={12} lg={12}>
              <Button onClick={() => router.back()}>
                <ArrowBackIcon />
              </Button>
            </Grid>

            {error && (
              <Grid item xs={12}>
                <Alert severity="error">{error}</Alert>
              </Grid>
            )}
            {success && (
              <Grid item xs={12}>
                <Alert severity="success">{success}</Alert>
              </Grid>
            )}

            <Grid item xs={12} md={6}>
              <FormControl fullWidth margin="normal" variant="outlined">
                <FormLabel htmlFor="deskripsi">Nama Tipe Dokumen</FormLabel>
                <TextField
                  id="deskripsi"
                  name="deskripsi"
                  value={typeData.deskripsi}
                  onChange={handleTextFieldChange}
                  fullWidth
                  variant="outlined"
                  required
                />
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth margin="normal" variant="outlined">
                <FormLabel htmlFor="categories">Kategori</FormLabel>
                <Select
                  value={typeData.type}
                  onChange={handleCategoryChange}
                  label="categories"
                  required
                >
                  {categoryData.map((c: any) => (
                    <MenuItem
                      key={c.semarTypeCategoryCode}
                      value={c.semarTypeCategoryCode}
                    >
                      {c.deskripsi}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <Box textAlign="right" mt={2}>
                <Button
                  type="submit"
                  variant="contained"
                  disabled={isSubmitting}
                  color={isSubmitting ? "warning" : "primary"}
                >
                  {isSubmitting ? <CircularProgress size={24} /> : "Save"}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </form>
  );
};

export default CreateType;