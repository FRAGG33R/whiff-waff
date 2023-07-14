import { PrismaClient, Rank } from "@prisma/client"
import { create } from "domain";

const prisma = new PrismaClient();

async function main() {
    // for (let i = 1; i <= 20;++i){
    //     const user = await prisma.user.create({
    //         data: {
    //             nickName: `test${i}`,
    //             firstName: 'Yaakoub',
    //             lastName: 'Khoudrouf',
    //             avatar: 'None',
    //             email: `test${i}@student.1337.ma`,
    //             passwordHash: 'None',
    //             passwordSalt: 'None',
    //             stat: {
    //                 create: {
    //                     wins: 0,
    //                     loses: 0,
    //                     level: 0,
    //                     rank: Rank.ROOKIE,
    //                 }
    //             },
    //         },
    //     });
    //     console.log(user);
    // }

    // const whiffWhaffRookie = await prisma.achievement.create({
    //     data: {
    //         name: 'whiff-whaff-rookie',
    //         description: "win the first match"
    //     }
    // });
    // const whiffWhaffLegend = await prisma.achievement.create({
    //     data: {
    //         name: 'whiff-whaff-legend',
    //         description: "win the first match"
    //     }
    // });
    // const perfectGame = await prisma.achievement.create({
    //     data: {
    //         name: 'perfect-game',
    //         description: "win 4 matches without losing any points"
    //     }
    // });
    // const completionist = await prisma.achievement.create({
    //     data: {
    //         name: 'completionist',
    //         description: "win the first match"
    //     }
    // });
    const users = await prisma.user.findMany();
    for (let i = 0;i < users.length;++i) {
        const achievements = await prisma.achievement.findMany();
        for (let j = 0;j < achievements.length;++j) {
            const haveAchievement = await prisma.haveAchievement.create({
                data: {
                    achievementId : achievements[i].id,
                    userId: users[i].id,
                    level: 10.0
                }
            })
        }
    }
    console.log(await prisma.achievement.findMany());
    // const user = await prisma.user.findUnique({
    //     where: {
    //         email: "test3@student.1337.ma",
    //         passwordHash: "None"
    //     }
    // })
}

main()
    .catch(e => {
        console.log(e.message)
    })
    .finally( async () => {
        await prisma.$disconnect;
    });