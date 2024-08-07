//common error handler middleware to catch exceptions
export function errror_handler(err: any, req: any, res: any, next: any) {
  res
    .status(err.statusCode || 500)
    .send({ error: err.message || "Internal Server Error" });
}
