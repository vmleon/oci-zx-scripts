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