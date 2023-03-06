# OCI ZX Scripts

## Usage

From the root folder of your project, download the scripts folder:

```sh
wget -cO - \
    https://github.com/vmleon/oci-zx-scripts/archive/refs/heads/main.zip > scripts.zip \
    && unzip scripts.zip -d scripts \
    && rm scripts.zip \
    && mv scripts/oci-zx-scripts-main scripts/lib
```

## Example

Create a `setenv.mjs` script to prepare environment:

```sh
touch scripts/setenv.mjs
```

Use the following example:
```js
#!/usr/bin/env zx

import { getNamespace } from "./lib/oci.mjs";
import { checkRequiredProgramsExist } from "./lib/utils.mjs";

const shell = process.env.SHELL | "/bin/zsh";
$.shell = shell;
$.verbose = false;

console.log("Check fake dependencies...");
const dependencies = ["git", "unzip"];
await checkRequiredProgramsExist(dependencies);

const namespace = await getNamespace();
console.log(namespace);
```

Run the script:

```sh
npx zx scripts/setenv.mjs
```

## Create new functions

```javascript
#!/usr/bin/env zx
import { exitWithError } from "./utils.mjs";

export async function example() {
  try {
    const { stdout, exitCode, stderr } = await $`pwd`;
    if (exitCode !== 0) {
      exitWithError(stderr);
    }
    return stdout.trim();
  } catch (error) {
    exitWithError(error.stderr);
  }
}
```

## Get Region example

```javascript
const regions = await getRegions();
const regionName = await setVariableFromEnvOrPrompt(
  "OCI_REGION",
  "OCI Region name",
  async () => printRegionNames(regions)
);
const { key } = regions.find((r) => r.name === regionName);
const url = `${key}.ocir.io`;
```