import CreateForm from "../../ui/profile/create_form";
import { Suspense } from "react";

export default async function Page() {
  return (
    <Suspense>
      <div>
        <h1>Upload an Image</h1>
        <CreateForm />
      </div>
    </Suspense>
  );
}
