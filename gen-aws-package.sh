fname="introlingLambda.zip"

TARGET="dist"
[ ! -d $TARGET ] && mkdir $TARGET

if [ -d $TARGET ]; then
  rm -rf $TARGET/*
fi

echo "index.js"
cp index.js $TARGET/

echo "package.json"
cp package.json $TARGET/

echo "src/*"
cp -r src $TARGET/

echo "node_modules/*"
cp -r node_modules $TARGET/

echo "Creating zip file"
cd dist
zip -r "${fname}" *
