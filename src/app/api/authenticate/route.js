import pool from "../../utils/dbconnect";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export async function POST(req) {
    const { email, password } = await req.json();
    const query = `SELECT * FROM users WHERE email = $1`;
    const values = [email];
    try {
        const res = await pool.query(query, values);
        
        // If user is not found
        if (res.rowCount === 0) {
            return NextResponse.json({ success: false, message: "User Not Found" });
        }

        const match = await bcrypt.compare(password, res.rows[0].password);
        if (!match) {
            return NextResponse.json({ success: false, message: "Wrong Password" });
        }

        // If password matches, create the JWT payload dynamically
        const payload = {
            sub: res.rows[0].id,           // Unique user ID from the database
            username: res.rows[0].username, // Username or email of the user
            email: res.rows[0].email        // User's email address
        };

        // Sign the token without expiration
        const token = jwt.sign(payload, process.env.JWT_SECRET);
        
        // Respond with the token
        return NextResponse.json({ success: true, message: "Success", token: token });
    } catch (error) {
        return NextResponse.json({ success: false, message: "Error" });
    }
}
