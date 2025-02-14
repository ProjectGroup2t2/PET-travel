'use client'
import { Input } from '@/components/ui/input'


const page = () => {
  return (
    <form>
        Username <Input type="text" name="USERNAME"/>
        Password <Input type="password" name="PASSWORD"/>
        <button type="submit">Login</button>
    </form>
  )
}

export default page