#!/bin/bash
cd /home/kavia/workspace/code-generation/minimalhabit-46175-3524462b/streakflow
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

