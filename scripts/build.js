const fs = require('fs-extra');
const marked = require('marked');
const path = require('path');

// Add site configuration
const siteConfig = {
    title: "Your Site Name",
    author: "Your Name",
    description: "Your site description"
};

// Function to convert markdown to HTML
async function convertMarkdownToHtml(markdownPath, outputPath) {
    const markdown = await fs.readFile(markdownPath, 'utf-8');
    const html = marked.parse(markdown);
    
    const template = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="${siteConfig.description}">
    <title>${title} - ${siteConfig.title}</title>
    <link rel="stylesheet" href="/assets/css/style.css">
    <link rel="icon" type="image/x-icon" href="/assets/favicon.ico">
</head>
<body>
    <header>
        <nav>
            <a href="/">Home</a>
            <a href="/blog">Blog</a>
            <a href="/pages/about.html">About</a>
            <a href="/pages/faq.html">FAQ</a>
        </nav>
    </header>
    <main>
        ${html}
    </main>
    <footer>
        <p>© 2024 ${siteConfig.author}</p>
    </footer>
</body>
</html>`