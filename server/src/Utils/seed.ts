import * as bcrypt from 'bcrypt';
import { prisma } from './prisma';

export async function seed() {
    const hashedPassword = await bcrypt.hash('$dev89actions', 10);

    await prisma.user.create({
        data: {
            name: 'dev',
            email: 'dev@gmail.com',
            password: hashedPassword,
            Wallet: {
                create: {
                    userId: 1,

                }
            }
        }
    });
    console.log('Seeding complete');
}

seed();