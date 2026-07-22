import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import os from 'os';

function isPlaceholder(val) {
  if (!val || typeof val !== 'string') return true;
  const trimmed = val.trim();
  if (trimmed === '') return true;
  const lower = trimmed.toLowerCase();
  return (
    lower.startsWith('your_') ||
    lower.startsWith('your-') ||
    lower.includes('_here') ||
    lower.includes('-here') ||
    lower === 'todo' ||
    lower === 'placeholder'
  );
}

function parseDotEnvSimple(content) {
  const res = {};
  for (let line of content.split(/\r?\n/)) {
    line = line.trim();
    if (!line || line.startsWith('#') || !line.includes('=')) continue;
    const [k, ...vParts] = line.split('=');
    let v = vParts.join('=').trim();
    if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) v = v.slice(1, -1);
    res[k.trim()] = v;
  }
  return res;
}

function hasAnyValidKey() {
  const keys = ['GOOGLE_API_KEY', 'OPENAI_API_KEY', 'ANTHROPIC_API_KEY'];
  const localPath = path.join(process.cwd(), '.env');
  const globalPath = path.join(os.homedir(), '.oaf', '.env');

  let localEnv = {};
  let globalEnv = {};
  if (fs.existsSync(localPath)) {
    try { localEnv = parseDotEnvSimple(fs.readFileSync(localPath, 'utf-8')); } catch (e) {}
  }
  if (fs.existsSync(globalPath)) {
    try { globalEnv = parseDotEnvSimple(fs.readFileSync(globalPath, 'utf-8')); } catch (e) {}
  }

  for (const k of keys) {
    if (!isPlaceholder(localEnv[k]) || !isPlaceholder(globalEnv[k]) || !isPlaceholder(process.env[k])) {
      return true;
    }
  }
  return false;
}

console.log('🚀 OpenAgentFlow Starter Setup\n');

// 1. Check/Copy .env
if (!fs.existsSync('.env') && fs.existsSync('.env.example')) {
  fs.copyFileSync('.env.example', '.env');
  console.log('✅ Created local .env from .env.example');
} else if (fs.existsSync('.env')) {
  console.log('ℹ️  Existing .env file detected.');
}

// 2. Detect Python
let pythonCmd = null;
for (const cmd of ['python3', 'python']) {
  try {
    execSync(`${cmd} --version`, { stdio: 'ignore' });
    pythonCmd = cmd;
    break;
  } catch (e) {
    // try next
  }
}

if (!pythonCmd) {
  console.error('❌ Python 3 was not found on your system. Please install Python 3.10+ and run "npm run setup" again.');
  process.exit(1);
}

console.log(`📦 Using Python: (${pythonCmd})`);

// 3. Create Python virtual environment
const venvDir = path.join(process.cwd(), 'venv');
if (!fs.existsSync(venvDir)) {
  console.log('⏳ Creating Python virtual environment (venv)...');
  execSync(`${pythonCmd} -m venv venv`, { stdio: 'inherit' });
  console.log('✅ Virtual environment created.');
} else {
  console.log('ℹ️  Virtual environment (venv) already exists.');
}

// 4. Determine pip path inside venv
const isWin = process.platform === 'win32';
const pipPath = isWin
  ? path.join(venvDir, 'Scripts', 'pip.exe')
  : path.join(venvDir, 'bin', 'pip');

const pythonVenvPath = isWin
  ? path.join(venvDir, 'Scripts', 'python.exe')
  : path.join(venvDir, 'bin', 'python');

if (!fs.existsSync(pipPath)) {
  console.error(`❌ Could not locate pip inside virtual environment at: ${pipPath}`);
  process.exit(1);
}

// 5. Install Python dependencies
console.log('⏳ Installing LangGraph runtime dependencies from requirements.txt...');
try {
  execSync(`"${pythonVenvPath}" -m pip install --upgrade pip`, { stdio: 'inherit' });
  execSync(`"${pythonVenvPath}" -m pip install -r requirements.txt`, { stdio: 'inherit' });
  
  if (hasAnyValidKey()) {
    console.log('\n🎉 Setup complete! All dependencies installed successfully.\n');
    console.log('👉 Next Steps:');
    console.log('   Run your first live workflow: npm run triage');
  } else {
    console.log('\n⚠️  Action Required: No valid LLM API keys detected.');
    console.log('👉 To run live workflows like "npm run triage", configure your API keys first:');
    console.log('   1. Run interactive setup: npx openagentflow auth (or npm run auth)');
    console.log('   2. Or edit the .env file directly and paste your real API key (e.g. GOOGLE_API_KEY=AIza...)');
    console.log('\n✅ All dependencies installed successfully.\n');
  }
} catch (err) {
  console.error('\n❌ Failed to install Python dependencies. Please check the error messages above.');
  process.exit(1);
}
