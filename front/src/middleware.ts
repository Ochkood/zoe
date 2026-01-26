import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Хамгаалалтгүй буюу БҮХ ХҮНД харагдах хуудсууд
const isPublicRoute = createRouteMatcher([
  "/", 
  "/booking(.*)", 
  "/sign-in(.*)", 
  "/sign-up(.*)",
  "/api/uploadthing(.*)" // Хэрэв зураг хуулдаг бол
]);

export default clerkMiddleware(async (auth, req) => {
  if (!isPublicRoute(req)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    // Next.js-ийн дотоод файлуудаас бусад бүх route-ийг шүүнэ
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};