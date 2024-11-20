import { Prisma, PrismaClient, AccountRole, AccountStatus, UserType } from '@prisma/client';
import PasswordHelper from '../../src/utils/helpers/password.helper'; // Assuming this is for password hashing

// Sample driver data (modify as needed)
const drivers: Prisma.DriverCreateInput[] = [
  {
    name: 'Homer Simpson',
    description: 'Olá! Sou o Homer, seu motorista camarada! Relaxe e aproveite o passeio, com direito a rosquinhas e boas risadas (e talvez alguns desvios).',
    car: 'Plymouth Valiant 1973 rosa e enferrujado',
    minKm: 1,
    review: '2/5. Motorista simpático, mas errou o caminho 3 vezes. O carro cheira a donuts.',
    tax: 2.50,
  },
  {
    name: 'Dominic Toretto',
    description: 'Ei, aqui é o Dom. Pode entrar, vou te levar com segurança e rapidez ao seu destino. Só não mexa  o rádio, a playlist é sagrada.',
    car: 'Dodge Charger R/T 1970 modificado',
    minKm: 5,
    review: '4/5. Que viagem incrível! O carro é um show à parte e o motorista, apesar de ter uma cara de poucos amigos, foi super gente boa. Recomendo!',
    tax: 5.00,
  },
  {
    name: 'James Bond',
    description: 'Boa noite, sou James Bond. À seu dispor para um passeio suave e discreto. Aperte o cinto e aproveite a viagem.',
    car: 'Aston Martin DB5 clássico',
    minKm: 10,
    review: '5/5. Serviço impecável! O motorista é a própria definição de classe e o carro é simplesmente magnífico. Uma experiência digna de um agente secreto.',
    tax: 10.00,
  },
];

export async function seedDrivers(prisma: PrismaClient): Promise<void> {
  for (const driver of drivers) {
    await prisma.driver.create({
      data: driver,
    });
  }
  console.log('Driver seeds created successfully.');
}
