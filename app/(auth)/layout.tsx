import Image from "next/image";
import React from "react";

export default function AuthLayout({children}:{children:React.ReactNode}){
    return <main className="max-w-4xl mx-auto p-2 md:px-6 md:py-4 flex h-screen justify-between">
        <section className="h-full w-full flex items-center justify-center">{children}</section>
        <section className="h-full w-full flex justify-center items-center">
            <Image src={'/auth-image.svg'} alt="auth-image" width={350} height={350}/>
        </section>
    </main>
}