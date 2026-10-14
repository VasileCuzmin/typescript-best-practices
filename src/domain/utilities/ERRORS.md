# Error Handling

The distinction between recoverable and unrecoverable errors depends on whether
the application expects the situation and can continue safely.

## Recoverable Errors

A recoverable error is a predictable business or user-interaction outcome. The
system is healthy, but the requested operation cannot succeed as requested.

**Mindset:** "This happens during normal operation. I know what to do next."

Examples include:

- An incorrect password during sign-in.
- A request for a database record that does not exist.
- A payment gateway response indicating that a card was declined.

Return a status, `null`, or a result object such as
`{ success: false, reason }`. This keeps the outcome in normal control flow and
allows the caller to choose the next action, such as displaying a validation
message or prompting the user to try a different payment method.

## Unrecoverable Errors

An unrecoverable error is an exceptional failure that breaks a required
invariant or critical dependency. The application cannot safely fulfill the
operation.

**Mindset:** "A fundamental assumption has failed. Stop this operation and
escalate it."

Examples include:

- A database cluster that is offline or refuses connections.
- A required environment variable, such as a connection string or encryption
  key, missing at startup.
- Insufficient disk space while writing critical state or logs.

Throw an exception so it interrupts the normal flow and reaches the nearest
error boundary. That boundary can log or alert on the failure and return a
generic service error, such as an HTTP 500 response. Failing fast is appropriate
when continuing could leave the system in an unsafe or inconsistent state.

## Throw or Return

| Situation                                | Approach                         | Why                                              |
| ---------------------------------------- | -------------------------------- | ------------------------------------------------ |
| Expected outcome, such as a missing user | Return `null` or a result object | The caller can handle it as part of normal flow. |
| Critical dependency or invariant failure | Throw an exception               | The operation cannot safely continue.            |

Throwing bypasses regular control flow until a `catch` block or global error
boundary handles the failure. Returning makes expected outcomes explicit in the
method's return type, which requires the caller to handle them deliberately.

## Example

`DatabaseConnectionError.ts` demonstrates both approaches: an unavailable
database throws `DatabaseConnectionError`, while an absent user returns `null`.
