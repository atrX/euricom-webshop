const { PrismaClient } = require("@prisma/client");
const { faker } = require("@faker-js/faker");

const prisma = new PrismaClient();

function buildProduct() {
  return {
    name: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    price: Number(faker.commerce.price()),
    image: faker.image.image(),
  };
}

function buildMany(builder, amount = 1) {
  return Array(amount)
    .fill(null)
    .map(() => builder());
}

const load = async () => {
  try {
    await prisma.product.deleteMany();
    console.log("Deleted records in product collection");

    const products = buildMany(buildProduct, 100);
    await prisma.product.createMany({
      data: products,
    });
    console.log("Inserted product data");
  } catch (err) {
    console.error(err);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
};

load();
