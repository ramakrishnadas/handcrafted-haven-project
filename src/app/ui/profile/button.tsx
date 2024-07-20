import Link from "next/link";
import { deleteProduct } from "@/app/lib/actions";

export function ProfileEditButton({ userId }: { userId: string }) {
  return (
    <Link
      href={`/profile/${userId}/edit_profile`}
      className="m-3 bg-customGreen rounded-md p-1 w-1/6"
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
      className="m-3 bg-customGreen rounded-md p-1 w-1/6"
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
      className="m-3 bg-gray-800 rounded-md p-1 w-1/6 text-white"
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
        className="m-3 bg-gray-800 rounded-md p-1 w-1/6 text-white"
      >
        {" "}
        DELETE{" "}
      </button>
    </form>
  );
}
