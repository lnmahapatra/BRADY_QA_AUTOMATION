export class RetryHelper {

  static async retry<T>(
    operation: () => Promise<T>,
    retries = 3,
    delay = 2000
  ): Promise<T> {

    let lastError: Error;

    for (let attempt = 1; attempt <= retries; attempt++) {
      try {
        return await operation();
      } catch (error) {

        lastError = error as Error;

        console.log(
          `Attempt ${attempt}/${retries} failed: ${lastError.message}`
        );

        if (attempt < retries) {
          await new Promise(resolve => setTimeout(resolve, delay));
        }
      }
    }

    throw lastError!;
  }
}