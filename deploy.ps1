# prep
mkdir deploy

# build front
cd app
vue-cli-service build --target app

$moveParams = @{
    Path = "./dist"
    Destination = "../deployment"
}

Move-File $moveParams