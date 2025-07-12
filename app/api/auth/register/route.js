import {  NextResponse } from "next/server"

export async function POST(request) {
  try {
    const { name, email, password } = await request.json()

    // Validate input
    if (!name || !email || !password) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 })
    }

    if (password.length < 6) {
      return NextResponse.json({ message: "Password must be at least 6 characters long" }, { status: 400 })
    }

    // Check if user already exists (mock check)
    const existingUsers = ["test@example.com", "admin@collegebook.com"]

    if (existingUsers.includes(email)) {
      return NextResponse.json({ message: "User with this email already exists" }, { status: 409 })
    }

    // In a real app, you would:
    // 1. Hash the password
    // 2. Save user to database
    // 3. Send verification email

    // Mock successful registration
    return NextResponse.json({ message: "User registered successfully" }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
