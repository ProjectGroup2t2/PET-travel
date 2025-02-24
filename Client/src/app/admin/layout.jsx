import { LayoutDashboard, Bus, Package, LogOut } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function AdminLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-60 min-h-screen bg-white border-r">
        <div className="p-6 border-b">
          <Link href="/admin" className="flex items-center">
            <img
                  src="/logo.svg"
                  alt=""
                  className="w-20 h-20 rounded-lg object-cover"
                 
                />
          </Link>
        </div>

        <nav className="p-4 space-y-2">
          <Link href="/admin" className="block">
            <Button variant="ghost" className="w-full justify-start">
              <LayoutDashboard className="mr-2 h-4 w-4" />
              Dashboard
            </Button>
          </Link>

          <Link href="/admin/tours" className="block">
            <Button variant="ghost" className="w-full justify-start">
              <Bus className="mr-2 h-4 w-4" />
              Tours
            </Button>
          </Link>

          <Link href="/admin/packages" className="block">
            <Button variant="ghost" className="w-full justify-start">
              <Package className="mr-2 h-4 w-4" />
              Packages
            </Button>
          </Link>

          <Link href="/login" className="block mt-auto">
            <Button variant="ghost" className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50">
              <LogOut className="mr-2 h-4 w-4" />
              Sign out
            </Button>
          </Link>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1">{children}</div>
    </div>
  )
}

