"use client"

import { useState } from "react"
import Link from "next/link"


export default function WelcomePage() {
  const [selectedRole, setSelectedRole] = useState("")

  const handleRoleChange = (value) => {
    setSelectedRole(value)
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white p-4">
      <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">Join as a client or freelancer</h1>
      <RadioGroup
        value={selectedRole}
        onValueChange={handleRoleChange}
        className="grid gap-4 md:grid-cols-2 max-w-3xl w-full"
      >
        <Label htmlFor="client" className="cursor-pointer">
          <Card
            className={`flex flex-col items-center p-6 border-2 transition-colors duration-200 ${
              selectedRole === "client" ? "border-black" : "border-gray-200"
            }`}
          >
            <div className="flex justify-between w-full items-start">
              <User className="w-8 h-8 text-gray-700" />
              <RadioGroupItem value="client" id="client" className="w-5 h-5" />
            </div>
            <div className="mt-4 text-lg font-medium text-center">I'm a client, hiring for a project</div>
          </Card>
        </Label>
        <Label htmlFor="freelancer" className="cursor-pointer">
          <Card
            className={`flex flex-col items-center p-6 border-2 transition-colors duration-200 ${
              selectedRole === "freelancer" ? "border-black" : "border-gray-200"
            }`}
          >
            <div className="flex justify-between w-full items-start">
              <Briefcase className="w-8 h-8 text-gray-700" />
              <RadioGroupItem value="freelancer" id="freelancer" className="w-5 h-5" />
            </div>
            <div className="mt-4 text-lg font-medium text-center">I'm a freelancer, looking for work</div>
          </Card>
        </Label>
      </RadioGroup>

      <Button
        className="mt-8 px-8 py-3 text-lg font-semibold bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors duration-200"
        disabled={!selectedRole}
      >
        Create Account
      </Button>

      <p className="mt-6 text-sm text-gray-500">
        Already have an account?{" "}
        <Link href="/login" className="text-green-600 hover:underline">
          Log In
        </Link>
      </p>
    </div>
  )
}
