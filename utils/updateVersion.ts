import { readFile, writeFile } from "fs/promises";

const packagePath = "./package.json";
const manifestPath = "./public/manifest.json";

async function updateVersion() {
  try {
    // Чтение package.json
    const packageData = await readFile(packagePath, "utf8");
    const packageJson = JSON.parse(packageData);

    // Обновление версии в package.json
    const versionParts = packageJson.version.split(".").map(Number);
    versionParts[2] += 1; // Увеличение patch-версии
    const newVersion = versionParts.join(".");
    packageJson.version = newVersion;
    await writeFile(packagePath, JSON.stringify(packageJson, null, 2), "utf8");
    console.log(`Updated package.json to version ${newVersion}`);

    // Чтение manifest.json
    const manifestData = await readFile(manifestPath, "utf8");
    const manifestJson = JSON.parse(manifestData);

    // Обновление версии в manifest.json
    manifestJson.version = newVersion;
    await writeFile(manifestPath, JSON.stringify(manifestJson, null, 2), "utf8");
    console.log(`Updated manifest.json to version ${newVersion}`);
  } catch (err) {
    console.error("Error updating version:", err);
  }
}

void updateVersion().then(() => {
  console.log("Version updated successfully");
});
