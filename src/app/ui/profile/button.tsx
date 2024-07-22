import Link from "next/link";
import { deleteProduct } from "@/app/lib/actions";

export function ProfileEditButton({ userId }: { userId: string }) {
  return (
    <Link
      href={`/profile/${userId}/edit_profile`}
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
    >
      {" "}
      EDIT
    </Link>
  );
}

export function ProductEditButton({ productId }: { productId: string }) {
  return (
    <Link
      href={`/profile/${productId}/edit_product`}
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
    >
      {" "}
      EDIT{" "}
    </Link>
  );
}

export function ProductCreateButton({ userId }: { userId: string }) {
  return (
    <Link
      href={{
        pathname: "/profile/create",
        query: { userId: userId },
      }}
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
    >
      {" "}
      CREATE NEW PRODUCT{" "}
    </Link>
  );
}

export function DeleteProductButton({ id }: { id: string }) {
  const deleteProductWithId = deleteProduct.bind(null, id);
  return (
    <form action={deleteProductWithId}>
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        {" "}
        DELETE{" "}
      </button>
    </form>
  );
}
