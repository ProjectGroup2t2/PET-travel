"use client";
import { Card, CardContent } from "@/components/ui/card";
import { User, Clock, Heart, MapPin, Facebook, Instagram, MessageCircle, Twitter } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function HistoryPage() {
    const [packages, setPackages] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const getToken = () => {
        const token = sessionStorage.getItem('auth.jwt');
        console.log('Retrieved token:', token ? 'Token exists' : 'No token found');
        return token;
    };

    useEffect(() => {
        const fetchPackages = async () => {
            try {
                setIsLoading(true);
                const token = getToken();

                if (!token) {
                    throw new Error('No authentication token found. Please log in.');
                }

                const url = `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/history-packages`; // ปรับ endpoint
                console.log('Fetching from:', url);
                console.log('Using token:', token.substring(0, 10) + '...');

                const response = await fetch(url, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                });

                console.log('Response status:', response.status);

                if (!response.ok) {
                    const errorText = await response.text();
                    console.log('Error response:', errorText);
                    if (response.status === 401) {
                        throw new Error('Unauthorized: Please log in again');
                    }
                    throw new Error(`Failed to fetch packages: ${response.status} - ${errorText || 'Unknown error'}`);
                }

                const data = await response.json();
                console.log('Received data:', data);

                const packagesArray = Array.isArray(data.data) ? data.data : data || [];
                setPackages(packagesArray);
            } catch (err) {
                console.error('Fetch error:', err);
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchPackages();
    }, []);

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p>Loading packages...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center gap-4">
                <p className="text-red-500">Error: {error}</p>
                {error.includes('Unauthorized') && (
                    <Link href="/login" className="text-blue-600 hover:underline">
                        Go to Login
                    </Link>
                )}
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col">
            <main className="container mx-auto px-4 py-8 flex-grow">
                <h1 className="text-4xl font-bold mb-8">History</h1>

                {packages.length === 0 ? (
                    <p className="text-center text-gray-500">No package history found</p>
                ) : (
                    <div className="space-y-6">
                        {packages.map((pkg) => (
                            <Card key={pkg.id} className="overflow-hidden border rounded-lg">
                                <CardContent className="p-0">
                                    <div className="flex flex-col md:flex-row">
                                        <div className="md:w-1/4 relative h-48 md:h-auto">
                                            <Image
                                                src={pkg.attributes?.images?.data?.[0]?.attributes?.url || "/placeholder.svg"}
                                                alt={pkg.attributes?.title ? `Image of ${pkg.attributes.title} package` : "Package image"}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                        <div className="flex-1 p-4">
                                            <div className="flex justify-between items-start">
                                                <div className="flex items-center gap-1 text-teal-600">
                                                    <Heart className="h-5 w-5 fill-teal-600" />
                                                    <span className="font-medium">
                                                        {pkg.attributes?.reviews?.data?.length > 0
                                                            ? (pkg.attributes.reviews.data.reduce((sum, r) => sum + r.attributes.rating, 0) / pkg.attributes.reviews.data.length).toFixed(1)
                                                            : 'N/A'}
                                                    </span>
                                                    <span className="text-gray-500">({pkg.attributes?.reviews?.data?.length || 0})</span>
                                                </div>
                                                <div className="flex items-center gap-1 text-gray-600">
                                                    <Clock className="h-4 w-4" />
                                                    <span>{pkg.attributes?.duration || 'N/A'}</span>
                                                </div>
                                            </div>

                                            <h2 className="text-2xl font-bold mt-2">{pkg.attributes?.title || 'Untitled'}</h2>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                                                <div className="space-y-3">
                                                    <div className="flex items-center gap-2">
                                                        <User className="h-5 w-5 text-gray-600" />
                                                        <div>
                                                            <div className="text-gray-500">Travelers</div>
                                                            <div>{pkg.attributes?.capacity || 0} / {pkg.attributes?.capacity_max || 0} คน</div>
                                                        </div>
                                                    </div>

                                                    <div className="flex items-center gap-2">
                                                        <Clock className="h-5 w-5 text-gray-600" />
                                                        <div>
                                                            <div className="text-gray-500">Time of Tour</div>
                                                            <div>{pkg.attributes?.timeOfTour?.start || 'N/A'}</div>
                                                        </div>
                                                    </div>

                                                    <div className="flex items-center gap-2">
                                                        <MapPin className="h-5 w-5 text-gray-600" />
                                                        <div>
                                                            <div className="text-gray-500">Description</div>
                                                            <div>{pkg.attributes?.description || 'N/A'}</div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div>
                                                    <div className="mb-2">
                                                        <h3 className="font-semibold text-lg">Specials</h3>
                                                        {pkg.attributes?.specials?.length > 0 ? (
                                                            pkg.attributes.specials.map((special, index) => (
                                                                <div key={index} className="text-gray-600">
                                                                    {special}
                                                                </div>
                                                            ))
                                                        ) : (
                                                            <div className="text-gray-600">N/A</div>
                                                        )}
                                                    </div>

                                                    <div className="mt-auto flex justify-end items-end h-full">
                                                        <div className="text-right">
                                                            <div className="text-xl">Total</div>
                                                            <div className="text-2xl font-bold">
                                                                <span className="text-blue-600">THB {pkg.attributes?.price || 0}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-gray-50 p-2 text-right">
                                        <span className="text-gray-600">
                                            {pkg.attributes?.payments?.data?.[0]?.attributes?.payment_status || 'Not Paid'}
                                        </span>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}
            </main>

            <footer className="bg-[#2D776E] text-white py-8 w-full">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <Image 
                            src="/logoW.png" 
                            alt="PETI Logo" 
                            width={170} 
                            height={90} 
                        />
                        <div className="text-center">
                            <p className="font-semibold">Contact us</p>
                            <p>yimwired@gmail.com</p>
                        </div>
                        <div className="text-center">
                            <p className="font-semibold">About</p>
                            <p>@PET2025</p>
                        </div>
                        <div className="flex gap-4">
                            <Link href="#" className="hover:text-[#24685F]"><Facebook className="w-6 h-6" /><span className="sr-only">Facebook</span></Link>
                            <Link href="#" className="hover:text-[#24685F]"><Instagram className="w-6 h-6" /><span className="sr-only">Instagram</span></Link>
                            <Link href="#" className="hover:text-[#24685F]"><MessageCircle className="w-6 h-6" /><span className="sr-only">MessageCircle</span></Link>
                            <Link href="#" className="hover:text-[#24685F]"><Twitter className="w-6 h-6" /><span className="sr-only">Twitter</span></Link>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}