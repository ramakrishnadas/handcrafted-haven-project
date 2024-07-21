import CreateForm from "../../ui/profile/create_form";
import { Suspense } from "react";

export default async function Page() {
  return (
    <Suspense>
      <div>
        <CreateForm />
      </div>
    </Suspense>
  );
}
