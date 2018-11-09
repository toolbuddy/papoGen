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

EXEC=../main.js
SRC=../test/

# Define error log place
ERR=/tmp/papogen.error.log
LOG=/tmp/papogen.log
TMP=logfile
# clear first
rm ERR LOG > /dev/null 2>&1
# 1) ============================================================== Run json example
# running json - doc format test
TESTCASE=$((TESTCASE+1))
${EXEC} -s ${SRC}json -o /tmp/json > ${TMP}
error=$?
if [ "${error}" == "0" ]
then
    echo -e "${GREEN}[papoGen test] ${LIGHT_CRAY}JSON${GREEN}-${CRAY}doc${NC} format generating process success.${NC}"
    echo -e "${GREEN}[papoGen test] ${LIGHT_CRAY}JSON${GREEN}-${CRAY}doc${NC} format generating process success.${NC}" >> ${LOG}
    SUCCESS_COUNT=$((SUCCESS_COUNT + 1))
    # pass to log 
    cat ${TMP} >> ${LOG}
else
    echo -e "${RED}[papoGen test] ${LIGHT_CRAY}JSON${GREEN}-${CRAY}doc${NC} format generating process fail.${NC}"
    echo -e "${RED}[papoGen test] ${LIGHT_CRAY}JSON${GREEN}-${CRAY}doc${NC} format generating process fail.${NC}"  >> ${ERR}
    # pass to error 
    cat ${TMP} >> ${ERR}
fi
# running json - resume format test
TESTCASE=$((TESTCASE+1))
${EXEC} -s ${SRC}json -o /tmp/json-resume -m resume > ${TMP}
error=$?
if [ "${error}" == "0" ]
then 
    echo -e "${GREEN}[papoGen test] ${LIGHT_CRAY}JSON${GREEN}-${CRAY}resume${NC} format generating process success.${NC}"
    echo -e "${GREEN}[papoGen test] ${LIGHT_CRAY}JSON${GREEN}-${CRAY}resume${NC} format generating process success.${NC}"  >> ${LOG}
    SUCCESS_COUNT=$((SUCCESS_COUNT + 1))
    # pass to log 
    cat ${TMP} >> ${LOG}
else
    echo -e "${RED}[papoGen test] ${LIGHT_CRAY}JSON${GREEN}-${CRAY}resume${NC} format generating process fail.${NC}"
    echo -e "${RED}[papoGen test] ${LIGHT_CRAY}JSON${GREEN}-${CRAY}resume${NC} format generating process fail.${NC}" >> ${ERR}
    # pass to error 
    cat ${TMP} >> ${ERR}
fi

# 2) ============================================================== Run yaml example
# running yaml - doc format test
TESTCASE=$((TESTCASE+1))
${EXEC} -s ${SRC}yaml -o /tmp/yaml-doc -g yaml -m doc > ${TMP}
error=$?
if [ "${error}" == "0" ]
then
    echo -e "${GREEN}[papoGen test] ${LIGHT_CRAY}YAML${GREEN}-${CRAY}doc${NC} format generating process success.${NC}"
    echo -e "${GREEN}[papoGen test] ${LIGHT_CRAY}YAML${GREEN}-${CRAY}doc${NC} format generating process success.${NC}"  >> ${LOG}
    SUCCESS_COUNT=$((SUCCESS_COUNT + 1))
    # pass to log 
    cat ${TMP} >> ${LOG}
else
    echo -e "${RED}[papoGen test] ${LIGHT_CRAY}YAML${GREEN}-${CRAY}doc${NC} format generating process fail.${NC}"
    echo -e "${RED}[papoGen test] ${LIGHT_CRAY}YAML${GREEN}-${CRAY}doc${NC} format generating process fail.${NC}"  >> ${ERR}
    # pass to error 
    cat ${TMP} >> ${ERR}
fi

# running yaml - resume format test
TESTCASE=$((TESTCASE+1))
${EXEC} -s ${SRC}yaml -o /tmp/yaml-resume -g yaml -m resume > ${TMP}
error=$?
if [ "${error}" == "0" ]
then
    echo -e "${GREEN}[papoGen test] ${LIGHT_CRAY}YAML${GREEN}-${CRAY}resume${NC} format generating process success.${NC}"
    echo -e "${GREEN}[papoGen test] ${LIGHT_CRAY}YAML${GREEN}-${CRAY}resume${NC} format generating process success.${NC}"  >> ${LOG}
    SUCCESS_COUNT=$((SUCCESS_COUNT + 1))
    # pass to log 
    cat ${TMP} >> ${LOG}
else
    echo -e "${RED}[papoGen test] ${LIGHT_CRAY}YAML${GREEN}-${CRAY}resume${NC} format generating process fail.${NC}"
    echo -e "${RED}[papoGen test] ${LIGHT_CRAY}YAML${GREEN}-${CRAY}resume${NC} format generating process fail.${NC}" >> ${ERR}
    # pass to error 
    cat ${TMP} >> ${ERR}
fi

# 3) ============================================================== Run Markdown example
# running markdown - md_doc format test
TESTCASE=$((TESTCASE+1))
${EXEC} -s ${SRC}md -o /tmp/md -g md -m md_doc > ${TMP}
error=$?
if [ "${error}" == "0" ]
then
    echo -e "${GREEN}[papoGen test] ${LIGHT_CRAY}MARKDOWN${GREEN}-${CRAY}md_doc${NC} format generating process success.${NC}" 
    echo -e "${GREEN}[papoGen test] ${LIGHT_CRAY}MARKDOWN${GREEN}-${CRAY}md_doc${NC} format generating process success.${NC}"  >> ${LOG}
    SUCCESS_COUNT=$((SUCCESS_COUNT + 1))
    # pass to log 
    cat ${TMP} >> ${LOG}
else
    echo -e "${RED}[papoGen test] ${LIGHT_CRAY}MARKDOWN${GREEN}-${CRAY}md_doc${NC} format generating process fail.${NC}"
    echo -e "${RED}[papoGen test] ${LIGHT_CRAY}MARKDOWN${GREEN}-${CRAY}md_doc${NC} format generating process fail.${NC}" >> ${ERR}
    # pass to error 
    cat ${TMP} >> ${ERR}
fi


# remove
rm ${TMP}

echo -e "\n${GREEN}Pass${NC}/Total testcase: ${GREEN}${SUCCESS_COUNT}${NC}/${TESTCASE}\n"
echo -e "Check the error log for here: ${RED}${ERR}${NC}"
echo -e "Check the log for here: ${GREEN}${LOG}${NC}"