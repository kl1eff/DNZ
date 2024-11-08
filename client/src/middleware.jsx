import { NextResponse } from 'next/server';
import { jwtDecode } from 'jwt-decode';

export function middleware(req) {
  const token = req.cookies.get('token'); 

  if (token) {
    const user = decodeToken(token.value);

    if (user.role === 'ADMIN') {
      return NextResponse.next();
    }
  }

  return NextResponse.redirect(new URL('/', req.url));
}

export const config = {
  matcher: '/dashboard/:path*', // Применяем middleware ко всем маршрутам, начинающимся с /dashboard
};


function decodeToken(token) {
  try {
    return jwtDecode(token);
  } catch (error) {
    return null;
  }  
}