import { useState, useEffect, useCallback } from "react";
import { fetchPICData, deletePIC, fetchUsers } from "../api/pic"; // Adjust the import path as needed
import { fetchDepartments } from "../../../components/dashboard/Report/api/semar";

interface Department {
  departmentID: string;
  deskripsi: string;
  induk: string;
  isDepartment: string;
}

interface Users {
  email: string;
  userName: string;
  name: string;
}

const usePICdata = () => {
  const [picData, setPICData] = useState([]);
  const [departmentPIC, setDepartmentPIC] = useState<string | undefined>();
  const [module, setModule] = useState<string | undefined>();
  const [currentPage, setCurrentPage] = useState(1);
  const [dataLimit, setDataLimit] = useState();
  const [pageSize, setPageSize] = useState(5);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [users, setUsers] = useState<Users[]>([]);
  const [totalCount, setTotalCount] = useState(0);

  const fetchData = useCallback(async () => {
    const { data: picDataResult, totalCount: totalCount } = await fetchPICData(
      departmentPIC,
      "semar",
      currentPage,
      pageSize,
      dataLimit
    );

    setPICData(picDataResult);
    setTotalCount(totalCount);
  }, [currentPage, pageSize, dataLimit, module, departmentPIC]);

  useEffect(() => {
    fetchData();
    fetchDepartments().then(setDepartments);
    fetchUsers().then(setUsers);
  }, [fetchData]);

  const handleDeletePIC = async (ID: any) => {
    try {
      await deletePIC(ID);
      fetchData();
      console.log("Semar Template deleted successfully");
    } catch (error) {
      console.error("Error deleting semar template:", error);
    }
  };

  const resetPageAndFetchData =
    (setter: (value: any) => void, fetchData: () => void) => (value: any) => {
      setter(value);
      fetchData();
    };

  return {
    fetchData,
    picData,
    totalCount,
    departmentPIC,
    setDepartmentPIC: resetPageAndFetchData(setDepartmentPIC, fetchData),
    currentPage,
    setCurrentPage,
    pageSize,
    setPageSize,
    dataLimit,
    setDataLimit,
    departments,
    users,
    handleDeletePIC,
  };
};

export default usePICdata;
