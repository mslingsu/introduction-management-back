bash gen-aws-package.sh

CODE_PATH="dist/introlingLambda.zip"
AWS_LAMBDA_FUNCTION_NAME="introduce-ling"

echo "Update AWS lambda code for function [$AWS_LAMBDA_FUNCTION_NAME] (CTRL+C to cancel or ENTER to proceed"
read

aws lambda update-function-code \
   --function-name "${AWS_LAMBDA_FUNCTION_NAME}" \
   --zip-file "fileb://${CODE_PATH}" \
   --publish
