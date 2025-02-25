import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card.tsx";
import { Input } from "@/components/ui/input.jsx";
import { Button } from "@/components/ui/button.jsx";
import { Label } from "@/components/ui/label.tsx";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar.tsx";

export default function AccountPage() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-8">My Account</h1>
      
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Profile Picture</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center gap-4">
          <Avatar className="w-24 h-24">
            <AvatarImage src="/path-to-profile-image.jpg" alt="User profile" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <Button>Change Picture</Button>
        </CardContent>
      </Card>
      
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
          <p className="text-gray-500">No saved credit cards available.</p>
        </CardContent>
      </Card>
      
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Booking History</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500">No booking history available now.</p>
        </CardContent>
      </Card>
      
      <Button className="w-full md:w-auto">Save Changes</Button>
    </div>
  );
}
