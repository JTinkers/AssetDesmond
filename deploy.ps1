# prep
Remove-Item -Path "deployment/" -Recurse -ErrorAction "SilentlyContinue"

New-Item -ItemType "directory" -Path "deployment"

# build server
cd server
dotnet publish -c Release -p:PublishSingleFile=true --self-contained true -r win-x64

$copyParams = @{
    Path = "./bin/Release/net5.0/win-x64/publish/*"
    Destination = "../deployment/"
    Force = $true
    Recurse = $true
    PassThru = $true
}

Copy-Item @copyParams

cd ..

# build app
cd app
npm run build

$copyParams = @{
    Path = "./dist/*"
    Destination = "../deployment/app/"
    Force = $true
    Recurse = $true
    PassThru = $true
}

Copy-Item @copyParams

# finish
cd ../deployment

New-Item -Path "finnhub.config.json" -ItemType SymbolicLink -Value "app/finnhub.config.json"
Rename-Item -Path "AssetDesmondServer.exe" -NewName "run.exe"

cd ..