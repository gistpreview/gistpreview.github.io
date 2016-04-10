# Gist HTML Preview

Preview HTML file on Gist

## Usage

1. Preview `index.html` or `the first file` in gist

  `GET https://gistpreview.github.io/?:gist_id`

2. Preview specifically `file_name` in gist

  `GET https://gistpreview.github.io/?:gist_id/:file_name`

## Example

https://gist.github.com/zlargon/de2093842657a8b3d6d9ebb6ce0a7c59

## Github API Rate Limiting

Unauthenticated requests are associated with your IP address, and not the user making requests. The rate limit allows you to make up to `60` requests per hour.
