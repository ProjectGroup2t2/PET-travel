import { Bell, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function AdminHeader({ title = "Admin, dashboard" }) {
  return (
    <header className="bg-white px-6 py-4 flex items-center justify-between border-b">
      <h1 className="text-xl">{title}</h1>
      <div className="flex items-center gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input className="pl-10 w-[300px] bg-gray-50" placeholder="Search" type="search" />
        </div>
        <Button variant="ghost" size="icon" className="text-gray-600">
          <Bell className="h-5 w-5" />
        </Button>
        <div className="flex items-center gap-2">
          <span className="text-emerald-600">Hi, Admin</span>
          <div className="h-8 w-8 rounded-full bg-gray-900" />
        </div>
      </div>
    </header>
  )
}

