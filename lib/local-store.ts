import { randomUUID, scrypt as scryptCallback, timingSafeEqual } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { promisify } from "node:util";

const scrypt = promisify(scryptCallback);
const STORE_PATH = join(process.cwd(), "data", "omnicart-store.json");

export type LocalUserRecord = {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  provider: "credentials" | "google";
  createdAt: string;
};

export type LocalOrderRecord = {
  id: string;
  userEmail: string;
  userName: string;
  status: "PENDING" | "PAID" | "FULFILLED" | "CANCELLED";
  totalAmount: number;
  currency: string;
  paymentMethod: string;
  paymentLast4: string;
  productId: string;
  productName: string;
  createdAt: string;
};

type StoreShape = {
  users: LocalUserRecord[];
  orders: LocalOrderRecord[];
};

const defaultStore: StoreShape = {
  users: [],
  orders: []
};

async function ensureStoreFile() {
  await mkdir(join(process.cwd(), "data"), { recursive: true });

  try {
    await readFile(STORE_PATH, "utf8");
  } catch {
    await writeFile(STORE_PATH, JSON.stringify(defaultStore, null, 2), "utf8");
  }
}

async function readStore(): Promise<StoreShape> {
  await ensureStoreFile();

  try {
    const content = await readFile(STORE_PATH, "utf8");
    const parsed = JSON.parse(content) as Partial<StoreShape>;

    return {
      users: Array.isArray(parsed.users) ? parsed.users : [],
      orders: Array.isArray(parsed.orders) ? parsed.orders : []
    };
  } catch {
    return defaultStore;
  }
}

async function writeStore(store: StoreShape) {
  await ensureStoreFile();
  await writeFile(STORE_PATH, JSON.stringify(store, null, 2), "utf8");
}

async function hashPassword(password: string) {
  const salt = randomUUID();
  const derivedKey = (await scrypt(password, salt, 64)) as Buffer;
  return `${salt}:${derivedKey.toString("hex")}`;
}

export async function verifyLocalPassword(password: string, passwordHash: string) {
  const [salt, storedHash] = passwordHash.split(":");

  if (!salt || !storedHash) {
    return false;
  }

  const derivedKey = (await scrypt(password, salt, 64)) as Buffer;
  const storedBuffer = Buffer.from(storedHash, "hex");

  if (storedBuffer.length !== derivedKey.length) {
    return false;
  }

  return timingSafeEqual(storedBuffer, derivedKey);
}

export async function findLocalUserByEmail(email: string) {
  const store = await readStore();
  return store.users.find((user) => user.email.toLowerCase() === email.trim().toLowerCase()) ?? null;
}

export async function createLocalUser(input: { name: string; email: string; password: string }) {
  const store = await readStore();
  const normalizedEmail = input.email.trim().toLowerCase();

  if (store.users.some((user) => user.email.toLowerCase() === normalizedEmail)) {
    throw new Error("EMAIL_EXISTS");
  }

  const user: LocalUserRecord = {
    id: randomUUID(),
    name: input.name.trim(),
    email: normalizedEmail,
    passwordHash: await hashPassword(input.password),
    provider: "credentials",
    createdAt: new Date().toISOString()
  };

  store.users.unshift(user);
  await writeStore(store);

  return user;
}

export async function getOrdersByEmail(email: string) {
  const store = await readStore();
  return store.orders
    .filter((order) => order.userEmail.toLowerCase() === email.trim().toLowerCase())
    .sort((left, right) => Date.parse(right.createdAt) - Date.parse(left.createdAt));
}

export async function createLocalOrder(input: {
  userEmail: string;
  userName: string;
  totalAmount: number;
  currency?: string;
  paymentMethod: string;
  paymentLast4: string;
  productId: string;
  productName: string;
}) {
  const store = await readStore();
  const order: LocalOrderRecord = {
    id: `ord_${randomUUID().replaceAll("-", "").slice(0, 12)}`,
    userEmail: input.userEmail.trim().toLowerCase(),
    userName: input.userName.trim(),
    status: "PAID",
    totalAmount: input.totalAmount,
    currency: input.currency ?? "USD",
    paymentMethod: input.paymentMethod,
    paymentLast4: input.paymentLast4,
    productId: input.productId,
    productName: input.productName,
    createdAt: new Date().toISOString()
  };

  store.orders.unshift(order);
  await writeStore(store);

  return order;
}
