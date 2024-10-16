#!/bin/bash
set -euo pipefail

cd "$(dirname "${0}")"

node src/app.js $1
