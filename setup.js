import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

console.log('🚀 OpenAgentFlow Starter Setup\n');

// 1. Check/Copy .env
if (!fs.existsSync('.env') && fs.existsSync('.env.example')) {
  fs.copyFileSync('.env.example', '.env');
  console.log('✅ Created local .env from .env.example (add your API keys here or run: npx openagentflow auth)');
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
  execSync(`"${pipPath}" install --upgrade pip`, { stdio: 'inherit' });
  execSync(`"${pipPath}" install -r requirements.txt`, { stdio: 'inherit' });
  console.log('\n🎉 Setup complete! All dependencies installed successfully.\n');
  console.log('👉 Next Steps:');
  console.log('   1. Add your LLM API keys: npx openagentflow auth (or edit .env)');
  console.log('   2. Run your first live workflow: npm run triage');
} catch (err) {
  console.error('\n❌ Failed to install Python dependencies. Please check the error messages above.');
  process.exit(1);
}
