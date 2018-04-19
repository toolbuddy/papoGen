#!/bin/bash
# run the main.js to see the generating process is success or not

# color code
RED='\033[0;31m'
GREEN='\033[0;32m'
LIGHT_CRAY='\033[1;36m'
CRAY='\033[0;36m'
NC='\033[0m'

SUCCESS_COUNT=0
TESTCASE=0

# 1) ============================================================== Run json example
# running json - doc format test
./main.js -s test/json -o /tmp > /dev/null 2>&1
TESTCASE=$((TESTCASE+1))
error=$?
if [ $error -eq 0 ]
then 
    echo -e "${GREEN}[papoGen test] ${LIGHT_CRAY}JSON${GREEN}-${CRAY}doc${NC} format generating process success.${NC}"
    SUCCESS_COUNT=$((SUCCESS_COUNT + 1))
else
    echo -e "${RED}[papoGen test] ${LIGHT_CRAY}JSON${GREEN}-${CRAY}doc${NC} format generating process fail.${NC}"
fi
# running json - resume format test
./main.js -s test/json -o /tmp -m resume > /dev/null 2>&1
TESTCASE=$((TESTCASE+1))
error=$?
if [ $error -eq 0 ]
then 
    echo -e "${GREEN}[papoGen test] ${LIGHT_CRAY}JSON${GREEN}-${CRAY}resume${NC} format generating process success.${NC}"
    SUCCESS_COUNT=$((SUCCESS_COUNT + 1))
else
    echo -e "${RED}[papoGen test] ${LIGHT_CRAY}JSON${GREEN}-${CRAY}resume${NC} format generating process fail.${NC}"
fi

# 2) ============================================================== Run yaml example
# running yaml - doc format test
./main.js -s test/yaml -o /tmp -g yaml -m doc > /dev/null 2>&1
TESTCASE=$((TESTCASE+1))
error=$?
if [ $error -eq 0 ]
then 
    echo -e "${GREEN}[papoGen test] ${LIGHT_CRAY}YAML${GREEN}-${CRAY}doc${NC} format generating process success.${NC}"
    SUCCESS_COUNT=$((SUCCESS_COUNT + 1))
else
    echo -e "${RED}[papoGen test] ${LIGHT_CRAY}YAML${GREEN}-${CRAY}doc${NC} format generating process fail.${NC}"
fi

# running yaml - resume format test
./main.js -s test/yaml -o /tmp -g yaml -m resume > /dev/null 2>&1
TESTCASE=$((TESTCASE+1))
error=$?
if [ $error -eq 0 ]
then 
    echo -e "${GREEN}[papoGen test] ${LIGHT_CRAY}YAML${GREEN}-${CRAY}resume${NC} format generating process success.${NC}"
    SUCCESS_COUNT=$((SUCCESS_COUNT + 1))
else
    echo -e "${RED}[papoGen test] ${LIGHT_CRAY}YAML${GREEN}-${CRAY}resume${NC} format generating process fail.${NC}"
fi

# 3) ============================================================== Run Markdown example
# running markdown - md_doc format test
./main.js -s test/md -o /tmp -g md -m md_doc > /dev/null 2>&1
TESTCASE=$((TESTCASE+1))
error=$?
if [ $error -eq 0 ]
then 
    echo -e "${GREEN}[papoGen test] ${LIGHT_CRAY}MARKDOWN${GREEN}-${CRAY}md_doc${NC} format generating process success.${NC}"
    SUCCESS_COUNT=$((SUCCESS_COUNT + 1))
else
    echo -e "${RED}[papoGen test] ${LIGHT_CRAY}MARKDOWN${GREEN}-${CRAY}md_doc${NC} format generating process fail.${NC}"
fi


echo -e "\n${GREEN}Pass${NC}/Total testcase: ${GREEN}${SUCCESS_COUNT}${NC}/${TESTCASE}\n"