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
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  SelectChangeEvent,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useRouter } from "next/navigation";
import { createCategoryData, fetchCategories, deleteCategory } from "../../api/type";

const CreateCategory = () => {
  const router = useRouter();

  const [categoryData, setCategoryData] = useState<any>({
    semarTypeCategoryCode: "",
    deskripsi: "",
  });

  const [category, setCategory] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        const categories = await fetchCategories();
        setCategory(categories);
      } catch (error) {
        setError("Failed to fetch categories");
      }
    };
    fetchCategoryData();
  }, []);

  const handleTextFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setCategoryData({
      ...categoryData,
      semarTypeCategoryCode: value,
      deskripsi: value,
    });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);

    if (!categoryData.deskripsi) {
      setError("Please fill in all required fields");
      setIsSubmitting(false);
      return;
    }

    try {
      await createCategoryData(categoryData);

      setSuccess("Data Successfully Saved");
      window.scrollTo({ top: 0, behavior: "smooth" });

      setTimeout(() => {
        router.back();
      }, 1000);
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

  const handleDeleteCategory = async () => {
    try {
      await deleteCategory(selectedCategory);
      setSuccess("Category Successfully Deleted");
      setOpen(false);
      setCategory(category.filter(c => c.semarTypeCategoryCode !== selectedCategory));
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unknown error occurred");
      }
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCategorySelectChange = (e: SelectChangeEvent<string>) => {
    setSelectedCategory(e.target.value);
  };

  return (
    <Box p={3}>
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
                <Button onClick={() => router.back()} startIcon={<ArrowBackIcon />}>
                  Back
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
                  <FormLabel htmlFor="deskripsi">Nama Kategori</FormLabel>
                  <TextField
                    id="deskripsi"
                    name="deskripsi"
                    value={categoryData.deskripsi}
                    onChange={handleTextFieldChange}
                    fullWidth
                    variant="outlined"
                    required
                  />
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
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={handleClickOpen}
                    sx={{ ml: 2 }}
                  >
                    Delete Category
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Delete Category</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please select a category to delete.
            </DialogContentText>
            <FormControl fullWidth margin="normal" variant="outlined">
              <Select
                value={selectedCategory}
                onChange={handleCategorySelectChange}
                label="Select Category"
                required
              >
                {category.map((c: any) => (
                  <MenuItem
                    key={c.semarTypeCategoryCode}
                    value={c.semarTypeCategoryCode}
                  >
                    {c.deskripsi}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={handleDeleteCategory} color="secondary">
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </form>
    </Box>
  );
};

export default CreateCategory;