// pages/admin/tours/edit/[id].jsx
import EditTourForm from "../EditTourForm";

export default async function EditTourPage({ params }) {
  let initialTour = {
    title: "",
    price: "",
    description: "",
    duration: "",
    capacity_max: "",
    capacity: "",
    images: [],
  };
  let error = null;

  try {
    const url = `${process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337"}/api/packages/${params.id}?populate=images`;
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

    const tourData = data.data;
    if (!tourData) {
      throw new Error(`ไม่พบทัวร์ที่มี ID: ${params.id}`);
    }

    initialTour = {
      title: tourData.attributes.title || "",
      price: tourData.attributes.price || "",
      description: tourData.attributes.description?.[0]?.children?.[0]?.text || "",
      duration: tourData.attributes.duration || "",
      capacity_max: tourData.attributes.capacity_max || "",
      capacity: tourData.attributes.capacity || "",
      images: tourData.attributes.images?.data?.map((img) => ({
        id: img.id,
        url: `${process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337"}${img.attributes.url}`,
      })) || [],
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