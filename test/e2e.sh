set -e

export TEST_INS="$(ls test/e2e | grep '.ts')"
for TEST_IN in $TEST_INS
do
  echo "RUNNING ${TEST_IN}"
  export TEST_OUT="${TEST_IN::-3}.json"
  export EXPECTED_OUT="$(cat test/e2e/${TEST_OUT})"
  export ACTUAL_OUT="$(node build/cli.js --directory test/data --parse ${TEST_IN})"
  export DIFF="$(diff <(echo ${EXPECTED_OUT}) <(echo ${ACTUAL_OUT}))"
  if [ -n "$DIFF" ]; then
    echo "FAILURE ${TEST_OUT}"
    echo $DIFF
    exit 1
  else
    echo "PASS ${TEST_OUT}"
  fi
done
