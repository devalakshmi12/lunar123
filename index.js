import { execSync } from "child_process";
import chalk from "chalk";
import inquirer from "inquirer";

function checkTool(command, name, fix) {
  try {
    const version = execSync(command).toString().trim();
    return { name, status: "Installed", version, fix: null };
  } catch {
    return { name, status: "Missing", version: null, fix };
  }
}

function scanSystem() {
    console.log(chalk.bold("\n=== Dev Environment Health Monitor ===\n"));
  console.log(chalk.blue("\n🔍 Scanning your system...\n"));

const tools = [
  checkTool("node -v", "Node.js", "Install from https://nodejs.org"),
  checkTool("npm -v", "npm", "Comes with Node.js"),
  checkTool("python --version", "Python", "Install from https://python.org"),
  checkTool("pip --version", "pip", "Run: python -m ensurepip"),
  checkTool("git --version", "Git", "Install from https://git-scm.com"),
  checkTool("java -version", "Java", "Install JDK from Oracle/OpenJDK"),
];

  let installed = 0;

  tools.forEach(tool => {
    if (tool.status === "Installed") {
      console.log(chalk.green(`✅ ${tool.name}: ${tool.version}`));
      installed++;
    } else {
      console.log(chalk.red(`❌ ${tool.name}: Not Installed`));
console.log(chalk.yellow(`   👉 Fix: ${tool.fix}`));
    }
  });

  const score = Math.round((installed / tools.length) * 100);
 if (score === 100) {
  console.log(chalk.green("🚀 Perfect setup! You're ready to build without issues."));
} else if (score >= 70) {
  console.log(chalk.yellow("⚠️ Minor improvements needed. Some tools can be updated or installed."));
} else {
  console.log(chalk.red("❌ Your environment is not properly configured. Fix the missing tools."));
}
}

async function mainMenu() {
  const answer = await inquirer.prompt([
    {
      type: "list",
      name: "choice",
      message: "What do you want to do?",
      choices: ["Scan System", "Exit"],
    },
  ]);

  if (answer.choice === "Scan System") {
    scanSystem();
    mainMenu();
  } else {
    console.log(chalk.yellow("👋 Exiting..."));
  }
}
scanSystem();