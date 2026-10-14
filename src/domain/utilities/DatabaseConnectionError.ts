// 1. Define custom error for UNRECOVERABLE system failures
class DatabaseConnectionError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'DatabaseConnectionError';
  }
}

interface User {
  id: string;
  name: string;
}

class UserService {
  private isDatabaseOnline = true;

  async getUser(id: string): Promise<User | null> {
    // UNRECOVERABLE: The database is down entirely.
    // The application cannot function, so we THROW.
    if (!this.isDatabaseOnline) {
      throw new DatabaseConnectionError(
        'Fatal: Lost connection to the database cluster.'
      );
    }

    // RECOVERABLE: The query succeeded, but the user doesn't exist.
    // This is a normal business outcome, so we RETURN null.
    if (id !== 'user-123') {
      return null;
    }

    return { id: 'user-123', name: 'Alice' };
  }
}

// 2. Consuming the service
// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function processUserRequest(userId: string) {
  const userService = new UserService();

  try {
    // We expect a return value for normal flow control
    const user = await userService.getUser(userId);

    if (!user) {
      // Handle the RECOVERABLE error gracefully
      console.warn(
        `User "${userId}" could not be found. Showing sign-up prompt.`
      );
      return { success: false, message: 'User not found' };
    }

    // Happy path
    console.log(`Successfully loaded user: ${user.name}`);
    return { success: true, user };
  } catch (error) {
    // Handle the UNRECOVERABLE error (e.g., alert engineering, log critical failure)
    if (error instanceof DatabaseConnectionError) {
      console.error('[CRITICAL]', error.message);
      // Re-throw or handle at the top-level application boundary
      throw new Error(
        'Service temporarily unavailable. Please try again later.'
      );
    }

    // Fallback for completely unexpected bugs
    throw error;
  }
}
