import ProfileForm from '../../../ui/profile/profile_form';
import {fetchFilteredUserDetails} from '../../../lib/data';

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const user = await fetchFilteredUserDetails(id);
  return (
    <div>
      <h1>Upload an Image</h1>
      <ProfileForm userData={user} />
    </div>
  );
}

