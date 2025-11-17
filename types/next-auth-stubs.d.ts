declare module "@auth/core/adapters" {
  export type Adapter = Record<string, unknown>;
}

declare module "nodemailer" {
  const transporter: unknown;
  export default transporter;
}

declare module "nodemailer/lib/json-transport/index.js" {
  const transport: unknown;
  export default transport;
}

declare module "nodemailer/lib/sendmail-transport/index.js" {
  const transport: unknown;
  export default transport;
}

declare module "nodemailer/lib/ses-transport/index.js" {
  const transport: unknown;
  export default transport;
}

declare module "nodemailer/lib/smtp-pool/index.js" {
  const transport: unknown;
  export default transport;
}

declare module "nodemailer/lib/smtp-transport/index.js" {
  const transport: unknown;
  export default transport;
}

declare module "nodemailer/lib/stream-transport/index.js" {
  const transport: unknown;
  export default transport;
}
