'use server';
 
import { signIn, signOut } from "../../../auth";
import { AuthError } from "next-auth";
import { z } from "zod";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";


// Define the user schema using zod
const UserSchema = z.object({
  id: z.string(), // Include the id field
  firstName: z.string().min(1, 'First Name is required.'),
  lastName: z.string().min(1, 'Last Name is required.'),
  email: z.string().email('Invalid email address.'),
  password: z.string().min(6, 'Password must be at least 6 characters long.')
});

// Omit the id field for CreateUser schema
const CreateUser = UserSchema.omit({ id: true });

export type State = {
  errors?: {
    firstName?: string[];
    lastName?: string[];
    email?: string[];
    password?: string[];
  };
  message?: string | null;
};

export async function createUser(prevState: State, formData: FormData) {
  const validatedFields = CreateUser.safeParse({
    firstName: formData.get('firstName'),
    lastName: formData.get('lastName'),
    email: formData.get('email'),
    password: formData.get('password')
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Invalid Fields. Failed to Create User.'
    };
  }

  const { firstName, lastName, email, password } = validatedFields.data;

  // Check if the email already exists in the database
  let existingUser;
  try {
    existingUser = await sql`SELECT * FROM users WHERE email = ${email}`;
  } catch (error) {
    return { message: 'Database Error: Failed to Check Email.' };
  }

  if (existingUser.rows.length > 0) {
    return {
      errors: { email: ['Email already exists.'] },
      message: 'Email already exists. Failed to Create User.'
    };
  }

  // Generate a UUID for the user
  const userId = uuidv4();

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Join first and last name
  const name = firstName + " " + lastName;

  try {
    await sql`
      INSERT INTO users (id, name, email, password)
      VALUES (${userId}, ${name}, ${email}, ${hashedPassword})
    `;
  } catch (error) {
    return { message: 'Database Error: Failed to Create User.' };
  }

  revalidatePath('/login');
  redirect('/login');
}

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}

export async function logOut() {
  await signOut();
}
