import LoginForm from "./LoginForm";

export default function LoginPage() {
  return (
    <section className="min-h-screen grid place-items-center px-4 py-16">
      <div className="w-full max-w-sm">
        <div className="text-center">
          <p className="eyebrow">Amrutha Raagalaya</p>
          <div className="divider divider-center" />
          <h1 className="text-3xl">Admin sign in</h1>
          <p className="mt-3 text-[0.92rem] text-ink-2">Manage the gallery and blog posts.</p>
        </div>
        <LoginForm />
      </div>
    </section>
  );
}
