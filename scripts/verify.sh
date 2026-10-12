#!/usr/bin/env bash
set -euo pipefail
node scripts/validate-static.mjs
npm test
node --experimental-strip-types --test --test-reporter=./scripts/json-test-reporter.mjs tests/*.test.ts > evidence/TCK-123/tests.json
