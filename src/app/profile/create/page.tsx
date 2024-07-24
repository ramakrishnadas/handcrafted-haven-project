import CreateForm from "../../ui/profile/create_form";
import { Suspense } from "react";
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Create Product'
}

export default async function Page() {
  return (
    <Suspense>
      <div>
        <CreateForm />
      </div>
    </Suspense>
  );
}
