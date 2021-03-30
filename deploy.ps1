# prepare deployment destination
Remove-Item -Path ./deployment -Recurse -Force -ErrorAction SilentlyContinue
New-Item -ItemType Directory -Path ./deployment

$versions = "win-x64","linux-x64","linux-arm","linux-arm64"

For ($i = 0; $i -lt $versions.length; $i++)
{
    New-Item -ItemType Directory -Path "./deployment/$($versions[$i])"
}

# build

## build app
cd app
npm run build
cd ..

## build server
cd server

For ($i = 0; $i -lt $versions.length; $i++)
{
    dotnet publish -c Release -p:PublishSingleFile=true --self-contained true -r $versions[$i]
}

cd ..

# copy

## copy server
For ($i = 0; $i -lt $versions.length; $i++)
{
    $copy = @{
        Path = "./server/bin/Release/net5.0/$($versions[$i])/publish/*"
        Destination = "./deployment/$($versions[$i])"
        Force = $true
        Recurse = $true
        PassThru = $true
    }

    Copy-Item @copy
}

## copy app
For ($i = 0; $i -lt $versions.length; $i++)
{
    $path = "./deployment/$($versions[$i])"
    $copy = @{
        Path = "./app/dist/*"
        Destination = "$($path)/app"
        Force = $true
        Recurse = $true
        PassThru = $true
    }

    Copy-Item @copy
    New-Item -Path "$($path)/finnhub.config.json" -ItemType SymbolicLink -Value "$($path)/app/finnhub.config.json"
}

## create archives
For ($i = 0; $i -lt $versions.length; $i++)
{
    $path = "./deployment/$($versions[$i])"

    Compress-Archive -Path "$($path)/*" -DestinationPath "./deployment/assetdesmond-$($versions[$i]).zip" -CompressionLevel Optimal
}
