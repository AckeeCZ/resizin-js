#!/bin/sh

if [ "$1" != "" ]; then
  if [ -e "./packages/$1/package.json" ]; then
        # build:js
        ./node_modules/.bin/babel packages/$1/src --out-dir packages/$1/lib --extensions ".ts,.tsx" --ignore "**/*.story.tsx,**/*.d.ts" --ignore __tests__
        # build:types
        ./node_modules/.bin/tsc --project tsconfig.types.json --emitDeclarationOnly --outDir packages/$1/lib
    # ./node_modules/babel-cli/bin/babel.js ./packages/$1/src --out-dir ./packages/$1/es --ignore __tests__
    # BABEL_ENV=commonjs ./node_modules/babel-cli/bin/babel.js ./packages/$1/src --out-dir ./packages/$1/lib --ignore __tests__
  else
    echo "Package $1 was not found"
  fi
else
  for f in packages/*; do
    package=`basename $f`

    if [ -d "$f" ] && [ -e "$f/package.json" ]; then
        # build:js
        ./node_modules/.bin/babel $f/src --out-dir $f/lib --extensions ".ts,.tsx" --ignore "**/*.story.tsx,**/*.d.ts" --ignore __tests__
        # build:types
        ./node_modules/.bin/tsc --project tsconfig.types.json --emitDeclarationOnly --outDir $f/lib

        # ./node_modules/babel-cli/bin/babel.js $f/src --out-dir $f/es --ignore __tests__
        # BABEL_ENV=commonjs ./node_modules/babel-cli/bin/babel.js $f/src --out-dir $f/lib --ignore __tests__
    fi
  done
fi

# cp README.md packages/resizin/README.md
