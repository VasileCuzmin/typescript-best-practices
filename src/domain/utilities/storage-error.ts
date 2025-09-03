type StorageErrorType = 'SecurityError' | 'QuotaExceededError';

export class StorageError extends Error {
  constructor(
    public type: StorageErrorType,
    public override message: string,
    public override cause: Error
  ) {
    super(message, {
      cause: cause,
    });

    this.name = 'StorageError';
    this.type = type;
  }
}
