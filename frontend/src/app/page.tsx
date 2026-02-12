import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-950">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          Welcome to&nbsp;
          <code className="font-bold">TaskFlow</code>
        </p>
      </div>

      <div className="flex flex-col items-center justify-center mt-20 text-center">
        <h1 className="text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-7xl">
          Manage your tasks <span className="text-blue-600">securely</span>.
        </h1>
        <p className="mt-6 text-xl text-slate-600 dark:text-slate-400 max-w-2xl">
          A scalable task management system with role-based access control, JWT authentication, and a modern UI.
        </p>
        
        <div className="mt-10 flex gap-4">
          <Link 
            href="/login" 
            className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/30"
          >
            Sign In
          </Link>
          <Link 
            href="/register" 
            className="px-8 py-3 bg-white text-slate-900 font-semibold rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors shadow-sm"
          >
            Register
          </Link>
        </div>
      </div>

      <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl w-full">
        <div className="p-6 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700">
          <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-white">Secure Auth</h3>
          <p className="text-slate-600 dark:text-slate-400">JWT authentication with httpOnly cookies for maximum security.</p>
        </div>
        <div className="p-6 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700">
          <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-white">Role-Based Access</h3>
          <p className="text-slate-600 dark:text-slate-400">User and Admin roles with specific permissions and views.</p>
        </div>
        <div className="p-6 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700">
          <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-white">Full CRUD</h3>
          <p className="text-slate-600 dark:text-slate-400">Create, Read, Update, and Delete your tasks seamlessly.</p>
        </div>
      </div>
    </main>
  );
}
