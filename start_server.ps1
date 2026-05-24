# Kishore.OS Local Telemetry Server
# Runs a zero-dependency web server on http://localhost:3000

$port = 3000
$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:$port/")

try {
    $listener.Start()
    Write-Host "==========================================================" -ForegroundColor Cyan
    Write-Host " KISHORE.OS PORTFOLIO ENGINE ACTIVE" -ForegroundColor Green -Bold
    Write-Host "==========================================================" -ForegroundColor Cyan
    Write-Host "Local server listening at: http://localhost:$port/" -ForegroundColor Yellow
    Write-Host "Leave this window open to browse your portfolio." -ForegroundColor White
    Write-Host "Press Ctrl+C to shut down server telemetry." -ForegroundColor Red
    Write-Host "==========================================================" -ForegroundColor Cyan

    # Auto-open browser
    Start-Process "http://localhost:$port/"

    while ($listener.IsListening) {
        $context = $listener.GetContext()
        $request = $context.Request
        $response = $context.Response
        
        $urlPath = $request.Url.LocalPath
        if ($urlPath -eq "/") {
            $urlPath = "/index.html"
        }
        
        # Sanitize path to prevent directory traversal
        $urlPath = $urlPath.Replace("/", "\")
        $filePath = Join-Path "D:\portfolio" $urlPath.TrimStart("\")
        
        if (Test-Path $filePath -PathType Leaf) {
            try {
                $bytes = [System.IO.File]::ReadAllBytes($filePath)
                
                # Determine Content-Type
                if ($filePath.EndsWith(".html")) {
                    $response.ContentType = "text/html; charset=utf-8"
                } elseif ($filePath.EndsWith(".js")) {
                    $response.ContentType = "application/javascript; charset=utf-8"
                } elseif ($filePath.EndsWith(".css")) {
                    $response.ContentType = "text/css; charset=utf-8"
                } elseif ($filePath.EndsWith(".png")) {
                    $response.ContentType = "image/png"
                } elseif ($filePath.EndsWith(".svg")) {
                    $response.ContentType = "image/svg+xml"
                }
                
                $response.ContentLength64 = $bytes.Length
                $response.OutputStream.Write($bytes, 0, $bytes.Length)
            } catch {
                $response.StatusCode = 500
                Write-Host "Error serving file: $_" -ForegroundColor Red
            }
        } else {
            $response.StatusCode = 404
            Write-Host "File not found: $urlPath" -ForegroundColor DarkYellow
        }
        $response.Close()
    }
} catch {
    Write-Host "Failed to start listener: $_" -ForegroundColor Red
} finally {
    $listener.Stop()
}
