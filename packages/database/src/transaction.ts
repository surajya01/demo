import { PrismaClient, Prisma } from "@prisma/client";
import { prisma } from "./client";

/**
 * Execute an operation safely within a Prisma transaction with configurable isolation and timeout.
 * Essential for concurrency control in booking allocation, temporary holds, and payments.
 */
export async function withTransaction<T>(
  action: (tx: Prisma.TransactionClient) => Promise<T>,
  options?: {
    maxWait?: number;
    timeout?: number;
    isolationLevel?: Prisma.TransactionIsolationLevel;
  }
): Promise<T> {
  return prisma.$transaction(action, {
    maxWait: options?.maxWait ?? 5000,
    timeout: options?.timeout ?? 10000,
    isolationLevel: options?.isolationLevel ?? Prisma.TransactionIsolationLevel.Serializable,
  });
}
