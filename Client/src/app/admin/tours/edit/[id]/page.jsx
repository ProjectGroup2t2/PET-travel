// pages/admin/tours/edit/[id].jsx
import EditTourForm from "../EditTourForm";

export default async function EditTourPage({ params }) {
  let initialTour = {
    name: "",
    price: "",
    image: "/placeholder.svg",
  };
  let error = null;

  try {
    const url = `${process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337"}/api/packages/?params=${params.id}`;
    console.log("Fetching from URL:", url);

    const response = await fetch(url, { cache: "no-store" });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        `ไม่สามารถดึงข้อมูลทัวร์ได้: ${response.status} - ${errorData.error?.message || "Unknown error"}`
      );
    }

    const data = await response.json();
    console.log("API Response:", data);

    // หา package ที่มี id ตรงกับ params.id
    const tourData = data.data.find((item) => item.id === parseInt(params.id));
    if (!tourData) {
      throw new Error(`ไม่พบทัวร์ที่มี ID: ${params.id} ในข้อมูลที่ได้รับ`);
    }

    initialTour = {
      name: tourData.title || "",
      price: tourData.price || "",
      image: tourData.image?.data?.[0]?.attributes?.url
        ? `${process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337"}${tourData.image.data[0].attributes.url}`
        : "/placeholder.svg",
    };
  } catch (err) {
    error = err.message;
    console.error("Error fetching tour:", err);
  }

  return <EditTourForm initialTour={initialTour} error={error} tourId={params.id} />;
}

export async function generateStaticParams() {
  try {
    const url = `${process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337"}/api/packages`;
    console.log("Fetching all packages from:", url);
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Failed to fetch packages");
    }
    const data = await response.json();
    if (!data?.data) {
      console.error("No data found in API response:", data);
      return [];
    }
    return data.data.map((tour) => ({
      id: tour.id.toString(),
    }));
  } catch (error) {
    console.error("Error generating static params:", error);
    return [];
  }
}