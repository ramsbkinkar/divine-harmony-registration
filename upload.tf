# Upload website files to S3
resource "aws_s3_object" "html" {
  bucket       = aws_s3_bucket.website.id
  key          = "index.html"
  source       = "index.html"
  content_type = "text/html"
  etag         = filemd5("index.html")
}

resource "aws_s3_object" "css" {
  bucket       = aws_s3_bucket.website.id
  key          = "styles.css"
  source       = "styles.css"
  content_type = "text/css"
  etag         = filemd5("styles.css")
}

resource "aws_s3_object" "js" {
  bucket       = aws_s3_bucket.website.id
  key          = "script.js"
  source       = "script.js"
  content_type = "application/javascript"
  etag         = filemd5("script.js")
}

# Upload images
resource "aws_s3_object" "images" {
  for_each = fileset(path.module, "*.jpg")
  bucket   = aws_s3_bucket.website.id
  key      = each.value
  source   = each.value
  etag     = filemd5(each.value)
  content_type = "image/jpeg"
} 