// src/middleware.ts
// middleware یا میان افزرا تا زمان کاربر لاگین نشده نمی تواند به صحفه ثبت اعلان یا صحفه دریافت محصول بره
import { NextResponse, NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token =
    request.cookies.get("next-auth.session-token") ||
    request.cookies.get("__Secure-next-auth.session-token");

  // اگر توکن نداشت → ریدایرکت
  if (!token) {
    return NextResponse.redirect(
      new URL("/login", request.url)
    );
  }

  // اگر توکن داشت → اجازه بده ادامه بدهد
  return NextResponse.next();
}

export const config = {
  // matcher: ["/dashboard/:path*","/create_ad/:path*" ],
  matcher: ["/about/:path*" ],
};

