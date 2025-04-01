import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isVettesPage = createRouteMatcher("/vettes(.*)");
const isAddVettePage = createRouteMatcher("/add-vette(.*)");
const isTrendsPage = createRouteMatcher("/trends(.*)");
const isResourcesPage = createRouteMatcher("/resources(.*)");

export default clerkMiddleware(async (auth, req) => {
  if (
    isVettesPage(req) ||
    isAddVettePage(req) ||
    isTrendsPage(req) ||
    isResourcesPage(req)
  ) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
