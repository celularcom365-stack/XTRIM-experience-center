import { NextResponse } from "next/server";

export async function POST(request){

    const data = await request.json();
    
    return NextResponse.json(/^09\d{8}$/.test(data.telefono))
}