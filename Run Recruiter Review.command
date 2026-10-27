#!/bin/zsh
set -eu
cd "$(dirname "$0")"
source ../.local-tools/activate.sh
export PORTFOLIO_URL=http://127.0.0.1:3017
npm run dev -- --hostname 127.0.0.1 --port 3017 > /tmp/portfolio-recruiter-server.log 2>&1 &
review_server_pid=$!
trap 'kill "$review_server_pid" 2>/dev/null || true' EXIT
for attempt in {1..60}; do
  if curl -fsS "$PORTFOLIO_URL" >/dev/null 2>&1; then
    node docs/qa/recruiter-review.cjs
    exit $?
  fi
  sleep 1
done
cat /tmp/portfolio-recruiter-server.log
exit 1
