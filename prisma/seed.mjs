import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const products = [
  {
    name: "EchoSphere Smart Speaker",
    slug: "echosphere-smart-speaker",
    description: "Voice-ready speaker with room-filling audio and fast smart-home control.",
    price: 129.99,
    image:
      "https://images.unsplash.com/photo-1543512214-318c7553f230?auto=format&fit=crop&w=900&q=80",
    category: "Electronics",
    inventory: 42
  },
  {
    name: "Nimbus Air Fryer Pro",
    slug: "nimbus-air-fryer-pro",
    description: "Compact kitchen appliance with multi-mode presets and crisp convection cooking.",
    price: 189,
    image:
      "https://images.unsplash.com/photo-1585515656973-4e5ef5337cf8?auto=format&fit=crop&w=900&q=80",
    category: "Appliances",
    inventory: 17
  },
  {
    name: "StrideFlex Running Shoes",
    slug: "strideflex-running-shoes",
    description: "Lightweight performance shoes built for everyday training and comfort.",
    price: 94.5,
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80",
    category: "Fashion",
    inventory: 64
  },
  {
    name: "Aurora Skin Set",
    slug: "aurora-skin-set",
    description: "Hydration-focused skincare bundle with cleanser, serum, and repair cream.",
    price: 72,
    image:
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=900&q=80",
    category: "Beauty",
    inventory: 31
  }
];

async function main() {
  for (const product of products) {
    await prisma.product.upsert({
      where: {
        slug: product.slug
      },
      update: product,
      create: product
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
