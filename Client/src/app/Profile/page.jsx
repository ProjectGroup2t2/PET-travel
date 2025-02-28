import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import Link from "next/link";
import { Facebook, Instagram, MessageCircle, Twitter } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

export default function AccountPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow max-w-4xl mx-auto p-6 w-full">
        <h1 className="text-3xl font-bold mb-6 text-left">My Account</h1>

        <div className="mt-10">
          <div className="flex flex-col items-center mb-6">
            <Avatar className="w-24 h-24">
              <AvatarImage src="/path-to-profile-image.jpg" alt="User profile" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <p className="mt-4 text-xl font-semibold">Hi, Name</p>
          </div>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>First Name</Label>
                  <Input type="text" placeholder="John" />
                </div>
                <div>
                  <Label>Last Name</Label>
                  <Input type="text" placeholder="Doe" />
                </div>
                <div className="md:col-span-2">
                  <Label>Email</Label>
                  <Input type="email" placeholder="john.doe@example.com" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Saved Credit Cards</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <Label>Card Number</Label>
                  <Input type="text" value="**** **** **** 1234" disabled />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Expiry Date</Label>
                    <Input type="text" placeholder="MM/YY" />
                  </div>
                  <div>
                    <Label>CVV</Label>
                    <Input type="text" placeholder="123" />
                  </div>
                </div>
                <p className="text-gray-500 text-sm">Visa and MasterCard</p>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button className="bg-[#2D776E] hover:bg-[#24685F] text-white">
              Save Changes
            </Button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[#2D776E] text-white py-8 w-full">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* โลโก้ */}
            <Image
              src="/logoW.png"
              alt="PETI Logo"
              width={170}
              height={90}
            />

            {/* ข้อมูลติดต่อ */}
            <div className="text-center">
              <p className="font-semibold">Contact us</p>
              <p>yimwired@gmail.com</p>
            </div>

            {/* เกี่ยวกับ */}
            <div className="text-center">
              <p className="font-semibold">About</p>
              <p>@PET2025</p>
            </div>

            {/* ไอคอนโซเชียลมีเดียพร้อมลิงก์ */}
            <div className="flex gap-4">
              <Link href="#" className="hover:text-[#24685F]">
                <Facebook className="w-6 h-6" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="hover:text-[#24685F]">
                <Instagram className="w-6 h-6" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="hover:text-[#24685F]">
                <MessageCircle className="w-6 h-6" />
                <span className="sr-only">MessageCircle</span>
              </Link>
              <Link href="#" className="hover:text-[#24685F]">
                <Twitter className="w-6 h-6" />
                <span className="sr-only">Twitter</span>
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}