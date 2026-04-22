// config-loader.js — single-project site
// Each project deploys its own site, so config.json sits at the site root.
// Transcripts live alongside under transcripts/<piece>-v<N>.json.
//
// Backward-compat shims (loadGlobalConfig, loadProjectConfig) are kept so
// the JS modules from the multi-project Cend version (transcript.js,
// piece-init.js, etc.) work unchanged.

async function loadConfig() {
  const res = await fetch('config.json');
  if (!res.ok) throw new Error('config.json not found at site root');
  return res.json();
}

async function loadGlobalConfig() { return loadConfig(); }
async function loadProjectConfig(_ignored) { return loadConfig(); }

async function loadTranscript(_ignored, transcriptFile) {
  const res = await fetch(transcriptFile);
  if (!res.ok) throw new Error(`Transcript "${transcriptFile}" not found`);
  return res.json();
}

function findVersion(piece, versionNumber) {
  return piece.versions.find(v => v.version === Number(versionNumber));
}

function findPiece(config, pieceId) {
  return config.pieces.find(p => p.id === pieceId);
}
