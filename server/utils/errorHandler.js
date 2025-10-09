
//expands error

export class ErrorResponse extends Error {
  constructor(message, statusCode) {

    if (!message) message = "An unexpected error occurred";

    super(message);
    this.statusCode = statusCode || 500;

    if (this.statusCode >= 500) {
      this.message =
        process.env.NODE_ENV === "production"
          ? "Internal Server Error"
          : message || "Something went wrong, Try again in a few minutes";
    }

    if (process.env.NODE_ENV === "production") {
      this.stack = undefined;
    }
    // smthing for node to keep the prototype chain || idk idc
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

//handler for server 
export const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  res.status(statusCode).json({
    success: false,
    error: message,
  });
};