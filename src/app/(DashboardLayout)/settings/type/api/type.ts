export const fetchTypeData = async (
  Type?: string,
  pageNumber?: number,
  pageSize?: number,
  dataLimit?: number
) => {
  const queryParams: { [key: string]: string } = {};

  if (Type) {
    queryParams.Type = Type;
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
      `${process.env.NEXT_PUBLIC_BASE_URL}/SemarType/v2?${urlSearchParams.toString()}`
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
    console.error("Error fetching semar type data:", error);
    return {
      data: [],
      totalCount: 0,
    };
  }
};

export const deleteType = async (id: any) => {
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/SemarType/v2/${id}`;
  try {
    const response = await fetch(url, {
      method: "DELETE", // Specify the method
    });
    if (!response.ok) {
      throw new Error("Failed to delete Semar Type");
    }
    // Handle success response
  } catch (error) {
    console.error("Error deleting Semar Type:", error);
    // Handle errors
  }
};

export const fetchTypeDataById = async (id: any) => {
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/SemarType/v2/${id}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to fetch Semar Type data");
  }
  return await response.json();
};

export const createTypeData = async (typeData: any) => {
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/SemarType/v2`;
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(typeData),
    });
    if (!response.ok) {
      throw new Error(await response.text());
    }
    return await response.json();
  } catch (error) {
    console.error("Error creating Semar data:", error);
    throw error;
  }
};

export const fetchCategories = async () => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/SemarType/categories`);
  return await response.json();
};

export const createCategoryData = async (typeData: any) => {
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/SemarType/categories`;
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(typeData),
    });
    if (!response.ok) {
      throw new Error(await response.text());
    }
    return await response.json();
  } catch (error) {
    console.error("Error creating Semar data:", error);
    throw error;
  }
};

export const deleteCategory = async (id: any) => {
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/SemarType/categories/${id}`;
  try {
    const response = await fetch(url, {
      method: "DELETE", // Specify the method
    });
    if (!response.ok) {
      throw new Error("Failed to delete Semar Type");
    }
    // Handle success response
  } catch (error) {
    console.error("Error deleting Semar Type:", error);
    // Handle errors
  }
};
