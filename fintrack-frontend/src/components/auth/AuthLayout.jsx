import Logo from "../common/Logo";

function AuthLayout({ children }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-100">

      <div className="mx-auto flex min-h-screen max-w-7xl">

        {/* Left Side */}

        <div className="hidden w-1/2 items-center justify-center lg:flex">

          <div className="max-w-md">

            <Logo />

            <h2 className="mt-10 text-5xl font-bold leading-tight text-slate-800">
              Manage your money smarter.
            </h2>

            <p className="mt-6 text-lg text-slate-600">
              Track expenses, budgets, analytics,
              reports and monthly insights —
              all in one place.
            </p>

            <div className="mt-16 text-9xl">
              📊
            </div>

          </div>

        </div>

        {/* Right Side */}

        <div className="flex flex-1 items-center justify-center p-8">
          {children}
        </div>

      </div>

    </div>
  );
}

export default AuthLayout;