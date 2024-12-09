For all tests
$env:BROWSER="chrome"; $env:OS="OSX"; $env:OS_VERSION="Monterey"; npx wdio run wdio.conf.js

For specific test
$env:BROWSER="firefox"; $env:OS="OSX"; $env:OS_VERSION="Monterey"; npx wdio run wdio.conf.js --spec ./test/specs/solflareWalletTest1.ts


