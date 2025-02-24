import {auth} from "@/auth"
import { apiAuthPrefix, authRoute, DEFAULT_REDIRECT_ROUTE, publicRoute } from "./route"

export default auth((req)=>{
    const isLoggedIn=!!req.auth
    const {nextUrl}=req
    const isApiAuthRoute=nextUrl.pathname.startsWith(apiAuthPrefix)
    const isPublicRoute=publicRoute.includes(nextUrl.pathname)
    const isAuthRoute=authRoute.includes(nextUrl.pathname)

    if(isApiAuthRoute){
        return
    }
    if(isAuthRoute){
        if(isLoggedIn){
            return Response.redirect(new URL(DEFAULT_REDIRECT_ROUTE,nextUrl))
        }
        return
    }
    if(!isPublicRoute && !isLoggedIn){
        return Response.redirect(new URL("/login",nextUrl))
    }
    return
})

export const config={
    matcher: [
        '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
        '/(api|trpc)(.*)',
      ],
}