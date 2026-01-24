import { db } from "@/lib/drizzle";
import { usersTable } from "@/db/schema";
import Image from "next/image";

export default async function Home() {


  // const result = await db.select().from(usersTable);

  // console.log(result);

  // return (
  //     <div>
  //       <h1>Users</h1>
  //       <ul>
  //         {result.map((user) => (
  //           <li key={user.id}>{user.name}</li>
  //         ))}
  //       </ul>
  //     </div>


  // );
}
