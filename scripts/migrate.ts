import "dotenv/config";
import { closeDatabase, initializeDatabase } from "../src/db.js";

try {
  const engine = await initializeDatabase();
  console.log(`Rank Rascal database migrations are current (${engine}).`);
} finally {
  await closeDatabase();
}
