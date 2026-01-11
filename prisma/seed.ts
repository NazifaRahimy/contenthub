// این کد بدون ادمین است
// import { prisma } from "../src/lib/db";
// import bcrypt from "bcryptjs";

// async function main() {
//   const hashedPassword = await bcrypt.hash("123456", 10); // رمز واقعی کاربر

//   const user = await prisma.user.upsert({
//     where: { email: "admin@gmail.com" },
//     update: {},
//     create: {
//       email: "admin@gmail.com",
//       name: "Admin",
//       password: hashedPassword,
//     },
//   });

//   console.log("✅ User created:", user);
// }

// main()
//   .catch((e) => {
//     console.error(e);
//     process.exit(1);
//   })
//   .finally(() => process.exit());


// import { prisma } from "../src/lib/db";
// import bcrypt from "bcryptjs";
// // این ادمین دارد
// async function main() {
//   const hashedPassword = await bcrypt.hash("123456", 10);

//   const user = await prisma.user.upsert({
//     where: { email: "admin@gmail.com" },
//     update: {
//       password: hashedPassword,
//       role: "ADMIN",
//     },
//     create: {
//       email: "admin@gmail.com",
//       name: "Admin",
//       password: hashedPassword,
//       role: "ADMIN",
//     },
//   });

//   console.log("✅ Admin user:", user);
// }

// main()
//   .catch(console.error)
//   .finally(() => process.exit());
import { prisma } from "../src/lib/db";
import bcrypt from "bcryptjs";

async function main() {
  const hashedPassword = await bcrypt.hash("123456", 10);

  const user = await prisma.user.upsert({
    where: { email: "admin@gmail.com" },
    update: {
      password: hashedPassword,
      role: "ADMIN",
    },
    create: {
      email: "admin@gmail.com",
      name: "Admin",
      password: hashedPassword,
      role: "ADMIN",
    },
  });

  console.log("✅ Admin user:", user);
}

main().catch(console.error).finally(() => process.exit());
