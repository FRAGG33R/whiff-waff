import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient();
async function main() {
    const user = await prisma.user.create({
        data: {
            nickName: "navoos",
            firstName: "none",
            lastName: "none",
            avatar: "none",
            email: "none",
            passwordHash: "none",
            passwordSalt: "none",
            twoFactorAuth: false
        }
    })
    console.log(user);
}

main()
    .catch(e => {
        console.log(e.message);
    })
    .finally(async () => {
        prisma.$disconnect;
    })
