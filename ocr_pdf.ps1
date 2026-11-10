Add-Type -AssemblyName System.Runtime.WindowsRuntime
$asTaskGeneric = [System.WindowsRuntimeSystemExtensions].GetMethods() | ? { $_.Name -eq 'AsTask' -and $_.GetParameters().Count -eq 1 -and $_.GetParameters()[0].ParameterType.Name -eq 'IAsyncOperation`1' }

function AwaitOperation($op, $type) {
    $m = $asTaskGeneric.MakeGenericMethod($type)
    $task = $m.Invoke($null, @($op))
    $task.Wait()
    return $task.Result
}

[Windows.Media.Ocr.OcrEngine, Windows.Foundation, ContentType = WindowsRuntime] | Out-Null
[Windows.Graphics.Imaging.BitmapDecoder, Windows.Graphics.Imaging, ContentType = WindowsRuntime] | Out-Null
[Windows.Storage.StorageFile, Windows.Storage, ContentType = WindowsRuntime] | Out-Null

$engine = [Windows.Media.Ocr.OcrEngine]::TryCreateFromUserProfileLanguages()
Write-Host "OCR Engine: $($engine.RecognizerLanguage.DisplayName)"

for ($i = 1; $i -le 4; $i++) {
    $path = (Resolve-Path "extracted_pdf_assets\image_$i.jpg").Path
    $file = AwaitOperation ([Windows.Storage.StorageFile]::GetFileFromPathAsync($path)) ([Windows.Storage.StorageFile])
    $stream = AwaitOperation ($file.OpenAsync([Windows.Storage.FileAccessMode]::Read)) ([Windows.Storage.Streams.IRandomAccessStream])
    $decoder = AwaitOperation ([Windows.Graphics.Imaging.BitmapDecoder]::CreateAsync($stream)) ([Windows.Graphics.Imaging.BitmapDecoder])
    $bitmap = AwaitOperation ($decoder.GetSoftwareBitmapAsync()) ([Windows.Graphics.Imaging.SoftwareBitmap])
    $ocrResult = AwaitOperation ($engine.RecognizeAsync($bitmap)) ([Windows.Media.Ocr.OcrResult])
    
    $outPath = "extracted_pdf_assets\page_${i}_ocr.txt"
    $ocrResult.Text | Out-File -FilePath $outPath -Encoding utf8
    Write-Host "Page $i OCR finished: $($ocrResult.Text.Length) characters written to $outPath"
}
