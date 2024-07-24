import ProfileForm from '../../../ui/profile/profile_form';
import {fetchFilteredUserDetails} from '../../../lib/data';
import { revalidatePath } from "next/cache";
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Edit Profile'
}

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  revalidatePath(`/profile`);
  const user = await fetchFilteredUserDetails(id);
  return (
    <div>
      <ProfileForm userData={user} />
    </div>
  );
}

