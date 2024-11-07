import * as bcrypt from 'bcrypt';
import { prisma } from './prisma';

export async function seed() {
    const hashedPassword = await bcrypt.hash('$gstx89fra', 10);

    await prisma.user.create({
        data: {
            name: 'GSTX',
            email: 'gstx@gmail.com',
            password: hashedPassword,
            Wallet: {
                create: {
                    quotesAmount: 0
                }
            }
        }
    });
    console.log('Seeding complete');
}

seed();