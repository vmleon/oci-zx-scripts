#!/usr/bin/env zx
import { exitWithError } from "./utils.mjs";

export async function createSelfSignedCert(outputPath = ".") {
  await $`mkdir -p ${outputPath}`;
  const keyPath = path.normalize(path.join(outputPath, "tls.key"));
  const certPath = path.normalize(path.join(outputPath, "tls.crt"));
  try {
    await $`openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout ${keyPath} -out ${certPath} -subj "/CN=nginxsvc/O=nginxsvc"`;
    console.log(`Key written to: ${chalk.yellow(keyPath)}`);
    console.log(`Cert written to: ${chalk.yellow(certPath)}`);
  } catch (error) {
    exitWithError(error.stderr);
  }
}

export async function generateRandomString(length = 20) {
  if (length < 12) {
    exitWithError("Password length too short, >= 12 required");
  }
  try {
    const output = (await $`openssl rand -base64 ${length + 15}`).stdout.trim();
    if (output.length) {
      const cleanPassword = output
        .replaceAll("/", "")
        .replaceAll("\\", "")
        .replaceAll("=", "");
      return cleanPassword.slice(0, length);
    } else {
      exitWithError("random string generation failed");
    }
  } catch (error) {
    exitWithError(error.stderr);
  }
}
