import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex h-full items-center justify-center">
      <SignIn
        appearance={{
          elements: {
            formButtonPrimary: "bg-red-500 hover:bg-red-600 active:bg-red-700",
            footerActionLink: "text-red-500 hover:text-red-600",
          },
        }}
      />
    </div>
  );
}
