import Image from "next/image";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={100}
          height={20}
          priority
        />
       <div>
        <h1 className="mt-6 text-4xl font-bold text-zinc-800 dark:text-zinc-100 sm:text-5xl">Let's get started with Methabolic!</h1>
        <p className="mt-6 text-zinc-600 dark:text-zinc-400 sm:text-lg">
          This is the main page of your Methabolic application. You can start customizing it by editing the <code className="rounded-md bg-zinc-100 px-2 py-1 font-mono text-sm text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200">app/page.tsx</code> file.
        </p>
       </div>
        
      </main>
    </div>
  );
}
