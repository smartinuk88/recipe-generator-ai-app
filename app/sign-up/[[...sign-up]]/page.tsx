import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex-1 grid gap-5 lg:grid-cols-2 justify-center items-center p-5 overflow-scroll bg-floral-500">
      <div className="text-center">
        <h1 className="text-5xl font-semibold mb-3">
          Recipe<span className="text-bluegreen-500">Gen</span>
        </h1>
        <p>This is a description about the app</p>
      </div>
      <SignUp />
    </div>
  );
}
