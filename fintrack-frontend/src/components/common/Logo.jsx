function Logo() {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 text-2xl text-white shadow-lg">
        💰
      </div>

      <div>
        <h1 className="text-3xl font-bold text-slate-800">
          FinTrack
        </h1>

        <p className="text-sm text-slate-500">
          Personal Finance Manager
        </p>
      </div>
    </div>
  );
}

export default Logo;