import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const drivers = [
    {
      id: 1,
      name: 'Homer Simpson',
      description:
        'Olá! Sou o Homer, seu motorista camarada! Relaxe e aproveite o passeio, com direito a rosquinhas e boas risadas (e talvez alguns desvios).',
      vehicle: 'Plymouth Valiant 1973 rosa e enferrujado',
      rating: 2.0,
      comment:
        'Motorista simpático, mas errou o caminho 3 vezes. O carro cheira a donuts.',
      pricePerKilometer: 2.5,
      minimumMeters: 1000,
    },
    {
      id: 2,
      name: 'Dominic Toretto',
      description:
        'Ei, aqui é o Dom. Pode entrar, vou te levar com segurança e rapidez ao seu destino. Só não mexa no rádio, a playlist é sagrada.',
      vehicle: 'Dodge Charger R/T 1970 modificado',
      rating: 4.0,
      comment:
        'Que viagem incrível! O carro é um show à parte e o motorista, apesar de ter uma cara de poucos amigos, foi super gente boa. Recomendo!',
      pricePerKilometer: 5.0,
      minimumMeters: 5000,
    },
    {
      id: 3,
      name: 'James Bond',
      description:
        'Boa noite, sou James Bond. À seu dispor para um passeio suave e discreto. Aperte o cinto e aproveite a viagem.',
      vehicle: 'Aston Martin DB5 clássico',
      rating: 5.0,
      comment:
        'Serviço impecável! O motorista é a própria definição de classe e o carro é simplesmente magnífico. Uma experiência digna de um agente secreto.',
      pricePerKilometer: 10.0,
      minimumMeters: 10000,
    },
  ]

  for (const driver of drivers) {
    await prisma.driver.upsert({
      where: { id: driver.id },
      update: {
        name: driver.name,
        description: driver.description,
        vehicle: driver.vehicle,
        rating: driver.rating,
        comment: driver.comment,
        pricePerKilometer: driver.pricePerKilometer,
        minimumMeters: driver.minimumMeters,
      },
      create: driver,
    })
  }

  console.log('Drivers seeded successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
