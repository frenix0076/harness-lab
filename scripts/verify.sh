#!/usr/bin/env bash
set -euo pipefail
node scripts/validate-static.mjs
npm test
