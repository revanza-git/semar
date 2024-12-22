export const fetchPICData = async (
  departmentPIC?: string,
  module?: string,
  pageNumber?: number,
  pageSize?: number,
  dataLimit?: number
) => {
  const queryParams: { [key: string]: string } = {};

  if (departmentPIC) {
    queryParams.departmentPIC = departmentPIC;
  }

  if (module) {
    queryParams.module = module;
  }

  if (pageNumber !== undefined) {
    queryParams.pageNumber = pageNumber.toString();
  }

  if (pageSize !== undefined) {
    queryParams.pageSize = pageSize.toString();
  }

  if (dataLimit !== undefined) {
    queryParams.dataLimit = dataLimit.toString();
  }

  const urlSearchParams = new URLSearchParams(queryParams);

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/PIC?${urlSearchParams.toString()}`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();

    return {
      data: result.data,
      totalCount: result.totalCount,
    };
  } catch (error) {
    console.error("Error fetching pic data:", error);
    return {
      data: [],
      totalCount: 0,
    };
  }
};

export const deletePIC = async (id: any) => {
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/PIC/${id}`;
  try {
    const response = await fetch(url, {
      method: "DELETE", // Specify the method
    });
    if (!response.ok) {
      throw new Error("Failed to delete PIC");
    }
    console.log("PIC deleted successfully");
    // Handle success response
  } catch (error) {
    console.error("Error deleting PIC:", error);
    // Handle errors
  }
};

export const fetchUsers = async () => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/User`);
  return await response.json();
};

export const fetchPICDataById = async (id: any) => {
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/PIC/${id}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to fetch PIC data");
  }
  return await response.json();
};

export const createPICData = async (picData: any) => {
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/PIC`;
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(picData),
    });
    if (!response.ok) {
      throw new Error(await response.text());
    }
    return await response.json();
  } catch (error) {
    console.error("Error creating PIC data:", error);
    throw error;
  }
};
