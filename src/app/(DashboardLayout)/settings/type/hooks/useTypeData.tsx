import { useState, useEffect, useCallback } from "react";
import { fetchTypeData, deleteType,fetchCategories,deleteCategory } from "../api/type"; // Adjust the import path as needed

interface Category {
  semarTypeCategoryCode: string;
  deskripsi: string;
}

const useTypedata = () => {
  const [typeData, setTypeData] = useState([]);
  const [type, setType] = useState<string | undefined>();
  const [categoryData, setCategoryData] = useState<Category[]>([]);
  const [category, setCategory] = useState<string | undefined>();
  const [currentPage, setCurrentPage] = useState(1);
  const [dataLimit, setDataLimit] = useState();
  const [pageSize, setPageSize] = useState(5);
  const [totalCount, setTotalCount] = useState(0);

  const fetchData = useCallback(async () => {
    const { data: typeDataResult, totalCount: totalCount } = await fetchTypeData(
      type,
      currentPage,
      pageSize,
      dataLimit
    );

    setTypeData(typeDataResult);
    setTotalCount(totalCount);
  }, [currentPage, pageSize, dataLimit, type]);

  useEffect(() => {
    fetchData();
    fetchCategories().then(setCategoryData);
  }, [fetchData]);

  const handleDeleteType = async (ID: any) => {
    try {
      await deleteType(ID);
      fetchData();
      console.log("Semar Type deleted successfully");
    } catch (error) {
      console.error("Error deleting semar type:", error);
    }
  };

  const handleDeleteCategory = async (ID: any) => {
    try {
      await deleteCategory(ID);
      fetchData();
      console.log("Semar Category deleted successfully");
    } catch (error) {
      console.error("Error deleting semar Category:", error);
    }
  };

  const resetPageAndFetchData =
    (setter: (value: any) => void, fetchData: () => void) => (value: any) => {
      setter(value);
      fetchData();
    };

  return {
    fetchData,
    typeData,
    categoryData,
    category,
    setCategory,
    totalCount,
    type,
    setType: resetPageAndFetchData(setType, fetchData),
    currentPage,
    setCurrentPage,
    pageSize,
    setPageSize,
    dataLimit,
    setDataLimit,
    handleDeleteType,
  };
};

export default useTypedata;
