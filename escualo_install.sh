#/bin/bash
REV=$1

echo '[Escualo::Install::Classroom] Publishing version'
echo $REV > version

. /root/.nvm/nvm.sh && npm install --unsafe-perm
npm run-script build
